import { journalPosts } from "@/lib/journal-data";
import { JournalPostContent } from "./content";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JournalPostContent slug={slug} />;
}
