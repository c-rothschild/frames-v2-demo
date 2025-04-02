import type { Metadata } from "next";

import { getSession } from "~/auth"
import "~/app/globals.css";
import { Providers } from "~/app/providers";
import { config } from "~/config/config";

// Get the base URL for assets
const baseUrl = process.env.NEXT_PUBLIC_URL || "https://frames-v2-demo.vercel.app";

export const metadata: Metadata = {
  title: "Icebreaker Profile Viewer",
  description: "View Icebreaker profiles and generate credential networks.",
  openGraph: {
    title: "Icebreaker Profile Viewer",
    description: "Explore credential networks from Farcaster profiles",
    images: [
      {
        url: `${baseUrl}/icebreaker_labs_logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Icebreaker Credential Network Explorer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Icebreaker Profile Viewer",
    description: "Explore credential networks from Farcaster profiles",
    images: [`${baseUrl}/icebreaker_labs_logo.jpeg`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  
  return (
    <html lang="en">
      <head>
        <title>Icebreaker Profile Viewer</title>
        {/* Additional meta tags can go here */}
      </head>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
