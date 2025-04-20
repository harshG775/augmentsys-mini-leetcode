"use client";

export default function CreateProblem() {
    return (
        <section className="flex justify-center items-center min-h-screen bg-background p-4">
            <CreateProblemForm />
        </section>
    );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    tags: z.string().optional(),
});

function CreateProblemForm({ ...props }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            difficulty: "Easy",
            tags: "",
        },
    });
    const { formState } = form;

    const onSubmit = async (values) => {
        const tagsArray =
            values.tags
                ?.split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0) || [];

        const payload = {
            title: values.title,
            description: values.description,
            difficulty: values.difficulty,
            tags: tagsArray,
        };
        try {
            const response = await axios.post("/api/problems", payload);
            if (response.status === 201) {
                form.reset();
                toast.success("Problem created successfully", { style: { color: "green" } });
            } else {
                toast.error("Failed to create problem", { style: { color: "hsl(var(--destructive))" } });
            }
        } catch (error) {
            console.error("POST /api/problems error:", error);
            toast.error("Failed to create problem", { style: { color: "hsl(var(--destructive))" } });
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "space-y-8 bg-background p-6 rounded-lg shadow-lg w-full max-w-md mx-auto",
                    props.className
                )}
                {...props}
            >
                <h2 className="text-2xl font-semibold">Submit a Problem</h2>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Title
                                <span className="text-destructive">{" * "}</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description
                                <span className="text-destructive">{" * "}</span>
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={6} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Difficulty
                                <span className="text-destructive">{" * "}</span>
                            </FormLabel>
                            <FormControl>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Easy">Easy</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tags
                                <span className="text-destructive">{" * "}</span>
                            </FormLabel>
                            <FormDescription>comma separated tags Ex: javascript, python</FormDescription>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? (
                        <>
                            <Loader className="animate-spin" />
                            <span className="ml-2">submitting problem...</span>
                        </>
                    ) : (
                        <span className="ml-2">Submit Problem</span>
                    )}
                </Button>
            </form>
        </Form>
    );
}
