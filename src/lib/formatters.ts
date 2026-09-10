/**
 * Beautifies unformatted or minified CSS code into clean, indented lines.
 */
export function formatCSS(css: string): string {
  if (!css || typeof css !== 'string') return '';

  const clean = css
    .replace(/\r\n/g, '\n')
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m + '\n')
    .replace(/\s+/g, ' ')
    .trim();

  let formatted = '';
  let indentLevel = 0;
  const indent = '  ';

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];

    if (char === '{') {
      indentLevel++;
      formatted = formatted.trimEnd() + ' {\n' + indent.repeat(indentLevel);
    } else if (char === ';') {
      formatted += ';\n' + indent.repeat(indentLevel);
    } else if (char === '}') {
      indentLevel = Math.max(0, indentLevel - 1);
      formatted =
        formatted.trimEnd() +
        '\n' +
        indent.repeat(indentLevel) +
        '}' +
        (indentLevel === 0 ? '\n\n' : '\n' + indent.repeat(indentLevel));
    } else {
      // Don't add redundant spaces at line start
      if (formatted.endsWith('\n') && (char === ' ' || char === '\t')) {
        continue;
      }
      formatted += char;
    }
  }

  return formatted
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .replace(/\s*;\s*;/g, ';')
    .trim();
}

/**
 * Cleanly indents HTML structure.
 */
export function formatHTML(html: string): string {
  if (!html || typeof html !== 'string') return '';

  const clean = html
    .replace(/\r\n/g, '\n')
    .replace(/>\s*</g, '><')
    .trim();

  const tokens = clean.split(/(?=<)|(?<=>)/g);
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    // Closing tag: decrease indent before adding
    if (/^<\/\w/.test(trimmed)) {
      indent = Math.max(0, indent - 1);
    }

    formatted += tab.repeat(indent) + trimmed + '\n';

    // Opening non-void tag: increase indent after adding
    if (
      /^<\w[^>]*[^\/]>$/.test(trimmed) &&
      !trimmed.startsWith('<!') &&
      !/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i.test(
        trimmed
      )
    ) {
      indent++;
    }
  }

  return formatted.trim();
}
