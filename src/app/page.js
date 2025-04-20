"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function HomePage() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Controlled inputs for filters
    const [filters, setFilters] = useState({
        search: "",
        tag: "",
        difficulty: "",
    });

    const handleInputChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const fetchProblems = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams(filters).toString();
            console.log(params);
            
            const { data } = await axios.get(`/api/problems?${params}`);
            setProblems(data);
        } catch (err) {
            setError("Failed to fetch problems");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🚀 Mini LeetCode Clone</h1>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                    placeholder="Search by title"
                    value={filters.search}
                    onChange={(e) => handleInputChange("search", e.target.value)}
                />
                <Select
                    onValueChange={(value) => handleInputChange("difficulty", value)}
                    value={filters.difficulty}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    placeholder="Filter by tag"
                    value={filters.tag}
                    onChange={(e) => handleInputChange("tag", e.target.value)}
                />
            </div>

            <div className="mb-6">
                <Button onClick={fetchProblems}>Filter</Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="space-y-4">
                    {problems.map((problem) => (
                        <div key={problem._id} className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900">
                            <h3 className="text-xl font-semibold">{problem.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                {problem.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <Badge variant="outline">{problem.difficulty}</Badge>
                                {problem.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                    {problems.length === 0 && (
                        <p className="text-muted-foreground">No problems found.</p>
                    )}
                </div>
            )}
        </main>
    );
}
