import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
        <p className="mt-4 text-lg text-foreground/70">
          Get fresh, clean laundry in 4 simple steps.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-12"
      >
        <CarouselContent>
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <div className="rounded-full bg-primary/10 p-4 text-primary">
                        <step.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
