// import { NextResponse } from "next/server";
// import { VM } from "vm2";
// export async function POST(req) {
//     try {
//         const vm = new VM({ timeout: 1000, sandbox: { input } });
//         const wrapper = `'use strict'; module.exports = (input) => { ${code} };`;
//         const fn = vm.run(wrapper);
//         const result = fn(input);
//         return new Response(JSON.stringify({ result }), { status: 200 });
//     } catch (err) {
//         console.error("POST /api/evaluate error:", err);
//         return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
//     }
// }
