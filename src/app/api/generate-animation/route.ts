import { NextRequest, NextResponse } from 'next/server';
import { formatCSS, formatHTML } from '../../../lib/formatters';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Priority order of available high-speed flash models
const CANDIDATE_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-flash-latest',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
];

interface GenerateRequest {
  prompt: string;
  style?: string;
  refineContext?: {
    previousName?: string;
    previousHtml?: string;
    previousCss?: string;
    previousJs?: string;
    instruction?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateRequest;
    const { prompt, style, refineContext } = body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'A valid prompt is required.' },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            'Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file.',
        },
        { status: 500 }
      );
    }

    const isRefining =
      Boolean(refineContext?.instruction) &&
      Boolean(refineContext?.previousCss || refineContext?.previousHtml);

    const systemInstruction = `You are a world-class web motion designer and master of CSS/SVG/Canvas animations.
Your task is to create a visually breathtaking, modern, production-ready animation based on the user's prompt.
The animation should look high-end, futuristic or polished, using smooth hardware-accelerated transforms (translate, rotate, scale, skew, opacity, filter, clip-path, SVG dashoffset, or glowing box-shadows).

CRITICAL REQUIREMENTS:
1. Return a STRICTLY VALID JSON object conforming to the schema below.
2. DO NOT wrap your response in markdown fences like \`\`\`json. Return raw JSON text only.
3. The HTML should be self-contained within an outer container element (e.g. <div class="anim-container"> ... </div>). Do not include <html>, <head>, or <body> tags.
4. The CSS must be completely self-contained. Include all @keyframes, container styles, child element styles, CSS variables, and modern responsive design.
5. The CSS container should center its animated elements, have box-sizing: border-box, and look stunning on dark or light backgrounds.
6. If the user prompt requires interactivity (hover, click, drag, particle burst, canvas), provide the JavaScript code in the "js" field; otherwise, return an empty string "" for "js".
7. Ensure 60 FPS performance and avoid CPU-heavy repaints where possible.
8. CRITICAL: All string values inside the JSON MUST be valid JSON-escaped strings (escape internal double quotes as \\" and newlines as \\n). Never output unescaped double quotes or unescaped control characters inside string properties.

JSON SCHEMA:
{
  "name": "Creative title for the animation (e.g., 'Quantum Flux Portal')",
  "tagline": "A single compelling sentence describing the visual motion effect",
  "category": "One of: Glowing & Sci-Fi, 3D & Perspective, Fluid & Liquid, Particle & Cosmic, UI Micro-interaction, Loading & Spinners, Text Effects, Hover & Gesture, Retro / Cyberpunk",
  "tags": ["3 to 5 keyword tags like 'glow', 'cyberpunk', 'hover', '3d'"],
  "html": "<div class=\\"anim-wrapper\\">...</div>",
  "css": ".anim-wrapper { ... } @keyframes ... { ... }",
  "js": "Optional JavaScript code or empty string",
  "keyframeCode": "Pure @keyframes block extracted for quick copying",
  "reactSnippet": "Clean React TSX component snippet using this animation",
  "instructions": "Pro tips for integrating, adjusting duration, scale, or color variables"
}`;

    let userContent = `User Prompt: "${prompt.trim()}"`;
    if (style && style !== 'all') {
      userContent += `\nDesired Style/Category: ${style}`;
    }

    if (isRefining) {
      userContent = `Refinement Request:
The user wants to update an existing animation called "${refineContext?.previousName || 'Custom Animation'}".
Specific Change Requested: "${refineContext?.instruction || prompt.trim()}"

PREVIOUS HTML:
${refineContext?.previousHtml || ''}

PREVIOUS CSS:
${refineContext?.previousCss || ''}

${refineContext?.previousJs ? `PREVIOUS JS:\n${refineContext.previousJs}` : ''}

Modify and improve the existing animation according to the user's request while keeping its strengths and returning the updated JSON format.`;
    }

    // Attempt generation with automatic fallback across reliable models
    let lastError: Record<string, unknown> | null = null;
    let rawText = '';

    for (const model of CANDIDATE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemInstruction },
                  { text: userContent },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
        });

        if (!res.ok) {
          const errData = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          console.warn(`Model ${model} failed with status ${res.status}:`, errData);
          lastError = errData;
          continue; // Try next model in sequence
        }

        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          rawText = candidate;
          break; // Success!
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(`Error connecting to model ${model}:`, message);
        lastError = { error: { message } };
      }
    }

    if (!rawText) {
      const errObj = lastError?.error as { message?: string } | undefined;
      return NextResponse.json(
        {
          error:
            errObj?.message ||
            'Failed to generate animation with Gemini API. Please try again.',
        },
        { status: 502 }
      );
    }

    // Clean any markdown formatting if present
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Multi-tier resilient JSON parsing
    let parsedResult: Record<string, any>;
    try {
      // 1. Direct standard parse
      parsedResult = JSON.parse(cleaned);
    } catch (_parseErr1) {
      try {
        // 2. Fix unescaped control chars (excluding structural quotes)
        const sanitized = cleaned.replace(/:\s*"([\s\S]*?)"/g, (match, p1) => {
          return ': "' + p1.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
        });
        parsedResult = JSON.parse(sanitized);
      } catch (_parseErr2) {
        // 3. Resilient regex field extractor fallback
        const extractField = (fieldName: string) => {
          const reg = new RegExp(`"${fieldName}"\\s*:\\s*"([\\s\\S]*?)(?="\\s*,\\s*"[a-zA-Z]+"\\s*:|"\\s*\\})`);
          const match = cleaned.match(reg);
          if (!match) return '';
          return match[1]
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
        };

        const nameMatch = cleaned.match(/"name"\s*:\\s*"([^"]+)"/);
        const categoryMatch = cleaned.match(/"category"\s*:\\s*"([^"]+)"/);
        const taglineMatch = cleaned.match(/"tagline"\s*:\\s*"([^"]+)"/);

        parsedResult = {
          name: nameMatch ? nameMatch[1] : 'AI Generated Animation',
          tagline: taglineMatch ? taglineMatch[1] : 'Custom motion design',
          category: categoryMatch ? categoryMatch[1] : 'AI Generated',
          tags: ['ai', 'motion', 'css'],
          html: extractField('html'),
          css: extractField('css'),
          js: extractField('js'),
          keyframeCode: extractField('keyframeCode'),
          reactSnippet: extractField('reactSnippet'),
          instructions: extractField('instructions'),
        };
      }
    }

    // Beautify CSS, Keyframes, and HTML for pristine readability
    const formattedCss = formatCSS(parsedResult.css || '');
    const formattedHtml = formatHTML(parsedResult.html || '<div class="anim-box">Animated Element</div>');

    // Fallback extraction for keyframeCode if model omitted it
    let rawKeyframes = parsedResult.keyframeCode;
    if (!rawKeyframes && parsedResult.css) {
      const keyframeMatches = parsedResult.css.match(/@keyframes[\s\S]+?\}\s*\}/g);
      rawKeyframes = keyframeMatches ? keyframeMatches.join('\n\n') : parsedResult.css;
    }
    const formattedKeyframes = formatCSS(rawKeyframes || '');

    // Generate combined standalone HTML document ready for iframe preview or single-file export
    const fullHtmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${parsedResult.name || 'AI Animation'}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
      padding: 24px;
    }
    ${formattedCss}
  </style>
</head>
<body>
  ${formattedHtml}
  ${
    parsedResult.js
      ? `<script>
    try {
      ${parsedResult.js}
    } catch (e) {
      console.warn('Animation script error:', e);
    }
  </script>`
      : ''
  }
</body>
</html>`;

    return NextResponse.json({
      success: true,
      data: {
        id: `ai-${Date.now()}`,
        name: parsedResult.name || 'AI Animation',
        tagline: parsedResult.tagline || 'Custom generated motion effect',
        category: parsedResult.category || 'AI Generated',
        tags: Array.isArray(parsedResult.tags) ? parsedResult.tags : ['ai', 'css', 'animation'],
        html: formattedHtml,
        css: formattedCss,
        js: parsedResult.js || '',
        keyframeCode: formattedKeyframes,
        reactSnippet: parsedResult.reactSnippet || '',
        instructions: parsedResult.instructions || '',
        fullHtml: fullHtmlDocument,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error while processing request';
    console.error('API /api/generate-animation error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
