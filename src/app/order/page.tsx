// src/app/order/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { CreditCard, Minus, Plus } from "lucide-react";
import { SERVICES, dryCleaningItems } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import AuthModal, { UserRegistrationData } from "@/components/order/auth-modal";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// Define the type for items with prices
interface OrderItem {
  name: string;
  price: number;
  type: "per-lb" | "per-item";
  quantity: number;
}

// Combine services and dry cleaning items into one list
const allItems = [
  ...SERVICES.filter(s => s.price.startsWith("$")).map(s => ({
    name: s.title,
    price: parseFloat(s.price.replace("$", "").split('/')[0]),
    type: s.price.includes("lb") ? "per-lb" : "per-item" as "per-lb" | "per-item",
  })),
  ...dryCleaningItems.map(item => ({
    name: item.item,
    price: parseFloat(item.price.replace("$", "")),
    type: "per-item" as "per-item",
  })),
];

const formSchema = z.object({
  pickupAddress: z.string().min(10, { message: "Please enter a valid pickup address." }),
  deliveryAddress: z.string().min(10, { message: "Please enter a valid delivery address." }),
  pincode: z.string().regex(/^\d{5,6}$/, { message: "Please enter a valid pincode." }),
  paymentMethod: z.enum(["card", "paypal", "cash"], {
    required_error: "Please select a payment method.",
  }),
  useProfileAddress: z.boolean().default(false).optional(),
});

export default function OrderPage() {
  const { toast } = useToast();
  const [cart, setCart] = useState<OrderItem[]>(
    allItems.map((item) => ({ ...item, quantity: 0 }))
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<"order" | "payment">("order");
  const [userProfile, setUserProfile] = useState<UserRegistrationData | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      deliveryAddress: "",
      pincode: "",
      useProfileAddress: false,
    },
  });

  const useProfileAddress = form.watch("useProfileAddress");

  useEffect(() => {
    if (useProfileAddress && userProfile) {
      form.setValue("pickupAddress", userProfile.pickupAddress);
      form.setValue("deliveryAddress", userProfile.deliveryAddress);
    } else {
        // an option to clear when unchecked
        // form.setValue("pickupAddress", "");
        // form.setValue("deliveryAddress", "");
    }
  }, [useProfileAddress, userProfile, form]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleQuantityChange = (itemName: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const handleProceedToPayment = () => {
    if (totalAmount === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Please add items to your order before proceeding.",
      });
      return;
    }
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setStep("payment");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
        ...values,
        orderItems: cart.filter(item => item.quantity > 0),
        totalAmount,
    });
    toast({
      title: "Order Placed Successfully!",
      description: "Your order is confirmed. We will notify you about the pickup.",
    });
    form.reset();
    setCart(allItems.map((item) => ({ ...item, quantity: 0 })));
    setStep("order");
  }

  const handleAuthSuccess = (data: UserRegistrationData) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setUserProfile(data);
    setStep("payment");
    toast({
      title: "Logged In!",
      description: "You can now proceed with your payment.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onAuthSuccess={handleAuthSuccess}
      />
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {step === "order" ? "Create Your Order" : "Complete Your Payment"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          {step === "order"
            ? "Select your services and add them to your cart."
            : "Please provide your address and payment details."}
        </p>
      </div>

      {step === "order" && (
        <Card className="mx-auto mt-12 max-w-4xl">
          <CardHeader>
            <CardTitle>Select Services</CardTitle>
            <CardDescription>
              Choose the items you want to get serviced and set the quantity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-foreground/70">
                    ${item.price.toFixed(2)}{" "}
                    {item.type === "per-lb" ? "/ lb" : "/ item"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.name, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-lg">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.name, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col items-end gap-4 p-6 bg-card/50">
            <div className="text-right">
              <p className="text-lg text-foreground/80">Total Amount:</p>
              <p className="text-3xl font-bold text-primary">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <Button size="lg" onClick={handleProceedToPayment}>
              Proceed to Pay
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "payment" && (
        <Card className="mx-auto mt-16 max-w-3xl">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter your address and choose a payment method.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {userProfile && (
                     <FormField
                     control={form.control}
                     name="useProfileAddress"
                     render={({ field }) => (
                       <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                         <FormControl>
                           <Checkbox
                             checked={field.value}
                             onCheckedChange={field.onChange}
                           />
                         </FormControl>
                         <div className="space-y-1 leading-none">
                           <FormLabel>
                             Use my saved pickup and delivery addresses
                           </FormLabel>
                         </div>
                       </FormItem>
                     )}
                   />
                )}
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Pickup St, Fresh City"
                          {...field}
                        />
                      </FormControl>
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
                      <FormControl>
                        <Input
                          placeholder="456 Delivery Ave, Clean Town"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal w-full">
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="paypal" />
                            </FormControl>
                            <FormLabel className="font-normal w-full">
                              PayPal
                            </FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="font-normal w-full">
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={() => setStep('order')}>Back to Order</Button>
                    <div className="text-right">
                        <p className="text-sm text-foreground/70">Total to Pay</p>
                        <p className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                 <Button type="submit" className="w-full" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay ${totalAmount.toFixed(2)}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
