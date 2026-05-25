import { Sparkles, Droplets, Wind, Box, ShieldCheck, AlertTriangle, Heart } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export default function CareGuidePage() {
  return (
    <>
      <PageHero
        label="Aftercare"
        title="Care Guide"
        subtitle="Simple habits that keep your silver beautiful for years."
        image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&h=800&fit=crop"
      />

      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-[var(--siliq-graphite)] mb-12 text-center max-w-xl mx-auto">925 sterling silver is a precious metal that responds to how it&apos;s worn, stored, and cared for. With these simple habits, your SILIQ pieces will stay beautiful for a lifetime.</p>

          {/* Why Silver Tarnishes */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-4">Why Does Silver Tarnish?</h2>
            <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed mb-3">Tarnishing is a natural chemical reaction — not a defect. When silver comes in contact with sulphur compounds in the air, sweat, perfume, or certain foods, it forms a dark layer called silver sulphide.</p>
            <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">This process is completely normal and reversible. In fact, tarnishing is proof that your silver is real. Our pieces are rhodium-plated to significantly slow this process, but over time, all silver will develop some patina.</p>
          </section>

          {/* Daily Care */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Daily Care Habits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Sparkles, title: "Wear It Often", desc: "The natural oils in your skin actually help prevent tarnish. The more you wear your silver, the brighter it stays. Don't save it for special occasions." },
                { icon: Heart, title: "Put On Last", desc: "Make jewellery the last thing you put on. Apply perfume, deodorant, lotion, sunscreen, and hairspray first — then add your silver." },
                { icon: Droplets, title: "Remove Before Water", desc: "Take off jewellery before showering, swimming, washing dishes, or exercising. Chlorine, salt water, and sweat accelerate tarnishing." },
                { icon: Wind, title: "Wipe After Wearing", desc: "Give each piece a quick wipe with a soft microfibre cloth after wearing. This removes oils and moisture that cause tarnish overnight." },
              ].map((c) => (
                <div key={c.title} className="border border-[var(--siliq-line)] p-6">
                  <c.icon className="w-6 h-6 mb-4 text-[var(--siliq-graphite)]" strokeWidth={1.2} />
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase mb-2">{c.title}</h3>
                  <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Storage */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <Box className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl">Storage</h2>
            </div>
            <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed mb-4">Proper storage prevents 80% of tarnishing. The goal is to limit air exposure.</p>
            <ul className="space-y-3 text-sm text-[var(--siliq-graphite)]">
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Use the SILIQ pouch</strong> — every order includes an anti-tarnish lined pouch. Store each piece separately.</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Keep pieces apart</strong> — silver scratches easily against other metals and gemstones.</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Avoid humidity</strong> — don&apos;t store in bathrooms. Keep away from windowsills (heat + sunlight).</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Add silica gel packets</strong> — place one in your jewellery box to absorb moisture.</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)]">•</span><span><strong>Zip-lock bags work</strong> — in a pinch, seal pieces in a zip-lock with air squeezed out.</span></li>
            </ul>
          </section>

          {/* Cleaning */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl">Cleaning Your Silver</h2>
            </div>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Level 1 — Light Tarnish (weekly)</h3>
            <p className="text-sm text-[var(--siliq-graphite)] mb-6">Use the SILIQ polishing cloth (included with every order). Rub gently in straight strokes — not circular. This removes surface tarnish in seconds and restores shine.</p>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Level 2 — Moderate Tarnish (monthly)</h3>
            <ol className="space-y-2 text-sm text-[var(--siliq-graphite)] mb-6">
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">01</span><span>Mix warm water with 2-3 drops of mild dish soap (like Vim liquid)</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">02</span><span>Soak your piece for 5 minutes</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">03</span><span>Gently scrub with a soft toothbrush (baby toothbrush works best)</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">04</span><span>Rinse thoroughly under running water</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">05</span><span>Pat dry immediately with a soft cotton cloth — never air dry</span></li>
            </ol>

            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Level 3 — Heavy Tarnish (as needed)</h3>
            <ol className="space-y-2 text-sm text-[var(--siliq-graphite)]">
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">01</span><span>Line a bowl with aluminium foil (shiny side up)</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">02</span><span>Add hot water and 1 tablespoon of baking soda</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">03</span><span>Place your silver piece on the foil — ensure it touches the foil</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">04</span><span>Wait 2-3 minutes — the tarnish transfers to the foil (electrochemical reaction)</span></li>
              <li className="flex gap-3"><span className="text-[var(--siliq-accent)] font-medium">05</span><span>Rinse, dry thoroughly, and polish with the SILIQ cloth</span></li>
            </ol>
          </section>

          {/* What NOT to Do */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={1.5} />
              <h2 className="font-display text-2xl">What to Avoid</h2>
            </div>
            <div className="border border-red-100 bg-red-50/30 p-6">
              <ul className="space-y-3 text-sm text-[var(--siliq-graphite)]">
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Toothpaste</strong> — abrasive, scratches the surface permanently</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Bleach or ammonia</strong> — damages silver irreversibly</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Paper towels</strong> — contain fibres that scratch silver</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Ultrasonic cleaners</strong> — can loosen stone settings</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Rubber bands</strong> — rubber contains sulphur which causes instant tarnish</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Swimming pools & hot tubs</strong> — chlorine is silver&apos;s worst enemy</span></li>
                <li className="flex gap-3"><span className="text-red-500 font-medium">✗</span><span><strong>Sleeping in jewellery</strong> — chains can kink, rings can bend under pressure</span></li>
              </ul>
            </div>
          </section>

          {/* Special Care */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-5">Special Care Notes</h2>
            <div className="space-y-4 text-sm text-[var(--siliq-graphite)]">
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Rings</p>
                <p>Remove before washing hands, applying hand cream, or doing housework. Store flat to prevent bending.</p>
              </div>
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Chains & Necklaces</p>
                <p>Clasp closed before storing to prevent tangling. Hang if possible, or lay flat — never ball up.</p>
              </div>
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Earrings</p>
                <p>Wipe posts with rubbing alcohol occasionally for hygiene. Store in pairs to avoid losing one.</p>
              </div>
              <div className="border-l-2 border-[var(--siliq-line)] pl-5">
                <p className="font-medium text-[var(--siliq-black)] mb-1">Bracelets & Anklets</p>
                <p>Open clasps gently — don&apos;t force. Remove before sleeping to prevent kinking.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[var(--siliq-cream)] p-8 text-center">
            <h3 className="font-display text-2xl mb-3">Need Help With Your Piece?</h3>
            <p className="text-sm text-[var(--siliq-graphite)] mb-6 max-w-md mx-auto">If your piece has heavy tarnish, scratches, or damage that home cleaning can&apos;t fix — reach out. We&apos;re happy to advise.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:support@siliq.co" className="px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Email Us</a>
              <a href="https://wa.me/918954849236" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-black)] hover:text-white transition-colors">WhatsApp</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
