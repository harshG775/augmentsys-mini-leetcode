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
        const { output, error } = executeCode(code, input);

        return NextResponse.json({ output, error });
    } catch (err) {
        console.error("POST /api/evaluate error:", err);
        return NextResponse.json({ error: "Failed to run problem" }, { status: 500 });
    }
}
import vm from "vm";
function executeCode(code, input) {
    if (typeof code !== "string" || code.trim() === "" || typeof input === "undefined") {
        res.status(400).json({ error: "Invalid or missing code or input" });
        return;
    }

    const context = { input, output: undefined };
    vm.createContext(context);
    try {
        const script = new vm.Script(code);
        script.runInContext(context, { timeout: 5000 });
        return { output: context.output };
    } catch (error) {
        return { error: error.message };
    }
}
