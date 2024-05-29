import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
	revalidatePath("/", "layout");
	return NextResponse.json({ ok: true, message: `Revalidated at ${new Date().toISOString()}` });
}
