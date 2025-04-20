"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const initialFilters = {
    search: "",
    tag: "",
    difficulty: "All",
};

export default function HomePage() {
    const [filters, setFilters] = useState(initialFilters);
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce filters to avoid instant API call on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 400);
        return () => clearTimeout(timer);
    }, [filters]);

    const handleChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const fetchProblems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const filteredParams = Object.entries(debouncedFilters)
                .filter(([_, val]) => val && val !== "All")
                .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
            const params = new URLSearchParams(filteredParams).toString();

            const { data } = await axios.get(`/api/problems?${params}`);
            setProblems(data);
        } catch (err) {
            setError("Failed to load problems. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [debouncedFilters]);

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const renderedProblems = useMemo(() => {
        return problems.map((problem) => (
            <div key={problem._id} className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{problem.description}</p>
                <div className="flex items-center gap-2 text-sm flex-wrap justify-between">
                    <div className="flex gap-2 flex-wrap">
                        {problem.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div
                        className={`
                            px-2 py-1 rounded-md text-white text-xs font-bold uppercase ${
                                problem.difficulty.toLowerCase() == "easy"
                                    ? "bg-green-500/80 "
                                    : problem.difficulty.toLowerCase() == "medium"
                                    ? "bg-yellow-500/80"
                                    : "bg-red-500/80"
                            }`}
                    >
                        {problem.difficulty}
                    </div>
                </div>
            </div>
        ));
    }, [problems]);

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🚀 Mini LeetCode Clone</h1>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                    placeholder="Search by title"
                    value={filters.search}
                    onChange={(e) => handleChange("search", e.target.value)}
                />
                <Select value={filters.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    placeholder="Filter by tag"
                    value={filters.tag}
                    onChange={(e) => handleChange("tag", e.target.value)}
                />
            </div>

            <div className="mb-6 flex justify-between">
                <Button onClick={fetchProblems}>Apply Filters</Button>
                <Button variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : problems.length === 0 ? (
                <p className="text-muted-foreground text-center">No problems match your filters.</p>
            ) : (
                <div className="space-y-4">{renderedProblems}</div>
            )}
        </main>
    );
}
