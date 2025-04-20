"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

export default function ProblemPage() {
    const [mode, setMode] = useState("light");
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(
        `function solution() { return input * 12; }\n\n\n\n //do not change the function name\noutput = solution();`
    );
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await axios.get(`/api/problems/${id}`);
                setProblem(res.data);
            } catch (error) {
                console.error("GET /api/problems/:id error:", error);
                toast.error("Failed to fetch problem");
            }
        };
        fetchProblem();
    }, [id]);

    const runCode = async () => {
        try {
            const res = await axios.post("/api/evaluate", {
                code,
                input: JSON.parse(input || "[]"),
            });
            setOutput(res.data.output ?? res.data.error);
        } catch (error) {
            console.log("POST /api/evaluate error:", error);
            toast.error("Failed to run code", { style: { color: "hsl(var(--destructive))" } });
        }
    };

    // Show loader until problem is fetched
    if (!problem) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <Loader className="animate-spin size-8" />
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row p-4 gap-4">
            {/* LEFT PANEL */}
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-xl font-bold">{problem.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">{problem.difficulty}</span>
                    {problem.tags.map((tag, idx) => (
                        <span key={idx} className="text-sm bg-blue-100 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="md:w-1/2 space-y-3">
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
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={runCode}>
                    Run
                </Button>
                <div className="mt-2 p-2 bg-secondary mb-32 rounded text-sm whitespace-pre-wrap">
                    <strong>Output:</strong>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}
