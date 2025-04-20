"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export default function ProblemPage() {
    const [mode, setMode] = useState("light");
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(`function solution() {\n  // your code\n}`);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        const fetchProblem = async () => {
            const res = await axios.get(`/api/problems/${id}`);
            setProblem(res.data);
        };
        fetchProblem();
    }, [id]);

    const runCode = async () => {
        const res = await fetch("/api/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, input: JSON.parse(input || "[]") }),
        });
        const data = await res.json();
        setOutput(data.result ?? data.error);
    };

    if (!problem) return <div>Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row p-4 gap-4">
            {/* LEFT PANEL */}
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-xl font-bold">{problem.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
                <div className="flex gap-2">
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">{problem.difficulty}</span>
                    {problem.tags.map((tag, idx) => (
                        <span key={idx} className="text-sm bg-blue-100 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="md:w-1/2 space-y-2 ">
                <div className="flex justify-between items-center bg-secondary px-2 py-1 rounded-md">
                    <h2 className="text-xl font-bold">Code</h2>
                    <button
                        className={`rounded-sm h-6 w-6 flex items-center justify-center [&>svg]:size-4 ${
                            mode === "light" ? "bg-foreground text-background" : "bg-background text-foreground"
                        }`}
                        onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    >
                        {mode === "light" ? <Moon /> : <Sun />}
                    </button>
                </div>
                <CodeMirror
                    theme={mode}
                    value={code}
                    height="300px"
                    extensions={[javascript()]}
                    onChange={(val) => setCode(val)}
                    className="overflow-hidden rounded-md border focus-within:border-primary"
                />
                <Textarea
                    placeholder="Input (e.g., [1, 2, 3])"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={runCode} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Run
                </button>
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
                    <strong>Output:</strong>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}
