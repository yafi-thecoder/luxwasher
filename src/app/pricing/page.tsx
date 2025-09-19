import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVICES } from "@/lib/constants";

const dryCleaningItems = [
    { item: "Suit (2-piece)", price: "$25.00" },
    { item: "Blouse / Shirt", price: "$7.50" },
    { item: "Dress", price: "$15.00" },
    { item: "Pants / Trousers", price: "$8.00" },
    { item: "Jacket / Blazer", price: "$12.00" },
    { item: "Coat", price: "$20.00" },
  ];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Pricing</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Simple, transparent pricing. No hidden fees.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Standard Services</CardTitle>
                <CardDescription>Pricing for our most popular laundry services.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {SERVICES.filter(s => s.price !== "Custom Pricing").map(service => (
                        <div key={service.title} className="flex justify-between items-baseline">
                           <div>
                             <h3 className="font-semibold">{service.title}</h3>
                             <p className="text-sm text-foreground/60">{service.description}</p>
                           </div>
                           <p className="text-lg font-bold text-primary">{service.price}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Dry Cleaning Price List</CardTitle>
                <CardDescription>Itemized pricing for our professional dry cleaning.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dryCleaningItems.map((item) => (
                        <TableRow key={item.item}>
                            <TableCell className="font-medium">{item.item}</TableCell>
                            <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
       <div className="mt-12">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Commercial Services</CardTitle>
              <CardDescription>
                lux washer provides tailored laundry solutions for businesses of all sizes.
                We partner with hotels, gyms, spas, and more to provide reliable, high-quality commercial laundry services.
                Contact us today for a personalized quote.
              </CardDescription>
            </CardHeader>
          </Card>
       </div>
    </div>
  );
}
