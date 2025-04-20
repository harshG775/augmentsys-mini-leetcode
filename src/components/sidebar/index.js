"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleMenu = () => setIsSidebarOpen((prev) => !prev);

    // Optional: Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isSidebarOpen]);

    return (
        <>
            <div className="border-b shadow-sm sticky top-0 z-50 bg-background">
                <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        🧠 <span className="text-primary">Mini</span> leetCode
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="hover:underline text-sm">
                            Home
                        </Link>
                        <Link href="/create" className="hover:underline text-sm">
                            Create Problem
                        </Link>
                    </div>

                    <Button variant="ghost" className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out absolute w-full bg-background z-40 px-4 py-2 space-y-2 ${
                        isSidebarOpen ? "top-[56px] opacity-100" : "-top-full opacity-0 pointer-events-none"
                    }`}
                >
                    <Link href="/" className="block text-sm" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link href="/create" className="block text-sm" onClick={toggleMenu}>
                        Create Problem
                    </Link>
                </div>
            </div>

            <main className="p-4 max-w-4xl mx-auto">{children}</main>
        </>
    );
}
