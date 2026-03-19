import {
  Building2,
  Ruler,
  HardHat,
  ClipboardList,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionEntrance from "@/components/SectionEntrance";

const services = [
  {
    icon: Building2,
    title: "Architectural Design",
    short: "Award-winning designs that merge form with function.",
    details:
      "Our architectural team creates buildings that respond to context, climate, and culture. From concept sketches to construction documentation, we deliver designs that are both aesthetically striking and structurally sound. We specialize in residential, commercial, and institutional projects.",
  },
  {
    icon: Ruler,
    title: "Structural Engineering",
    short: "Precision-engineered structures built to endure.",
    details:
      "We provide comprehensive structural analysis and design for buildings, bridges, and infrastructure. Our engineers use advanced finite element analysis and BIM tools to ensure every structure meets rigorous safety standards while optimizing material usage.",
  },
  {
    icon: HardHat,
    title: "Construction Consulting",
    short: "Expert guidance from blueprint to completion.",
    details:
      "Our construction consultants bridge the gap between design intent and built reality. We provide on-site supervision, quality assurance, contractor evaluation, and value engineering to ensure your project is delivered on time, within budget, and to specification.",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    short: "End-to-end oversight for complex builds.",
    details:
      "From feasibility studies to final handover, our project managers coordinate every stakeholder and milestone. We use industry-leading scheduling tools, risk management frameworks, and communication protocols to keep your project on track.",
  },
  {
    icon: Calculator,
    title: "Cost Estimation Services",
    short: "Accurate budgeting for projects of any scale.",
    details:
      "Our estimators deliver detailed cost breakdowns using current market rates and historical data. We provide preliminary estimates for planning, detailed estimates for tendering, and ongoing cost tracking throughout construction.",
  },
];

const Services = () => {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="section-padding">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">Services</p>
            <h1 className="heading-display max-w-xl">
              What We Deliver
            </h1>
            <p className="body-text mt-4">
              Comprehensive engineering and design services for projects that demand precision.
            </p>
          </SectionEntrance>

          {/* PREMIUM GRID */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <SectionEntrance key={s.title} delay={i * 0.05}>
                <div
                  className="glass-card-static p-7 lg:p-8 h-full flex flex-col justify-between 
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                  style={{ borderRadius: "28px" }}
                >
                  {/* TOP CONTENT */}
                  <div>
                    {/* ICON */}
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 
                    group-hover:scale-105 transition-transform">
                      <s.icon size={24} className="text-accent" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-semibold leading-snug">
                      {s.title}
                    </h3>

                    {/* SHORT */}
                    <p className="text-sm text-muted-foreground mt-2">
                      {s.short}
                    </p>

                    {/* DIVIDER */}
                    <div className="my-5 h-px bg-border" />

                    {/* DETAILS */}
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {s.details}
                    </p>
                  </div>

                  {/* OPTIONAL CTA (SUBTLE) */}
                  <div className="mt-6 flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>

          {/* CTA SECTION */}
          <SectionEntrance delay={0.3}>
            <div
              className="mt-20 glass-card-static p-8 lg:p-12 text-center"
              style={{ borderRadius: "28px" }}
            >
              <h2 className="heading-section">
                Need a Custom Solution?
              </h2>
              <p className="body-text mx-auto mt-3">
                Let's discuss your project requirements in detail.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium btn-press hover:opacity-90 transition-opacity"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </SectionEntrance>
        </div>
      </section>
    </main>
  );
};

export default Services;