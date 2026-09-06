import { SiteBackground } from "@/components/ui/SiteBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Cursor } from "@/components/Cursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Journey } from "@/components/Journey";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

export default function Home() {
  // JSON-LD structured data for richer search results.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.seo.url,
    description: site.seo.description,
    knowsAbout: ["Flutter", "Dart", "AI", "Firebase", "React", "Next.js", "TypeScript"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <LoadingScreen />
      <Cursor />
      <ScrollProgress />
      <SiteBackground />

      <Navbar />

      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
