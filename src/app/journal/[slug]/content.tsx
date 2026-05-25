"use client";
import { journalPosts } from "@/lib/journal-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function JournalPostContent({ slug }: { slug: string }) {
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl mb-4">Post Not Found</h1>
        <Link href="/journal" className="text-xs tracking-wider uppercase underline">Back to Journal</Link>
      </div>
    );
  }

  const related = journalPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <span className="text-[10px] tracking-[0.2em] uppercase bg-white/20 backdrop-blur-sm text-white px-3 py-1">{post.category}</span>
            <h1 className="font-display text-3xl md:text-5xl font-light text-white mt-4 max-w-3xl">{post.title}</h1>
            <p className="text-sm text-white/70 mt-3">{post.date} · {post.readTime} read</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link href="/journal" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--siliq-accent)] hover:text-[var(--siliq-black)] transition-colors mb-10">
            <ArrowLeft className="w-3 h-3" /> Back to Journal
          </Link>
        </motion.div>

        <div className="space-y-8">
          {post.content.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            >
              {block.type === "p" && <p className="text-[15px] leading-relaxed text-[var(--siliq-graphite)]">{block.value as string}</p>}
              {block.type === "h2" && <h2 className="font-display text-2xl font-light mt-4">{block.value as string}</h2>}
              {block.type === "h3" && <h3 className="font-display text-xl font-light mt-2">{block.value as string}</h3>}
              {block.type === "img" && (
                <div className="aspect-[16/9] overflow-hidden bg-[var(--siliq-pearl)] my-4">
                  <Image src={block.value as string} alt="" width={900} height={500} className="w-full h-full object-cover" />
                </div>
              )}
              {block.type === "list" && (
                <ul className="space-y-2 pl-4">
                  {(block.value as string[]).map((item, j) => (
                    <li key={j} className="text-[15px] text-[var(--siliq-graphite)] leading-relaxed flex gap-3">
                      <span className="text-[var(--siliq-accent)] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 px-6 bg-[var(--siliq-cream)]">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-display text-2xl text-center mb-10">More from the Journal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((r, idx) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <Link href={`/journal/${r.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--siliq-platinum)] mb-4">
                    <Image src={r.image} alt={r.title} width={800} height={500} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--siliq-accent)]">{r.category}</span>
                  <h4 className="font-display text-lg font-light mt-1 group-hover:opacity-70 transition-opacity">{r.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
