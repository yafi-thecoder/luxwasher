import CostEstimator from "@/components/home/cost-estimator";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import ServicesOverview from "@/components/home/services-overview";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <ServicesOverview />
      </div>
      <Separator className="my-8 bg-border/20" />
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <HowItWorks />
      </div>
       <div className="bg-card/50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <CostEstimator />
        </div>
      </div>
    </div>
  );
}
