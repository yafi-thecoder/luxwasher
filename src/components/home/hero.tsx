import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-card/30">
        <div className="container relative z-10 mx-auto px-4 py-24 text-center md:py-32">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Laundry Day, Reimagined.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            Tired of laundry chores? Let WashCycle handle it. We pick up your dirty laundry and deliver it back fresh, clean, and perfectly folded.
            </p>
            <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/order">Schedule a Pickup</Link>
            </Button>
            </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/laundry-hero/1920/1080"
          alt="Clean, folded laundry"
          fill
          priority
          className="object-cover"
          data-ai-hint="laundry service"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>
    </section>
  );
}
