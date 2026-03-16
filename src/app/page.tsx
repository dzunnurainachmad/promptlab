"use client";

import { Header } from "@/components/Header";
import { TechniqueNav } from "@/components/TechniqueNav";
import { TechniqueGuide } from "@/components/TechniqueGuide";
import PromptBuilder from "@/components/PromptBuilder";
import { ResponseOutput } from "@/components/ResponseOutput";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Header />
      <TechniqueNav />
      <TechniqueGuide />
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="h-full border-r border-border overflow-hidden">
          <PromptBuilder />
        </div>
        <div className="h-full overflow-hidden">
          <ResponseOutput />
        </div>
      </main>
    </div>
  );
}
