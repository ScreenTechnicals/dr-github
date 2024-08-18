import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_API_ENDPOINT}/user/${id}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}
