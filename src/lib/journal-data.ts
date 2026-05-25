export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Styling" | "Care Tips" | "Silver Knowledge";
  image: string;
  date: string;
  readTime: string;
  content: { type: "p" | "h2" | "h3" | "img" | "list"; value: string | string[] }[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "how-to-style-silver-jewellery",
    title: "How to Style Silver Jewellery for Every Occasion",
    excerpt: "From boardrooms to brunches — learn how to wear silver with confidence. Layering, stacking, and pairing tips from our design team.",
    category: "Styling",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop",
    date: "May 2026",
    readTime: "5 min",
    content: [
      { type: "p", value: "From boardrooms to brunches — learn how to wear silver with confidence. Layering, stacking, and pairing tips from our design team." }
    ],
  },
  {
    slug: "silver-care-101",
    title: "Silver Care 101: Keep Your Pieces Shining for Years",
    excerpt: "Sterling silver tarnishes — it's natural chemistry, not a defect. Here's everything you need to know about cleaning, storing, and maintaining your jewellery.",
    category: "Styling",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=600&fit=crop",
    date: "May 2026",
    readTime: "4 min",
    content: [
      { type: "p", value: "Sterling silver tarnishes — it's natural chemistry, not a defect. Here's everything you need to know about cleaning, storing, and maintaining your jewellery." }
    ],
  },
  {
    slug: "what-is-925-sterling-silver",
    title: "What is 925 Sterling Silver? The Complete Guide",
    excerpt: "The science behind the stamp. Why 92.5% silver is the international standard, how to verify authenticity, and why it matters for your jewellery.",
    category: "Care Tips",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&h=600&fit=crop",
    date: "Apr 2026",
    readTime: "6 min",
    content: [
      { type: "p", value: "The science behind the stamp. Why 92.5% silver is the international standard, how to verify authenticity, and why it matters for your jewellery." }
    ],
  },
  {
    slug: "ring-stacking-guide",
    title: "The Art of Ring Stacking: Rules, Tips & Combinations",
    excerpt: "Mixing textures, widths, and finishes. How to build a ring stack that looks intentional, personal, and effortlessly cool.",
    category: "Silver Knowledge",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=600&fit=crop",
    date: "Apr 2026",
    readTime: "4 min",
    content: [
      { type: "p", value: "Mixing textures, widths, and finishes. How to build a ring stack that looks intentional, personal, and effortlessly cool." }
    ],
  },
  {
    slug: "silver-vs-gold-which-suits-you",
    title: "Silver vs Gold: Which Metal Flatters You Most?",
    excerpt: "Cool tones, warm tones, and neutral — a practical guide to choosing the metal that makes your skin glow.",
    category: "Styling",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop",
    date: "Mar 2026",
    readTime: "4 min",
    content: [
      { type: "p", value: "Cool tones, warm tones, and neutral — a practical guide to choosing the metal that makes your skin glow." }
    ],
  },
  {
    slug: "necklace-layering-tips",
    title: "Necklace Layering: 5 Principles That Always Work",
    excerpt: "Different lengths, varying textures, one focal point. Master the layered necklace look with these simple, repeatable principles.",
    category: "Silver Knowledge",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1200&h=600&fit=crop",
    date: "Mar 2026",
    readTime: "4 min",
    content: [
      { type: "p", value: "Different lengths, varying textures, one focal point. Master the layered necklace look with these simple, repeatable principles." }
    ],
  }
];
