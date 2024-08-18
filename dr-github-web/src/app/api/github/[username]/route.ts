import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_RAW_ENDPOINT}/${username}/${username}/main/README.md`
  );

  const data = await res.json();

  return NextResponse.json(data);
}
