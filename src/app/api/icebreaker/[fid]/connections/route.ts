import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { fid: string } }
) {
  const fid = params.fid;
  
  // This is mock data - in a real implementation, you would fetch actual connections
  // from the Icebreaker API or another source
  const mockConnections = [
    {
      profileID: "mock1",
      walletAddress: "0xd7029bdea1c17493893aafe29aad69ef892b8ff2",
      displayName: "Dan Stone",
      avatarUrl: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
      bio: "Founder of Icebreaker Labs",
      channels: [],
      credentials: [],
      events: []
    },
    {
      profileID: "mock2",
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      displayName: "Taylor",
      avatarUrl: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/ABCDEFG",
      bio: "Engineer at Farcaster",
      channels: [],
      credentials: [],
      events: []
    },
    {
      profileID: "mock3",
      walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      displayName: "Alex Crown",
      bio: "Product Designer",
      channels: [],
      credentials: [],
      events: []
    },
    {
      profileID: "mock4",
      walletAddress: "0x2345678901abcdef2345678901abcdef23456789",
      displayName: "Jamie Web3",
      bio: "Crypto Enthusiast",
      channels: [],
      credentials: [],
      events: []
    },
    {
      profileID: "mock5",
      walletAddress: "0x3456789012abcdef3456789012abcdef34567890",
      displayName: "Sam Builder",
      bio: "Full-stack Developer",
      channels: [],
      credentials: [],
      events: []
    }
  ];
  
  // Return more or fewer connections based on FID to simulate different network sizes
  const fidNum = parseInt(fid);
  const connectionCount = Math.max(3, (fidNum % 5) + 3); // 3-7 connections
  
  return NextResponse.json({
    profiles: mockConnections.slice(0, connectionCount)
  });
}