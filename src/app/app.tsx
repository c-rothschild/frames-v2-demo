"use client";

import dynamic from "next/dynamic";

const Demo = dynamic(() => import("~/components/Demo"), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: "Icebreaker Profile Viewer" }
) {
  return <Demo title={title} />;
}
