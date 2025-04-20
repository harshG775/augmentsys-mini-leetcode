import { NextResponse } from "next/server";
import connectToDatabase, { db } from "@/db";

/**
 * @GET /api/problems
 * @query { search, tag, difficulty }
 * @returns { title, description, difficulty, tags }
 * @example GET /api/problems?search=abc&tag=abc&difficulty=easy
 */
export async function GET(req) {
    try {
        await connectToDatabase();
        const { search, tag, difficulty } = Object.fromEntries(req.nextUrl.searchParams.entries());
        const filter = {};
        if (search) filter.title = { $regex: search, $options: "i" };
        if (tag) filter.tags = tag;
        if (difficulty) filter.difficulty = difficulty;
        const problems = await db.Problem.find(filter).sort({ createdAt: -1 });
        return new Response(JSON.stringify(problems), { status: 200 });
    } catch (err) {
        console.error("GET /api/problems error:", err);
        return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 });
    }
}

/**
 * @POST /api/problems
 * @body { title, description, difficulty, tags }
 * @returns { title, description, difficulty, tags }
 * @example POST /api/problems
 */
export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { title, description, difficulty, tags } = body;

        if (!title || !description || !difficulty) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newProblem = await db.Problem.create({
            title,
            description,
            difficulty,
            tags: tags || [],
        });

        return NextResponse.json(newProblem, { status: 201 });
    } catch (err) {
        console.error("POST /api/problems error:", err);
        return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
    }
}
