/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ─── Shared Types ────────────────────────────────────────────────────────────
type Chapter = "problem" | "solutions" | "catch" | "whatnow";

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = ({ activeChapter, onNav }: { activeChapter: Chapter; onNav: (c: Chapter) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { label: string; id: Chapter }[] = [
    { label: "The Problem", id: "problem" },
    { label: "The Solutions", id: "solutions" },
    { label: "The Catch", id: "catch" },
    { label: "What Now?", id: "whatnow" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="flex justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="text-2xl font-black tracking-tighter text-on-surface font-sans">
          The Ocean's Balance
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`font-sans font-bold text-xs tracking-widest uppercase transition-colors duration-300 ${
                activeChapter === item.id
                  ? "text-primary after:content-['•'] after:ml-1"
                  : "text-on-surface/60 hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary">
            <Menu size={24} />
          </button>
        </div> */}
      </div>
    </nav>
  );
};

// // ─── Tide Tracker ─────────────────────────────────────────────────────────────
// const TideTracker = ({ sections, activeSection }: { sections: string[]; activeSection: number }) => (
//   <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-6 items-center">
//     {sections.map((section, i) => (
//       <div key={section} className="group relative flex items-center">
//         <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-surface-container-lowest px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest text-primary border border-outline-variant/10 whitespace-nowrap translate-x-2 group-hover:translate-x-0"
//           style={{ boxShadow: "0 20px 40px -15px rgba(0,105,76,0.04)" }}>
//           {section}
//         </span>
//         <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === i ? "bg-primary scale-125" : "bg-outline-variant hover:bg-primary/50"}`} />
//       </div>
//     ))}
//   </div>
// );

// ─── Hero / Landing Page ──────────────────────────────────────────────────────
const Hero = ({ onBegin }: { onBegin: () => void }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-primary to-primary-container blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-secondary to-secondary-container blur-[100px]" />
    </div>
    <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-start lg:items-center text-left lg:text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="inline-block font-sans font-bold text-xs tracking-[0.3em] uppercase text-primary mb-8 bg-primary-fixed/30 px-4 py-1.5 rounded-full"
      >
        Investigative Special Report
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
        className="font-sans font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-on-surface leading-[0.9] tracking-tighter mb-10 max-w-5xl"
      >
        We're farming the ocean to save it.{" "}
        <span className="text-primary italic">But at what cost?</span>
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="w-full lg:max-w-3xl lg:mx-auto">
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-on-surface-variant leading-relaxed mb-12">
          Fish feeds billions. But the way we grow and process it is changing our oceans forever. Here's both sides of the story.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8 flex flex-col items-center">
        <button onClick={onBegin} className="group flex flex-col items-center space-y-4 cursor-pointer">
          <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-outline opacity-60 group-hover:opacity-100 transition-opacity">Begin the journey</span>
          <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ChevronDown size={24} />
            </motion.div>
          </div>
        </button>
      </motion.div>
    </div>
    <div className="absolute bottom-12 right-12 hidden xl:block w-72">
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1 }}
        className="relative rounded-lg overflow-hidden border border-outline-variant/10"
        style={{ boxShadow: "0 20px 40px -15px rgba(0,105,76,0.04)" }}>
        <img
          alt="Deep water aquaculture site"
          className="w-full aspect-[4/5] object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHib6oc8a3UT6JPPHRa6kbgViJjObyTGaRwwuteiDEdSJU5yTA07vxm_ue6wdg_a_XN7aWwz9SFmSU6Vlia5XDXCW68UdFwZ0W8-c4LRCUSADL8knI-UMG0PIsh1H1LhoRf-XT4TOn4gSCqAFJgu-Wnejcpfh_8Iyuu25UDAWDpdyfu-Ue3VC5yAXRsJmbr0g6lyPwLF_Z9qac_qmx2tkF1vOLpyHXa7BEAZ0ww6vAe0McnKCRkExgDvyr3308CaYoz47CUTt0Uiw"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-on-surface/80 to-transparent">
          <p className="font-sans text-[10px] uppercase tracking-widest text-on-primary font-bold">Plateau Nord, Arctic Circle</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const SplitPanel = () => (
  <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="bg-secondary-fixed p-12 md:p-24 flex flex-col justify-center items-start relative overflow-hidden">
      <span className="font-sans font-black text-8xl md:text-[12rem] text-secondary/10 absolute top-0 left-0 leading-none select-none pointer-events-none">COST</span>
      <div className="relative z-10">
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl text-on-surface mb-8 tracking-tight">The Vanishing Wild</h2>
        <p className="font-serif text-xl text-on-surface/80 max-w-md leading-relaxed">
          For every kilogram of farmed salmon, nearly three kilograms of wild-caught "feeder fish" are extracted from fragile ecosystems in the Global South.
        </p>
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="bg-primary-fixed p-12 md:p-24 flex flex-col justify-center items-start relative overflow-hidden">
      <span className="font-sans font-black text-8xl md:text-[12rem] text-primary/10 absolute top-0 right-0 leading-none select-none pointer-events-none">HOPE</span>
      <div className="relative z-10">
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl text-on-surface mb-8 tracking-tight">Regenerative Tides</h2>
        <p className="font-serif text-xl text-on-surface/80 max-w-md leading-relaxed">
          New vertical ocean farms are growing kelp and shellfish that actually clean the water and sequester carbon, providing food without inputs.
        </p>
      </div>
    </motion.div>
  </section>
);

// ─── Chapter 1: The Problem ───────────────────────────────────────────────────
const ChapterProblem = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Hero */}
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto pt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-8">
          <span className="font-sans font-bold text-xs tracking-[0.3em] uppercase text-secondary mb-6 block">Chapter One: The Extraction</span>
          <h1 className="font-sans font-black text-6xl md:text-8xl tracking-tighter text-on-surface leading-[0.9] mb-12">
            A Debt That <br /><span className="text-secondary italic">Cannot</span> Be Paid.
          </h1>
        </div>
        <div className="md:col-span-4 pb-4">
          <p className="text-xl leading-relaxed italic text-on-surface-variant">
            Our oceans are not failing; they are being overdrawn. We are treating a biological cycle as a limitless credit line.
          </p>
        </div>
      </div>
    </section>

    {/* 17 Fishing Areas */}
    <section className="bg-secondary-fixed py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="relative">
          <span className="font-sans font-black text-[12rem] md:text-[20rem] leading-none text-secondary/20 absolute -top-24 -left-12 select-none">17</span>
          <div className="relative z-10">
            <h2 className="font-sans font-black text-6xl md:text-8xl tracking-tight text-on-surface leading-none">
              17 MAJOR <br />FISHING AREAS
            </h2>
          </div>
        </div>
        <div className="max-w-xl">
          <p className="text-2xl md:text-3xl font-serif leading-snug text-on-surface mb-8">
            Global maritime monitoring has identified seventeen primary ecological zones currently fished far beyond their natural replenishment threshold.
          </p>
          <div className="h-px w-24 bg-on-surface/30 mb-8" />
          <p className="font-sans font-medium text-sm uppercase tracking-widest text-on-surface/70">
            Source: Global Fisheries Watch Report 2024
          </p>
        </div>
      </div>
    </section>

    {/* MSY Explanation */}
    <section className="py-40 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-sans font-bold text-3xl tracking-tight text-on-surface mb-12">The Calculus of Collapse: Understanding MSY</h3>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-on-surface-variant font-serif">
          <p>
            In fisheries management, the <strong className="text-on-surface">Maximum Sustainable Yield (MSY)</strong> is the theoretical largest yield that can be taken from a fish stock over an indefinite period. It is the gold standard for industrial extraction—a point of equilibrium where we take exactly what nature replaces.
          </p>
          <div className="bg-surface-container-low p-12 my-12 relative">
            <p className="font-sans font-bold text-2xl text-primary mb-4 relative z-10">The Paradox of Efficiency</p>
            <p className="relative z-10">When we hit MSY, there is zero margin for error. A single season of climate fluctuation or a minor surge in illegal trawling pushes the entire population into a tailspin from which it may never recover.</p>
          </div>
          <p>
            Today, we aren't just flirting with MSY; we have systematically dismantled it. Industrial fleets equipped with deep-sea sonar and massive dragnets are no longer "fishing"—they are "mining" the sea.
          </p>
        </div>
      </div>
    </section>

    {/* 52% Philippine Production */}
    <section className="pb-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden">
          <div className="bg-surface-container-lowest p-16 flex flex-col justify-center">
            <span className="font-sans font-black text-8xl md:text-[10rem] text-primary leading-none mb-4">52%</span>
            <h4 className="font-sans font-bold text-2xl uppercase tracking-wide text-on-surface mb-6">Philippine Production Shift</h4>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              More than half of the Philippine aquatic output is now driven by aquaculture. As wild stocks dwindle, the archipelago has been forced to pivot toward artificial cultivation to maintain food security.
            </p>
          </div>
          <div className="relative min-h-[400px]">
            <img
              alt="Aerial view of fish farming cages in Philippine waters"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSErslgGsu06CXxhk6LuhdMJukVjo1JFL3AJqSZPHt0oKwFCeCNXXHmfWFdSzo67rar98cFQWjbkjecPIiN0UyxS3lhF3VkOCbMt-tdaVC3SrYYUO-FUzUXbRpCzfC3ZGCaHWDW27YqKtfKnON5zENDKc26kLDr3qQ0gMW2JGUMTD0zFc1JXhNt6f3kGFeeCXlrn1r3iSK3MA5YDnp_MY1MT8y4WNlpGRn2CunMAWMumTeH-9jVC3Fs4qP_wyJkywRa2ylFV5b-kQ"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>

    {/* Crisis Card */}
    {/* <section className="max-w-5xl mx-auto px-6 md:px-12 mb-40">
      <div className="bg-on-surface text-background p-16 rounded-sm text-center">
        <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tighter mb-8 uppercase">The biological clock is ticking.</h2>
        <p className="font-serif text-2xl italic opacity-80 max-w-2xl mx-auto mb-12">
          "If the current trends of over-extraction persist, the 'Blue Economy' will transition from a resource of wealth to a liability of extinction."
        </p>
        <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-sans font-bold px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-transform">
          View Data Sources
        </button>
      </div>
    </section> */}
  </motion.div>
);

// ─── Chapter 2: The Solutions ─────────────────────────────────────────────────
const SpeciesCard = ({ name, desc, img, alt }: { name: string; desc: string; img: string; alt: string }) => (
  <div className="bg-surface-container-lowest p-6 transition-all duration-500 hover:bg-primary-fixed group relative overflow-hidden cursor-default">
    <div className="h-64 mb-6 overflow-hidden rounded-md">
      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img} alt={alt} />
    </div>
    <span className="font-sans font-black text-4xl mb-2 block">{name}</span>
    <p className="text-on-surface-variant group-hover:text-on-surface transition-colors font-serif">{desc}</p>
  </div>
);

const ProcessStep = ({ icon, title, desc, right }: { icon: string; title: string; desc: string; right?: boolean }) => (
  <div className="relative flex flex-col md:flex-row items-center mb-32 group">
    {!right && (
      <div className="flex-1 md:text-right md:pr-16 order-2 md:order-1">
        <h3 className="font-sans font-extrabold text-3xl mb-4">{title}</h3>
        <p className="text-on-surface-variant font-serif">{desc}</p>
      </div>
    )}
    <div className="z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary mb-6 md:mb-0 order-1 md:order-2 flex-shrink-0">
      <span className="text-2xl">{icon}</span>
    </div>
    {right ? (
      <div className="flex-1 md:pl-16 order-3">
        <h3 className="font-sans font-extrabold text-3xl mb-4">{title}</h3>
        <p className="text-on-surface-variant font-serif">{desc}</p>
      </div>
    ) : (
      <div className="flex-1 md:pl-16 order-3 hidden md:block" />
    )}
  </div>
);

const ProductCard = ({ label, name, desc, img, alt, offset }: { label: string; name: string; desc: string; img: string; alt: string; offset?: string }) => (
  <div className={`space-y-6 ${offset ?? ""}`}>
    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
      <img className="w-full h-full object-cover" src={img} alt={alt} />
    </div>
    <div>
      <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">{label}</span>
      <h3 className="font-sans font-extrabold text-2xl mt-2 mb-3">{name}</h3>
      <p className="text-on-surface-variant font-serif">{desc}</p>
    </div>
  </div>
);

const ChapterSolutions = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Hero */}
    <header className="px-6 md:px-12 mb-40 max-w-7xl mx-auto pt-32">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-8">
          <span className="font-sans font-bold text-sm tracking-widest uppercase text-primary mb-4 block">Chapter Two</span>
          <h1 className="font-sans font-black text-6xl md:text-8xl text-on-surface leading-[0.9] tracking-tighter mb-8">
            The Blue <span className="text-primary italic">Regeneration.</span>
          </h1>
          <p className="text-2xl text-on-surface-variant leading-relaxed max-w-2xl font-serif">
            Restoring the equilibrium requires more than restraint; it demands a radical reimagining of how we nurture the ocean's bounty. From resilient local species to high-integrity processing.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 hidden lg:block">
          <div className="bg-primary-fixed p-8 rounded-lg">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-on-surface mb-2 block">Objective</span>
            <p className="text-on-surface font-medium">To transition 60% of regional consumption to restorative aquaculture by 2030.</p>
          </div>
        </div>
      </div>
    </header>

    {/* Species */}
    <section className="mb-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="font-sans font-bold text-4xl mb-4">Pioneering Species</h2>
        <p className="text-lg text-on-surface-variant font-serif">Selecting species that thrive in harmony with the local ecosystem, reducing the pressure on wild stocks.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1920px] mx-auto">
        <SpeciesCard name="Milkfish" desc="The backbone of regional aquaculture, known for its incredible hardiness and low trophic footprint."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBWuwVoacxIR-hOH4exH_YxkrUvPy4POFa0XoOZKyZIap0DQp1McnHH1qnoZB1xe_mzKn_cuv8II8gCzXIZij4N2U9Zh7hRyMzpgVQNTCefTJueUOrYdP4zanKT0_2pIFc4-6exKFC7JAxxeAYKzQwP5qITiHTXNoydsqMLkt47cFld8UWc8CcRqNU7PBOV4J_qx7u3oEuIR_b0_5YNRJjYu2LkDhM-3ql2VCJnQJHvW8b8uGbroYYAedDsupS8q4HlkaHmZSfTkuI"
          alt="Milkfish in coastal water" />
        <SpeciesCard name="Tilapia" desc="Efficient protein converters that adapt seamlessly to diverse environmental conditions."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBcCCkMPhr9dH7-fD9EPedHNEmxDr4_ZzvuFdKMps3KYbwUO956z3eXL3BQ_Kg-H3qREgE2wu3by1zJbhXHJa_mQlVAEeJAPBvRIixEsQLz6t4kA6Q5oY0BmEJcvmrMgUGbw_VA4JCgSzSFT2MDw_pRGFB58L75tmA1y7YTl4uh58FQOvhGo4I8gaJmPoDjLb2ZbpF8JlbPLULY1SgkkUHvl7qH9Klxqe1ya8dwwjJmVPVBdmHE_L0lTWa3QR19yuFdaCxpzcbWEwg"
          alt="Tilapia in aquaculture" />
        <SpeciesCard name="Shrimp" desc="Cultivated in mangrove-friendly enclosures to preserve vital coastal nursery habitats."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBF5XuAQOQQxHgwb6uVfg5skr2FCE-SfmO1i4dk4lQ8KwYfecWKanwBOCRNkdg2HvY3Qzf7r7_HklOGTceeWN57nW8FA9VQLT-S3T2kHXXElI7V06ZUhhZ8CTW4Qi1BqJZYgFjoPyRoy1txX5pYdvMFwkGyjOS0D43I7dlJ-yH29K0aUa0lC1jPBDxH9rndxpGOMA7U6ISaNXMXsK3-9F1gvt4YKFyPy1eu5e4VCOh3aIObwSKXKnO1U-ZFP5bjY3Ub-5r6RrPnXM4"
          alt="Shrimp in aquaculture" />
        <SpeciesCard name="Crab" desc="Mud crab fattening programs provide high-value income for small-scale coastal guardians."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuD5V16NejxU1s-Lq7fKkEvRByUgq0Qq1tRNUguy3b1LZvCULMjcYKQJ083Mibq9rJ5-l9A8QeljWJPQ4VoxWiPmfmfYgEZJUT6eV5lIW7ZBHc-lK3YQJ0kt0Ea75za83llpev8Bi0aCXxl4cdAWAEz5RRyWKtx8PCX9ozpBnDVhpYeaj-z4RX33qdF6E9lhdwsxFZCFJzeopj2w_uwXHZ4BmSndoANqIoDdW9O8tlstTYxchAkYYfm-vnQQcOcE2nk8m0ApzIQCyl8"
          alt="Mud crab" />
      </div>
    </section>

    {/* Processing Chain */}
    <section className="mb-40 py-32 bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-sans font-bold text-sm tracking-widest uppercase text-primary mb-4 block">The Value Stream</span>
          <h2 className="font-sans font-black text-5xl mb-6">From Ocean to Table</h2>
          <p className="text-lg text-on-surface-variant font-serif">A non-linear commitment to quality ensures that every harvest retains its integrity, minimizing waste and maximizing nutritional value.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 hidden md:block transform -translate-x-1/2" />
          <ProcessStep icon="⚙️" title="Processing" desc="Humane harvesting and immediate cold-chain entry to lock in peak freshness and texture." />
          <ProcessStep icon="❄️" title="Preservation" desc="Utilizing blast freezing and artisanal salt-curing techniques to extend shelf life naturally." right />
          <ProcessStep icon="✅" title="Quality Control" desc="Rigorous molecular testing for purity and sustainability compliance at every batch level." />
          <ProcessStep icon="📦" title="Packaging" desc="Compostable, seaweed-based materials that ensure the product's end-of-life returns to the earth." right />
        </div>
      </div>
    </section>

    {/* Products */}
    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div className="max-w-2xl">
          <h2 className="font-sans font-black text-5xl mb-6">Culinary Manifestos</h2>
          <p className="text-lg text-on-surface-variant font-serif">These aren't just products; they are the tangible proof of a balanced ocean. High-quality, sustainable, and culturally resonant.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ProductCard label="Heritage Range" name="Smoked Bangus" desc="Slow-smoked using local coconut husks, preserving a traditional flavor profile while utilizing sustainably farmed milkfish."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuABWP8iTz9BhENm_AVAlry75fSCjsmZPVmn1vTs9EgGurE9Khfy66yGuNE3_sVhMV2Raq41SnkgWkyTtJgkGaxaVK4PF3dafy1WcX7hhbWG4a9UIgCVIlgBPapRS3N6pqEimRHrIkIDJ_95VAck3YHS2m2CswmhNp_MgolYNe1M5vNjU7CJ3YPagqs8l3cPKWneweKnx43PumMYTIAkz6Ux8uK8QhBNfnNzVs73YO9RESAq-DOQklo35Sf7adX6rffBvywx-rp4OkA"
          alt="Smoked bangus" />
        <ProductCard label="Pantry Essentials" name="Canned Sardines" desc="Premium small-batch sardines in organic cold-pressed oil, sourced exclusively from community-managed waters."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuC-kTVD8_adaVy6T0IVw5aRrcYBWSusVCTpg1MpA0YcclwQ9lkqYEGfU2OwFo12zO-ofIgqIs2T-aT3A7E4kQqZyCVIRQH9vsjUKxtrA8QFmM8n4GY4dlodN_l4qk52qBIylkLAOIweYxoKsQm_i9GUvmt5UU9h0wwqvL40G8yV486c5hC4fBErRW_Rcb1zKwFFtcS4nXSTef2tCJepAxULuOQzKSOhl74afstxAfx3WAfGgfLGo_dX_uMORpJa8YAuka3luBMBEPE"
          alt="Canned sardines" offset="md:translate-y-12" />
        <ProductCard label="Innovation Lab" name="Tahong Chips" desc="A zero-waste innovation utilizing nutrient-rich mussels to create a protein-dense, crunchy snack alternative."
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuAM8xcOouSSIn26UoQnVV73jfdyJP7PjtIcLLf_Oz1Iv5e6CbgorEqvtyHR8UG0j-8TbLF2xGTauxUixve4y0ycDJ7-0ArC-WOjSQqpDiw5eOGZnQww9PG5GQ87jiu37dlRXFhpTuTr-eDaOD2-hed5hxNinvEJCcJ2mNGdoGFLTx9YetTedejuxMBu8PZXhjWk9PZbr70-ND2pG8M0vMzEDpxumIgB2Afahhusy5UkVDAeMD1RvKNLDujw2H9262RKgd10d-qRxVg"
          alt="Tahong chips" offset="md:translate-y-24" />
      </div>
    </section>

  </motion.div>
);

// ─── Chapter 3: The Catch ─────────────────────────────────────────────────────
interface FlipCardProps { frontIcon: string; frontTitle: string; backTitle: string; backBody: string; }
const FlipCard = ({ frontIcon, frontTitle, backTitle, backBody }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="h-64 w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.6s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        {/* Front */}
        <div className="absolute inset-0 bg-surface-container-lowest p-8 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
          <span className="text-4xl">{frontIcon}</span>
          <h3 className="font-sans font-bold text-xl uppercase tracking-widest">{frontTitle}</h3>
          <p className="text-sm opacity-70 font-serif">Hover to see the ecological conversion</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-primary-container p-8 flex flex-col justify-center items-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <h4 className="font-sans font-bold mb-4 text-on-primary-container">{backTitle}</h4>
          <p className="font-serif italic text-lg leading-tight text-on-primary-container">{backBody}</p>
        </div>
      </div>
    </div>
  );
};

const ChapterCatch = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Hero */}
    <section className="px-6 md:px-12 mb-32 pt-32">
      <div className="max-w-screen-2xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-6">Chapter Three</p>
        <h1 className="font-sans font-black text-7xl md:text-9xl leading-[0.9] tracking-tighter mb-12">
          The <span className="text-secondary">Catch.</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl font-serif leading-relaxed text-on-surface-variant italic">
              Every technological marvel at sea carries a shadow. While we celebrate the harvest, the invisible ledger of ecological debt continues to grow.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Split Balance */}
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      {/* Left: Benefits */}
      <div className="bg-primary-fixed p-12 md:p-24 flex flex-col justify-center">
        <div className="max-w-xl ml-auto">
          <h2 className="font-sans font-bold text-4xl mb-8 text-primary">The Blue Dividend</h2>
          <p className="text-lg leading-relaxed mb-12 font-serif">
            Industrial aquaculture promises a world where food security is untethered from the volatility of wild stocks. High-yield systems and efficient biomass conversion are the heralds of this new age.
          </p>
          <div className="space-y-8">
            <FlipCard frontIcon="🍽️" frontTitle="Tuna Offals" backTitle="Nutrient Recovery" backBody="Converting waste into high-protein animal feed, closing the circular economy loop in global tuna processing." />
            <FlipCard frontIcon="🌿" frontTitle="Oyster Shells" backTitle="pH Neutralization" backBody="Utilizing discarded shells to buffer ocean acidification and provide structural substrate for new reef growth." />
          </div>
        </div>
      </div>
      {/* Right: Costs */}
      <div className="bg-secondary-fixed p-12 md:p-24 flex flex-col justify-center">
        <div className="max-w-xl">
          <h2 className="font-sans font-bold text-4xl mb-8 text-secondary">The Toxic Ledger</h2>
          <p className="text-lg leading-relaxed mb-12 font-serif">
            The concentration of life inevitably leads to the concentration of waste. When we force the ocean to produce beyond its natural rhythm, the biological feedback is swift and devastating.
          </p>
          <div className="space-y-12">
            {[
              { title: "Eutrophication", desc: 'Excess nitrogen from intensive pens triggers algae blooms, suffocating entire local ecosystems in "dead zones."' },
              { title: "Mangrove Destruction", desc: "Shrimp farming alone has decimated 35% of the world's coastal mangroves, removing our best defense against storm surges." },
              { title: "Antibiotic Resistance", desc: 'Prophylactic drug use in aquaculture is leaking into the wild, creating "super-pathogens" that threaten human medicine.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0 text-on-secondary font-bold text-lg">!</div>
                <div>
                  <h4 className="font-sans font-bold text-xl text-secondary uppercase tracking-tighter">{item.title}</h4>
                  <p className="font-serif italic text-on-surface-variant leading-snug mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* "So, is it worth it?" */}
    <section className="py-40 px-6 md:px-12 text-center max-w-4xl mx-auto">
      <h2 className="font-sans font-black text-6xl md:text-8xl tracking-tighter mb-12">
        So, is it <em className="text-primary not-italic italic">worth</em> it?
      </h2>
      <p className="font-serif text-xl text-on-surface-variant leading-relaxed mb-12">
        The balance isn't a static point; it's a constant negotiation. We trade mangrove carbon sinks for protein calories, and antibiotic efficacy for market stability. The question isn't whether we should farm the seas, but how much we are willing to let them die in the process.
      </p>
      <button className="bg-on-surface text-background font-sans font-bold px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-transform">
        Explore the Global Ledger
      </button>
    </section>

    {/* 3-up Image Grid */}
    <section className="px-6 md:px-12 pb-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-lg bg-on-surface aspect-square flex items-end p-8">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary to-secondary" />
          <p className="font-sans font-black text-on-primary text-2xl uppercase tracking-widest relative z-10">Safe Zone Work</p>
        </div>
        <div className="bg-primary-fixed rounded-lg aspect-square flex flex-col items-center justify-center p-8 text-center">
          <span className="font-sans font-black text-7xl text-primary leading-none mb-4">60%</span>
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-on-surface">of mangrove loss in Southeast Asia is linked to aquaculture expansion.</p>
        </div>
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSErslgGsu06CXxhk6LuhdMJukVjo1JFL3AJqSZPHt0oKwFCeCNXXHmfWFdSzo67rar98cFQWjbkjecPIiN0UyxS3lhF3VkOCbMt-tdaVC3SrYYUO-FUzUXbRpCzfC3ZGCaHWDW27YqKtfKnON5zENDKc26kLDr3qQ0gMW2JGUMTD0zFc1JXhNt6f3kGFeeCXlrn1r3iSK3MA5YDnp_MY1MT8y4WNlpGRn2CunMAWMumTeH-9jVC3Fs4qP_wyJkywRa2ylFV5b-kQ"
            alt="Aerial aquaculture" className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  </motion.div>
);

// ─── Chapter 4: What Now? ─────────────────────────────────────────────────────
const AgencyCard = ({ icon, name, fullName, desc, linkText, color }: { icon: string; name: string; fullName: string; desc: string; linkText: string; color: string }) => (
  <div className="bg-surface-container-lowest p-10 rounded-xl flex flex-col h-full">
    <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-8 text-2xl ${color}`}>{icon}</div>
    <h3 className="font-sans font-bold text-xl mb-4">{name}</h3>
    <p className={`font-sans text-sm font-bold uppercase mb-6 ${color.includes("primary") ? "text-primary" : color.includes("tertiary") ? "text-tertiary" : "text-secondary"}`}>{fullName}</p>
    <p className="text-on-surface-variant mb-8 flex-grow font-serif">{desc}</p>
    <a href="#" className={`font-sans font-bold inline-flex items-center hover:translate-x-2 transition-transform ${color.includes("primary") ? "text-primary" : color.includes("tertiary") ? "text-tertiary" : "text-secondary"}`}>
      {linkText} →
    </a>
  </div>
);

const ChapterWhatNow = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Hero */}
    <section className="px-6 md:px-12 mb-40 max-w-6xl mx-auto pt-32">
      <div className="relative py-12">
        <span className="font-sans font-bold text-sm tracking-[0.3em] uppercase text-primary mb-6 block">Chapter IV: The Future Outlook</span>
        <h1 className="font-sans font-black text-6xl md:text-8xl leading-[0.9] text-on-surface mb-12 max-w-4xl">What Now?</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-on-surface-variant">
              "Fish processing technology aims to feed the growing population by maximizing yields and extending shelf life, while ensuring the least environmental impact possible."
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <div className="p-8 bg-surface-container-low rounded-xl">
              <p className="font-sans font-bold text-sm text-secondary uppercase tracking-widest mb-4">Reflection Prompt</p>
              <h2 className="font-sans font-bold text-2xl mb-6">What do you think should be done?</h2>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-sans font-bold hover:scale-105 active:scale-95 transition-transform">
                Share Your Perspective →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Safety Framework */}
    <section className="bg-surface-container-low py-40">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-24 max-w-3xl">
          <h2 className="font-sans font-black text-5xl mb-8">The Safety Framework</h2>
          <p className="text-xl leading-relaxed text-on-surface-variant font-serif">In the Philippines, ensuring the integrity of the blue economy falls under a multi-agency shield. This legislative infrastructure is designed to bridge the gap between industrial efficiency and public health.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AgencyCard icon="🌊" name="BFAR" fullName="Bureau of Fisheries & Aquatic Resources" desc="Regulating post-harvest practices and ensuring that aquatic resources are processed under sustainable and sanitary conditions." linkText="View Guidelines" color="bg-primary-fixed" />
          <AgencyCard icon="🌾" name="DA" fullName="Department of Agriculture" desc="Overseeing the broader food security chain, integrating fisheries into the national agricultural safety standards." linkText="Agency Protocol" color="bg-tertiary-fixed" />
          <AgencyCard icon="🛡️" name="DOH" fullName="Department of Health" desc="The final arbiter of safety, managing the Food and Drug Administration (FDA) to certify processed fish for consumption." linkText="Safety Reports" color="bg-secondary-fixed" />
        </div>
      </div>
    </section>

    {/* Join the Narrative */}
    <section className="py-40 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-sans font-black text-4xl mb-12">Join the Narrative</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 bg-white rounded-2xl flex flex-col items-center group">
            <span className="text-5xl text-outline-variant group-hover:text-primary transition-colors mb-6">📚</span>
            <h4 className="font-sans font-bold text-xl mb-4">wala ko balo iadd</h4>
            <p className="text-on-surface-variant mb-8 font-serif">ambot ano iadd</p>
            <a href="#" className="underline underline-offset-4 font-sans font-bold text-primary">ano iadd tman</a>
          </div>
          <div className="p-12 bg-white rounded-2xl flex flex-col items-center group">
            <span className="text-5xl text-outline-variant group-hover:text-secondary transition-colors mb-6">🗳️</span>
            <h4 className="font-sans font-bold text-xl mb-4">Citizen Input</h4>
            <p className="text-on-surface-variant mb-8 font-serif">Participate in our national survey regarding food security and environmental safety.</p>
            <a href="#" className="underline underline-offset-4 font-sans font-bold text-secondary">Open Google Form wala pani nalink sa google form, idk kng want nyo ni dayonon</a>
          </div>
        </div>
      </div>
    </section>

    {/* Visual Anchor */}
    <section className="w-full h-[500px] relative overflow-hidden">
      <img
        alt="Fisherman at sea"
        className="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhSbDeO11qxEarrZYIUPAUXGsdy49Am6RhZ4EN4Ox9Izm-BLWiUIvReIglYvMLOJdcK_cNnbqjYLeD0vu4ZqvfRKaD481Q2mEJsTWwaw6g0VCMSCppo9JhTkZlWawBR7lJJjoALCa9xN2LtW7u2a5vrjtHVw_i59WHEHMMmd4gOv_1br9hYQ7iisdDz7dOfRz6Hkr78O14H0qR-q-46jprpX4czDPuNmj7XLH3WgNIDQwtJQp3_JFMeKJ0d7ju_3Hp-2XtTxJljQE"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </section>
  </motion.div>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-surface-container w-full py-24 px-12">
    <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
      <div className="text-xl font-bold font-sans text-primary uppercase tracking-[0.4em]">The Narrative Current</div>
      <p className="font-serif italic text-lg text-on-surface max-w-2xl">
        We believe that complex problems deserve deep exploration. Our journalism is funded by readers who value the nuance of the blue economy.
      </p>
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        <a className="font-sans text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity underline decoration-primary underline-offset-4" href="#">Privacy Policy</a>
        <a className="font-sans text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity" href="#">Data Sources</a>
        <a className="font-sans text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity" href="#">Contact Editor</a>
      </nav>
      <div className="pt-8 border-t border-outline-variant/20 w-full">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-on-surface/40">
          © 2024 The Narrative Current. Investigative Journalism for the Blue Economy.
        </p>
      </div>
    </div>
  </footer>
);

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [view, setView] = useState<"home" | Chapter>("home");
  const mainRef = useRef<HTMLDivElement>(null);

  const chapterSections: Record<Chapter, string[]> = {
    problem: ["The Extraction", "MSY Crisis", "Philippine Data"],
    solutions: ["Species", "Processing", "Products"],
    catch: ["The Balance", "Worth It?", "Impact"],
    whatnow: ["Outlook", "Framework", "Join"],
  };

  const tideSection = view === "home"
    ? ["The Narrative", "Data Deep-Dive", "Global Impact"]
    : chapterSections[view];

  const [activeDot] = useState(0);

  const handleNav = (chapter: Chapter) => {
    setView(chapter);
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen selection:bg-primary-fixed selection:text-primary" ref={mainRef}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />
      <Navbar activeChapter={view === "home" ? "problem" : view} onNav={handleNav} />
      {/* <TideTracker sections={tideSection} activeSection={activeDot} /> */}
      <main>
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Hero onBegin={() => handleNav("problem")} />
              <SplitPanel />
            </motion.div>
          )}
          {view === "problem" && <motion.div key="problem"><ChapterProblem /></motion.div>}
          {view === "solutions" && <motion.div key="solutions"><ChapterSolutions /></motion.div>}
          {view === "catch" && <motion.div key="catch"><ChapterCatch /></motion.div>}
          {view === "whatnow" && <motion.div key="whatnow"><ChapterWhatNow /></motion.div>}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}