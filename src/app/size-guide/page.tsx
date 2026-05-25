import { PageHero } from "@/components/page-hero";
import { Ruler, CircleDot, Info } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <>
      <PageHero
        label="Help"
        title="Size Guide"
        subtitle="Find your perfect fit — every time."
        image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=800&fit=crop"
      />
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Ring Sizes */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <CircleDot className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl">Ring Sizes</h2>
            </div>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">How to Measure at Home</h3>
            <div className="space-y-4 text-sm text-[var(--siliq-graphite)] mb-8">
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Method 1 — Using an Existing Ring</p>
                <p>Place a ring that fits well on a ruler. Measure the inside diameter in mm. Match to the chart below.</p>
              </div>
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Method 2 — Paper Strip</p>
                <p>Cut a thin strip of paper (5mm wide). Wrap snugly around your finger at the widest point (knuckle). Mark where it overlaps. Measure the length in mm — this is your circumference.</p>
              </div>
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Method 3 — String</p>
                <p>Wrap a piece of string or thread around your finger. Mark the overlap point. Lay flat and measure with a ruler in mm.</p>
              </div>
            </div>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Ring Size Chart</h3>
            <div className="border border-[var(--siliq-line)] overflow-hidden">
              <div className="grid grid-cols-5 bg-[var(--siliq-cream)] text-[10px] font-medium tracking-wider uppercase px-5 py-3">
                <span>SILIQ Size</span><span>India Size</span><span>US Size</span><span>Diameter</span><span>Circumference</span>
              </div>
              {[
                { size: "5", india: "9", us: "5", dia: "15.7 mm", circ: "49.3 mm" },
                { size: "6", india: "11", us: "6", dia: "16.5 mm", circ: "51.9 mm" },
                { size: "7", india: "14", us: "7", dia: "17.3 mm", circ: "54.4 mm" },
                { size: "8", india: "16", us: "8", dia: "18.1 mm", circ: "57.0 mm" },
                { size: "9", india: "19", us: "9", dia: "18.9 mm", circ: "59.5 mm" },
                { size: "10", india: "21", us: "10", dia: "19.8 mm", circ: "62.1 mm" },
                { size: "11", india: "23", us: "11", dia: "20.6 mm", circ: "64.6 mm" },
                { size: "12", india: "25", us: "12", dia: "21.4 mm", circ: "67.2 mm" },
              ].map((r) => (
                <div key={r.size} className="grid grid-cols-5 px-5 py-3 text-sm border-t border-[var(--siliq-line)]">
                  <span className="font-medium">{r.size}</span><span>{r.india}</span><span>{r.us}</span><span>{r.dia}</span><span>{r.circ}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-[var(--siliq-cream)] border border-[var(--siliq-line)] flex gap-3">
              <Info className="w-4 h-4 text-[var(--siliq-accent)] shrink-0 mt-0.5" />
              <div className="text-xs text-[var(--siliq-graphite)] space-y-1">
                <p><strong>Tips for accurate measurement:</strong></p>
                <p>• Measure at the end of the day — fingers swell slightly throughout the day</p>
                <p>• Measure 3-4 times for consistency</p>
                <p>• If between sizes, go up (easier to wear slightly loose than tight)</p>
                <p>• Your dominant hand is usually slightly larger</p>
                <p>• Cold weather = smaller fingers, hot weather = larger</p>
              </div>
            </div>
          </section>

          {/* Necklace Lengths */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <Ruler className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl">Necklace Lengths</h2>
            </div>
            <p className="text-sm text-[var(--siliq-graphite)] mb-6">Necklace length determines where the chain sits on your body. Choose based on your neckline and personal style.</p>

            <div className="border border-[var(--siliq-line)] overflow-hidden">
              <div className="grid grid-cols-4 bg-[var(--siliq-cream)] text-[10px] font-medium tracking-wider uppercase px-5 py-3">
                <span>Length</span><span>Name</span><span>Sits At</span><span>Best For</span>
              </div>
              {[
                { len: "14\"", name: "Choker", sits: "Base of neck", best: "Off-shoulder, V-neck" },
                { len: "16\"", name: "Collar", sits: "Collarbone", best: "Crew neck, casual" },
                { len: "18\"", name: "Princess", sits: "Below collarbone", best: "Most popular, everyday" },
                { len: "20\"", name: "Matinee", sits: "Above bust", best: "Business, layering" },
                { len: "22-24\"", name: "Opera", sits: "Mid-chest", best: "Statement, formal" },
                { len: "30\"+", name: "Rope", sits: "Below bust", best: "Layering, bohemian" },
              ].map((n) => (
                <div key={n.len} className="grid grid-cols-4 px-5 py-3 text-sm border-t border-[var(--siliq-line)]">
                  <span className="font-medium">{n.len}</span><span>{n.name}</span><span>{n.sits}</span><span className="text-[var(--siliq-accent)]">{n.best}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-[var(--siliq-cream)] border border-[var(--siliq-line)]">
              <p className="text-xs text-[var(--siliq-graphite)]"><strong>How to choose:</strong> Stand in front of a mirror. Hold a string at the desired length against your neck. 18 inches works for most people and most necklines — it&apos;s our most popular length.</p>
            </div>
          </section>

          {/* Bracelet Sizing */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-5">Bracelet & Anklet Sizing</h2>
            <p className="text-sm text-[var(--siliq-graphite)] mb-4">Measure your wrist (or ankle) with a flexible tape or string. Add 1-2 cm for a comfortable fit.</p>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Bracelet Sizes</h3>
            <div className="border border-[var(--siliq-line)] overflow-hidden mb-6">
              <div className="grid grid-cols-3 bg-[var(--siliq-cream)] text-[10px] font-medium tracking-wider uppercase px-5 py-3">
                <span>Wrist Size</span><span>Bracelet Length</span><span>Fit Type</span>
              </div>
              {[
                { wrist: "13-14 cm", bracelet: "15-16 cm", fit: "Snug (close to skin)" },
                { wrist: "14-15 cm", bracelet: "16-17 cm", fit: "Standard (slight movement)" },
                { wrist: "15-16 cm", bracelet: "17-18 cm", fit: "Relaxed (moves freely)" },
                { wrist: "16-17 cm", bracelet: "18-19 cm", fit: "Loose (dangles)" },
              ].map((b) => (
                <div key={b.wrist} className="grid grid-cols-3 px-5 py-3 text-sm border-t border-[var(--siliq-line)]">
                  <span className="font-medium">{b.wrist}</span><span>{b.bracelet}</span><span className="text-[var(--siliq-accent)]">{b.fit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Anklet Sizes</h3>
            <div className="border border-[var(--siliq-line)] overflow-hidden">
              <div className="grid grid-cols-3 bg-[var(--siliq-cream)] text-[10px] font-medium tracking-wider uppercase px-5 py-3">
                <span>Ankle Size</span><span>Anklet Length</span><span>Fit Type</span>
              </div>
              {[
                { ankle: "20-21 cm", anklet: "22-23 cm", fit: "Snug" },
                { ankle: "21-23 cm", anklet: "23-25 cm", fit: "Standard" },
                { ankle: "23-25 cm", anklet: "25-27 cm", fit: "Relaxed" },
              ].map((a) => (
                <div key={a.ankle} className="grid grid-cols-3 px-5 py-3 text-sm border-t border-[var(--siliq-line)]">
                  <span className="font-medium">{a.ankle}</span><span>{a.anklet}</span><span className="text-[var(--siliq-accent)]">{a.fit}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--siliq-accent)] mt-3">Most SILIQ bracelets include a 1-1.5 inch extender chain for adjustability. Cuff bracelets are gently adjustable by hand.</p>
          </section>

          {/* Earring Sizes */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-5">Earring Reference</h2>
            <div className="border border-[var(--siliq-line)] overflow-hidden">
              <div className="grid grid-cols-3 bg-[var(--siliq-cream)] text-[10px] font-medium tracking-wider uppercase px-5 py-3">
                <span>Type</span><span>Size Range</span><span>Best For</span>
              </div>
              {[
                { type: "Studs", size: "4-8 mm", best: "Everyday, office, sleeping in" },
                { type: "Small Hoops", size: "12-18 mm", best: "Daily wear, casual" },
                { type: "Medium Hoops", size: "20-30 mm", best: "Going out, statement" },
                { type: "Drop Earrings", size: "30-50 mm", best: "Evening, formal events" },
                { type: "Threaders", size: "50-70 mm drop", best: "Elegant, movement" },
              ].map((e) => (
                <div key={e.type} className="grid grid-cols-3 px-5 py-3 text-sm border-t border-[var(--siliq-line)]">
                  <span className="font-medium">{e.type}</span><span>{e.size}</span><span className="text-[var(--siliq-accent)]">{e.best}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Adjustable */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-4">Adjustable Pieces</h2>
            <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed mb-3">Many SILIQ pieces are designed to be adjustable — marked as &ldquo;ADJ&rdquo; in the size field. These include:</p>
            <ul className="space-y-2 text-sm text-[var(--siliq-graphite)]">
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Open cuff rings</strong> — gently squeeze or expand to fit sizes 5-9</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Cuff bracelets</strong> — adjust opening width by hand</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Chains with extenders</strong> — 1-2 inch extender for flexible length</span></li>
            </ul>
            <p className="text-xs text-[var(--siliq-accent)] mt-3">Adjustable pieces are ideal if you&apos;re unsure of your exact size or want to gift jewellery.</p>
          </section>

          {/* CTA */}
          <section className="bg-[var(--siliq-cream)] p-8 text-center">
            <h3 className="font-display text-xl mb-6">Still Not Sure?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/918954849236" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">WhatsApp Us</a>
              <a href="mailto:support@siliq.co" className="px-8 py-3 border border-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-black)] hover:text-white transition-colors">Email Support</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
