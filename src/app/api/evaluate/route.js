import { NextResponse } from "next/server";

/**
 * @POST /api/evaluate
 * @body { code, input }
 * @returns { result, error }
 */
export async function POST(req) {
    try {
        const { code, input } = await req.json();
        // code evaluation logic goes here

        return NextResponse.json({ result: "success" });
    } catch (err) {
        console.error("POST /api/evaluate error:", err);
        return NextResponse.json({ error: "Failed to run problem" }, { status: 500 });
    }
}
