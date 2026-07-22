import Hero from "../components/Hero"; import CommitteeCard from "../components/CommitteeCard"; import LeadershipCard from "../components/LeadershipCard"; import Footer from "../components/Footer"; import { sampleSite } from "../data/sampleContent"; import { client, queries } from "../lib/sanity";

/* If SANITY_PROJECT_ID is configured, fetch content; otherwise use sample */ export async function getStaticProps() { let site = sampleSite; let hero = sampleSite.hero; let committees = sampleSite.committees; let leadership = sampleSite.leadership;

if (process.env.SANITY_PROJECT_ID) { try { const [siteSettings, comms, leads] = await Promise.all([ client.fetch(queries.siteSettings), client.fetch(queries.committees), client.fetch(queries.leadership) ]); if (siteSettings) { site = { ...site, ...siteSettings } } if (comms?.length) committees = comms; if (leads?.length) leadership = leads; } catch (e) { console.warn("Sanity fetch failed; using sample content", e.message); } }

return { props: { site, hero, committees, leadership }, revalidate: 60 }; }

export default function Home({ site, hero, committees, leadership }) { if (typeof document !== "undefined" && site?.theme) { const root = document.documentElement; root.style.setProperty("--color-primary", site.theme.primary || "#10243a"); root.style.setProperty("--color-accent", site.theme.accent || "#f4c542"); root.style.setProperty("--font-heading", site.theme.fonts?.heading || "Poppins"); root.style.setProperty("--font-body", site.theme.fonts?.body || "Open Sans"); }

return ( <> <main> <Hero hero={hero} /> <section className="container py-10"> <h2 className="text-2xl font-bold">Committees</h2> <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"> {committees.map((c, i) => <CommitteeCard key={i} c={c} />)} </div> </section>

      <section className="container py-10 bg-neutral">
      <h2 className="text-2xl font-bold">Leadership</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {leadership.map((l, i) => <LeadershipCard key={i} l={l} />)}
      </div>
    </section>
  </main>
  <Footer site={site} />
</>
); }
