import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import { getPublicPath } from "./config/paths";
import { SWRegister } from "./components/sw-register";
import { type Metadata, type Viewport } from "next";

const TITLE = "Edu Chat";
const DESCRIPTION = "Your Private and Local AI Assistant.";
const APP_ORIGIN = "https://gallego.top";

function getCanonicalPublicUrl(path: string) {
  return new URL(getPublicPath(path), APP_ORIGIN).toString();
}

export const metadata: Metadata = {
  metadataBase: new URL("https://gallego.top/educhat"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "WebLLM",
    "AI chat",
    "machine learning",
    "browser AI",
    "language model",
    "no server",
  ],
  authors: [{ name: "WebLLM Team" }],
  publisher: "WebLLM",
  creator: "WebLLM",
  robots: "index, follow",
  appleWebApp: {
    title: "Edu Chat",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    type: "website",
    url: "https://gallego.top/educhat",
    title: "Edu Chat",
    description:
      "Chat with AI large language models running natively in your browser",
    siteName: "Edu Chat",
    images: [
      {
        url: "https://gallego.top/educhat/logo.png",
        width: 360,
        height: 360,
        alt: "Edu Chat - Browser-based AI conversation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edu Chat",
    description:
      "Chat with AI large language models running natively in your browser",
    images: ["https://gallego.top/educhat/logo.png"],
  },
  alternates: {
    canonical: "https://gallego.top/educhat",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
    worker-src 'self' https://cdn.jsdelivr.net;
    connect-src 'self' blob: data: https: http:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={cspHeader.replace(/\n/g, "")}
        />
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={getCanonicalPublicUrl("/apple-touch-icon.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={getCanonicalPublicUrl("/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={getCanonicalPublicUrl("/favicon-16x16.png")}
        />
        <link
          rel="manifest"
          href={getCanonicalPublicUrl("/site.webmanifest")}
        />
        <link
          rel="mask-icon"
          href={getCanonicalPublicUrl("/safari-pinned-tab.svg")}
          color="#062578"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Edu Chat",
              url: "https://gallego.top/educhat",
              description:
                "Chat with AI large language models running natively in your browser. Enjoy private, server-free, seamless AI conversations.",
              applicationCategory: "Artificial Intelligence",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              operatingSystem: "Web Browser",
              creator: {
                "@type": "Organization",
                name: "Edu Chat",
              },
            }),
          }}
        />
      </head>
      <body>
        <SWRegister />
        {children}
      </body>
    </html>
  );
}
