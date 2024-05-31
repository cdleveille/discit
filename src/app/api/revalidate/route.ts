import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { config } from "@services";

export async function POST() {
	const authorization = headers().get("Authorization");
	const token = authorization?.split("Bearer ")?.[1];
	if (!token || token !== config.API_KEY)
		return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
	revalidateTag("disc");
	return NextResponse.json({ ok: true, message: `Revalidated at ${new Date().toISOString()}` });
}
