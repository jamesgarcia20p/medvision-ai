"use client";
import { Button } from "@/components/ui/button";
export default function Error({ reset }: { error: Error; reset: () => void }) { return <main className="grid min-h-[60vh] place-items-center text-center"><div><h2 className="text-2xl font-bold">Unable to load imaging data</h2><p className="mt-2 text-muted-foreground">Check backend connectivity and retry.</p><Button className="mt-4" onClick={reset}>Retry</Button></div></main>; }
