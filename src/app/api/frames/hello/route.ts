import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://frames-v2-demo.vercel.app";

  // Process the frame action
  const body = await request.json();
  console.log("Frame request:", body);

  // Return the next frame
  return NextResponse.json({
    version: "vNext",
    image: `${appUrl}/icebreaker_labs_logo.jpeg`,
    buttons: [
      {
        label: "View Profile",
        action: "link",
        target: `${appUrl}/`
      }
    ],
    og: {
      title: "Icebreaker Credential Network Explorer",
      description: "Explore credential networks from Farcaster profiles"
    }
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}