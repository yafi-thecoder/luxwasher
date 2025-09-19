"use client";

import { estimateLaundryCost, EstimateLaundryCostOutput } from "@/ai/flows/estimate-laundry-cost";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  weight: z.coerce.number().min(0.1, { message: "Weight must be greater than 0." }),
  items: z.string().min(3, { message: "Please describe the items." }),
  materialComposition: z.string().min(3, { message: "Please describe the materials." }),
});

export default function CostEstimator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateLaundryCostOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 10,
      items: "T-shirts, jeans, socks, and towels",
      materialComposition: "Mostly cotton, some polyester blends",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const estimation = await estimateLaundryCost(values);
      setResult(estimation);
    } catch (error) {
      console.error("Error estimating cost:", error);
      toast({
        variant: "destructive",
        title: "Estimation Failed",
        description: "There was an error getting your estimate. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="estimator" className="scroll-mt-20">
       <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Cost Estimator
        </h2>
        <p className="mt-4 text-lg text-foreground/70">
          Get a quick cost estimate for your laundry using our AI-powered tool.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Laundry Details</CardTitle>
            <CardDescription>Fill in the details below to get an estimate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (in kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., T-shirts, jeans, towels" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="materialComposition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Composition</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cotton, polyester, silk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Estimate Cost
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center bg-background">
          {loading && (
            <div className="flex flex-col items-center gap-4 text-foreground/70">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="font-semibold">Calculating your estimate...</p>
            </div>
          )}
          {!loading && result && (
             <CardContent className="p-6 w-full">
                <h3 className="text-xl font-bold mb-4">Your Estimate:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/70">Estimated Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.estimatedCost.toFixed(2)}</p>
                  </div>
                   <div>
                    <p className="text-sm text-foreground/70">Recommended Service</p>
                    <p className="text-lg font-semibold">{result.serviceType}</p>
                  </div>
                   <div>
                    <p className="text-sm text-foreground/70">Notes</p>
                    <p className="text-foreground/90">{result.notes}</p>
                  </div>
                </div>
            </CardContent>
          )}
           {!loading && !result && (
            <div className="text-center p-6 text-foreground/60">
                <p>Your cost estimate will appear here.</p>
            </div>
           )}
        </Card>
      </div>
    </section>
  );
}
