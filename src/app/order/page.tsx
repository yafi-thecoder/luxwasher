"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  serviceType: z.enum(["wash-fold", "dry-clean", "both"], { required_error: "Please select a service type."}),
  detergent: z.string().min(1, { message: "Please select a detergent." }),
  foldingStyle: z.string().min(1, { message: "Please select a folding style." }),
  pickupAddress: z.string().min(5, { message: "Please enter a valid pickup address." }),
  deliveryAddress: z.string().min(5, { message: "Please enter a valid delivery address." }),
  specialInstructions: z.string().optional(),
});

export default function OrderPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pickupAddress: "",
            deliveryAddress: "",
            specialInstructions: "",
        },
      });
    
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Order Submitted!",
            description: "Your pickup has been scheduled. We'll be in touch shortly.",
            className: "bg-green-600 text-white border-green-600",
          });
        form.reset();
      }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Place Your Order</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          Schedule your laundry pickup in just a few clicks.
        </p>
      </div>

      <Card className="mx-auto mt-16 max-w-3xl">
        <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Fill out the form below to schedule your service.</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Service Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="wash-fold" /></FormControl>
                                <FormLabel className="font-normal">Wash & Fold</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="dry-clean" /></FormControl>
                                <FormLabel className="font-normal">Dry Cleaning</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="both" /></FormControl>
                                <FormLabel className="font-normal">Both</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="detergent"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Detergent Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a detergent" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="hypoallergenic">Hypoallergenic</SelectItem>
                                <SelectItem value="eco-friendly">Eco-Friendly</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="foldingStyle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Folding Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a folding style" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="standard-fold">Standard Fold</SelectItem>
                                <SelectItem value="marie-kondo">Marie Kondo Fold</SelectItem>
                                <SelectItem value="on-hangers">On Hangers (additional fee)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                
                <FormField
                    control={form.control}
                    name="pickupAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl><Input placeholder="(if different from pickup)" {...field} /></FormControl>
                        <FormDescription>Leave blank if same as pickup address.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl><Textarea placeholder="e.g., Please handle the red silk shirt with care." {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                
                <Button type="submit" className="w-full" size="lg">Submit Order</Button>
            </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  );
}
