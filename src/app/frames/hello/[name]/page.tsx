import { Metadata } from "next";
import App from "~/app/app";

// Make sure this is your actual deployed URL
const appUrl = process.env.NEXT_PUBLIC_URL || "https://frames-v2-demo.vercel.app";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const frame = {
    version: "vNext",
    image: `${appUrl}/icebreaker_labs_logo.png`,
    buttons: [
      {
        label: "Launch Frame",
        action: "post"
      }
    ],
    post_url: `${appUrl}/api/frames/hello`,
    og: {
      title: `Hello, ${name}`,
      description: `A personalized hello frame for ${name}`
    }
  };

  return {
    title: `Hello, ${name}`,
    description: `A personalized hello frame for ${name}`,
    openGraph: {
      title: `Hello, ${name}`,
      description: `A personalized hello frame for ${name}`,
      images: [`${appUrl}/icebreaker_labs_logo.jpeg`],
    },
    other: {
      // This is the crucial part that Warpcast looks for
      "fc:frame": "vNext",
      "fc:frame:image": `${appUrl}/icebreaker_labs_logo.jpeg`,
      "fc:frame:button:1": "Launch Frame",
      "fc:frame:button:1:action": "post",
      "fc:frame:post_url": `${appUrl}/api/frames/hello`,
    },
  };
}

export default async function HelloNameFrame({ params }: Props) {
  const { name } = await params;

  return <App title={`Hello, ${name}`} />;
}
