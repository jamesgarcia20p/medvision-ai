"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Activity, Moon, Sun, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const { theme, setTheme } = useTheme();
  return <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Link href="/dashboard" className="flex items-center gap-2 font-bold"><Activity className="h-6 w-6 text-primary" /> MedVisionAI</Link>
      <nav className="flex items-center gap-2">
        <Button asChild variant="ghost"><Link href="/dashboard">Dashboard</Link></Button>
        <Button asChild variant="ghost"><Link href="/upload"><Upload className="mr-2 h-4 w-4" />Upload</Link></Button>
        <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
      </nav>
    </div>
  </header>;
}
