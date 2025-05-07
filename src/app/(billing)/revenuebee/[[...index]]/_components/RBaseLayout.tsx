"use client";
import React from "react";
import TopNav from "./TopNav";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <TopNav />
            <div className="flex flex-1">
                <main className="flex-1 transition-all duration-300">
                    <div className="max-w-8xl mx-auto overflow-hidden">
                        <div className="flex flex-col gap-6">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BaseLayout;