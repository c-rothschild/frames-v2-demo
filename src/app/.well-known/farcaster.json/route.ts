export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwMjQxNTksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2M0I3NGNmNzJkMDdhZDgwNjEyNjg5NDEwNDlFMDAzMDk5MTNjNUFkIn0",
      payload: "eyJkb21haW4iOiJmcmFtZXMtdjItZGVtby1zZXZlbi52ZXJjZWwuYXBwIn0",
      signature:
        "MHhlMjIyNDY1MDI5ODRmNTM0ZWRhMjIyNWJiNDA2NDg3MWU4MWUzNTljZTkwNDg3YjlhMjVkNWEwNWFiNWM0MDgzNmUyNDVlZThjM2IwMWI4ZDUzMWFlZmNlZWVhMmE4YTg1N2IzMWIzZWFiNjc2YWEzNGY5ZWU2N2U2YzBjODFlNzFi",
    },
    frame: {
      version: "1",
      name: "Icebreaker Profile Viewer",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/icebreaker_labs_logo.png`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  };

  return Response.json(config);
}
