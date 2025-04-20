import { NextResponse } from "next/server";
import connectToDatabase, { db } from "@/db";

/**
 * @GET /api/problems/:id
 * @returns { title, description, difficulty, tags }
 * @example GET /api/problems/:id
 */
export async function GET(_req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const problem = await db.Problem.findById(id);
        return new Response(JSON.stringify(problem), { status: 200 });
    } catch (err) {
        console.error("GET /api/problems/:id error:", err);
        return NextResponse.json({ error: "Failed to fetch problem" }, { status: 500 });
    }
}
