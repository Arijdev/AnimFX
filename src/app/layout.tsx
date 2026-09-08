import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimFX — CSS Animation Showcase',
  description:
    'Explore 14+ interactive CSS animations with live previews, copy-ready snippets, and an interactive playground. Built with Next.js and Framer Motion.',
  keywords: ['CSS animations', 'keyframes', 'animation showcase', 'framer motion', 'nextjs'],
  openGraph: {
    title: 'AnimFX — CSS Animation Showcase',
    description: 'Explore 14+ interactive CSS animations with live previews and an interactive playground.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
