import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/icebreaker_labs_logo.jpeg`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "Icebreaker Profile Viewer",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Icebreaker Profile Viewer",
    openGraph: {
      title: "Icebreaker Profile Viewer",
      description: "View Icebreaker profiles and generate credential networks.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
