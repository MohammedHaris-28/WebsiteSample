import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import SectionEntrance from "@/components/SectionEntrance";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInfra from "@/assets/project-infrastructure.jpg";

const allProjects = [
  { img: projectResidential, title: "Residences", category: "Residential", year: "2024", location: "YYYY, XX", desc: "A luxury 12-unit residential complex featuring sustainable materials and passive solar design.", materials: "Concrete, Timber, Glass" },
  { img: projectCommercial, title: "Tower", category: "Commercial", year: "2023", location: "YYYY, XX", desc: "30-story commercial tower with LEED Platinum certification and integrated smart systems.", materials: "Steel, Glass, Aluminum" },
  { img: projectInfra, title: "Bridge", category: "Infrastructure", year: "2025", location: "YYYY, XX", desc: "Cable-stayed bridge spanning 800m with seismic isolation and 100-year design life.", materials: "Pre-stressed Concrete, Steel Cable" },
  { img: projectResidential, title: "Villas", category: "Residential", year: "2023", location: "YYYY, XX", desc: "Desert-adapted residential compound with thermal mass construction and rainwater harvesting.", materials: "Rammed Earth, Concrete, Stone" },
  { img: projectCommercial, title: "Campus", category: "Commercial", year: "2024", location: "YYYY, XX", desc: "Corporate campus with biophilic design, central atrium, and mass timber structure.", materials: "CLT Timber, Glass, Steel" },
  { img: projectInfra, title: "Metro Line Extension", category: "Infrastructure", year: "2022", location: "YYYY, XX", desc: "12km metro rail extension including 4 underground stations and elevated viaduct sections.", materials: "Reinforced Concrete, Steel" },
];

const filters = ["All", "Residential", "Commercial", "Infrastructure"];

const Projects = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <main className="pt-16 lg:pt-20">
      <section className="section-padding">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">Our Work</p>
            <h1 className="heading-display max-w-xl">Project Portfolio</h1>
            <p className="body-text mt-4">A curated selection of our engineering and architectural achievements.</p>
          </SectionEntrance>

          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors btn-press ${
                  active === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <SectionEntrance key={p.title + p.year} delay={i * 0.05}>
                <div className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-5 opacity-0 group-hover:opacity-100">
                      <p className="label-mono text-background/70">{p.materials}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-accent font-medium uppercase tracking-wider">{p.category}</p>
                    <h3 className="text-lg font-medium mt-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{p.desc}</p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {p.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {p.year}</span>
                    </div>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
