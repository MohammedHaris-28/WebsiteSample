import { Link } from "react-router-dom";
import { ArrowRight, Building2, Ruler, Calculator, Shield, Users, Award, ChevronRight, Quote } from "lucide-react";
import SectionEntrance from "@/components/SectionEntrance";
import heroImg from "@/assets/hero-architecture.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInfra from "@/assets/project-infrastructure.jpg";
import { useState } from "react";

const stats = [
  { number: "20+", label: "Years Experience" },
  { number: "150+", label: "Projects Delivered" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "10", label: "Team Members" },
];

const services = [
  { icon: Building2, title: "Architectural Design", desc: "Award-winning designs that merge form with function." },
  { icon: Ruler, title: "Structural Engineering", desc: "Precision-engineered structures built to endure." },
  { icon: Shield, title: "Construction Consulting", desc: "Expert guidance from blueprint to completion." },
  { icon: Calculator, title: "Cost Estimation", desc: "Accurate budgeting for projects of any scale." },
];

const projects = [
  { img: projectResidential, title: " Residences", category: "Residential", year: "2024", location: "YYY, XX" },
  { img: projectCommercial, title: " Tower", category: "Commercial", year: "2023", location: "YYY, XX" },
  { img: projectInfra, title: " Bridge", category: "Infrastructure", year: "2025", location: "YYY, XX" },
];

const testimonials = [
  { quote: "They delivered a structure that exceeded every expectation. Their attention to detail is unparalleled.", name: "YYYY", role: "Managing Director, YYY GROUP" },
  { quote: "From concept to completion, they brought precision and artistry to our commercial project.", name: "YYYY", role: "VP, Atlas Properties" },
  { quote: "The engineering tools alone saved us weeks of estimation time. A truly modern firm.", name: "YYYY", role: "CEO, Nova Construction" },
];

const Index = () => {
  const [sqft, setSqft] = useState("");
  const estimate = sqft ? (parseFloat(sqft) * 185).toLocaleString() : "0";

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern architectural building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative container-main py-24 lg:py-32">
          <SectionEntrance>
            <p className="label-mono text-background/60 mb-4">Civil Engineering & Architecture</p>
            <h1 className="heading-display text-background max-w-3xl">
              Engineering the Silent Foundation of Modernity
            </h1>
            <p className="mt-6 text-lg text-background/70 max-w-xl leading-relaxed">
              Architecture and structural integrity for infrastructure that outlasts the century.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium btn-press hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background/10 backdrop-blur-sm text-background font-medium btn-press hover:bg-background/20 transition-colors border border-background/20"
              >
                Book Consultation
              </Link>
            </div>
          </SectionEntrance>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <SectionEntrance key={s.label} delay={i * 0.1}>
                <div className="glass-card-static p-6 lg:p-8 text-center">
                  <p className="text-3xl lg:text-4xl font-semibold tracking-tight tabular-nums text-foreground">{s.number}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">What We Do</p>
            <h2 className="heading-section max-w-lg">Comprehensive Engineering & Design Services</h2>
          </SectionEntrance>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Services — spans 2 rows */}
            <div className="lg:row-span-2 flex flex-col gap-4 lg:gap-6">
              {services.slice(0, 2).map((s, i) => (
                <SectionEntrance key={s.title} delay={i * 0.1}>
                  <div className="glass-card p-6 lg:p-8 flex-1 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <s.icon size={20} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </SectionEntrance>
              ))}
            </div>

           

            {/* More services */}
            {services.slice(2).map((s, i) => (
              <SectionEntrance key={s.title} delay={0.2 + i * 0.1}>
                <div className="glass-card p-6 lg:p-8 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <s.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-secondary/50">
        <div className="container-main">
          <SectionEntrance>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="label-mono mb-3">Portfolio</p>
                <h2 className="heading-section">Featured Projects</h2>
              </div>
              <Link to="/projects" className="hidden sm:inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </SectionEntrance>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <SectionEntrance key={p.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-6 opacity-0 group-hover:opacity-100">
                      <div>
                        <p className="label-mono text-background/70">{p.location} · {p.year}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-accent font-medium uppercase tracking-wider">{p.category}</p>
                    <h3 className="text-lg font-medium mt-1">{p.title}</h3>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>

          <Link to="/projects" className="mt-8 sm:hidden inline-flex items-center gap-1 text-sm text-accent font-medium">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">Testimonials</p>
            <h2 className="heading-section max-w-md">Trusted by Industry Leaders</h2>
          </SectionEntrance>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <SectionEntrance key={t.name} delay={i * 0.1}>
                <div className="glass-card-static p-6 lg:p-8 flex flex-col h-full">
                  <Quote size={20} className="text-accent/40 mb-4" />
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1">{t.quote}</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-main text-center">
          <SectionEntrance>
            <p className="label-mono text-primary-foreground/50 mb-3">Ready to Build?</p>
            <h2 className="heading-section text-primary-foreground max-w-xl mx-auto">
              Let's Engineer Your Vision Together
            </h2>
            <p className="mt-4 text-primary-foreground/60 max-w-md mx-auto">
              Schedule a free consultation with our team of engineers and architects.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium btn-press hover:opacity-90 transition-opacity"
              >
                Schedule Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-foreground/10 text-primary-foreground font-medium btn-press hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
              >
                Try Our Tools
              </Link>
            </div>
          </SectionEntrance>
        </div>
      </section>
    </main>
  );
};

export default Index;
