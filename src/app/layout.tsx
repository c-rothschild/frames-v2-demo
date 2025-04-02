import type { Metadata } from "next";

import { getSession } from "~/auth"
import "~/app/globals.css";
import { Providers } from "~/app/providers";
import { config } from "~/config/config";

export const metadata: Metadata = {
  title: "Icebreaker Profile Viewer",
  description: "View Icebreaker profiles and generate credential networks.",
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
        <meta property="og:title" content={'PEEPEEPOOPOO'} />
        <meta property="og:image" content={`${config.hostUrl}/icebreaker_labs_logo.jpeg`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:imageUrl" content={`${config.hostUrl}/icebreaker_labs_logo.jpeg`}/>
        
      </head>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
