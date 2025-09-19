import type { LucideIcon } from "lucide-react";
import { ClipboardList, Home, PackageCheck, Truck, WashingMachine } from "lucide-react";

export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const SERVICES = [
  {
    title: "Wash & Fold",
    description: "Perfect for your everyday laundry. We wash, dry, and neatly fold your clothes, so they're ready to wear.",
    price: "$1.75/lb",
    turnaround: "24-48 hours",
  },
  {
    title: "Dry Cleaning",
    description: "Expert care for your delicate garments. We use eco-friendly methods to leave your clothes fresh and clean.",
    price: "Custom Pricing", // This will be handled by itemized list
    turnaround: "2-3 business days",
  },
  {
    title: "Commercial Laundry",
    description: "Customized laundry solutions for businesses like hotels, gyms, and restaurants. Contact us for a quote.",
    price: "Custom Pricing",
    turnaround: "Varies",
  },
  {
    title: "Bedding & Linens",
    description: "From comforters to duvet covers, we'll give your bulky items a deep clean for ultimate freshness.",
    price: "$25.00/item",
    turnaround: "2-3 business days",
  },
];

export const dryCleaningItems = [
    { item: "Suit (2-piece)", price: "$25.00" },
    { item: "Blouse / Shirt", price: "$7.50" },
    { item: "T-shirt", price: "$5.00" },
    { item: "Dress", price: "$15.00" },
    { item: "Gown", price: "$30.00" },
    { item: "Pants / Trousers", price: "$8.00" },
    { item: "Jacket / Blazer", price: "$12.00" },
    { item: "Coat", price: "$20.00" },
    { item: "Hoodie", price: "$20.00" },
    { item: "Saree", price: "$25.00" },
    { item: "Silk Saree", price: "$40.00" },
    { item: "Chudithar Top / Kurta", price: "$15.00" },
    { item: "Lehanga (2 pc)", price: "$25.00" },
    { item: "Lehanga (3 pc)", price: "$30.00" },
    { item: "Shawl", price: "$5.00" },
  ];

type HowItWorksStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    icon: ClipboardList,
    title: "1. Place Your Order",
    description: "Select your desired services and schedule a pickup time that works for you, right from our app or website.",
  },
  {
    icon: Truck,
    title: "2. We Pick Up",
    description: "Our friendly driver will arrive at your doorstep to collect your laundry at the scheduled time.",
  },
  {
    icon: WashingMachine,
    title: "3. Expert Cleaning",
    description: "We work our magic! Your clothes are professionally cleaned, folded, and packaged with care.",
  },
  {
    icon: Home,
    title: "4. We Deliver",
    description: "Fresh, clean laundry is delivered back to you, ready to be put away. It's that simple!",
  },
];

export const FAQS = [
  {
    question: "What is your turnaround time?",
    answer: "Our standard turnaround time for Wash & Fold service is 24-48 hours. Dry cleaning and special items may take 2-3 business days. We also offer express options for an additional fee.",
  },
  {
    question: "Do I need to separate my clothes?",
    answer: "You can if you'd like, but it's not necessary! We sort all clothes by color (whites, lights, darks) before washing to prevent any color bleeding.",
  },
  {
    question: "What kind of detergents do you use?",
    answer: "We use high-quality, professional-grade detergents that are tough on stains but gentle on your clothes. We also offer hypoallergenic and eco-friendly options upon request.",
  },
  {
    question: "How do you handle delicate items?",
    answer: "Please place any delicate items in a separate, clearly marked bag. For dry cleaning, our experts follow the specific care instructions on each garment's label to ensure they are handled correctly.",
  },
  {
    question: "What happens if an item is lost or damaged?",
    answer: "While we take the utmost care with every order, in the rare event of an issue, we are fully insured. Please contact our customer support within 48 hours of delivery to report any problems.",
  },
];
