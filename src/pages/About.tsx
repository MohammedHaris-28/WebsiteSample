import {
  Award,
  Shield,
  Users,
  Target,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import SectionEntrance from "@/components/SectionEntrance";

const team = [
  {
    name: "YYYY YYYY",
    role: "Principal Architect",
    exp: "18 years",
    qualification: "M.Arch, LEED AP",
  },
  {
    name: "YYYY YYYY",
    role: "Chief Structural Engineer",
    exp: "22 years",
    qualification: "PhD Structural Engg.",
  },
  {
    name: "YYYY YYYY",
    role: "Project Director",
    exp: "15 years",
    qualification: "MBA, PMP",
  },
  {
    name: "YYYY YYYY",
    role: "Construction Manager",
    exp: "12 years",
    qualification: "B.Tech Civil",
  },
  {
    name: "YYYY YYYY",
    role: "Cost Estimation Lead",
    exp: "10 years",
    qualification: "QS Certified",
  },
  {
    name: "YYYY YYYY",
    role: "BIM Specialist",
    exp: "8 years",
    qualification: "BIM Expert",
  },
];

const certs = [
  "Licensed Professional Engineers (PE)",
  "LEED Accredited Professionals",
  "ISO 9001:2015 Certified",
  "ASCE & AIA Members",
  "OSHA Safety Certified",
  "BIM Level 2 Compliant",
];

const About = () => (
  <main className="pt-16 lg:pt-20">
    {/* STORY SECTION */}
    <section className="section-padding">
      <div className="container-main">
        <SectionEntrance>
          <p className="label-mono mb-3">About Arctura</p>
          <h1 className="heading-display max-w-xl">
            Built on Precision, Driven by Vision
          </h1>
        </SectionEntrance>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Story Card */}
          <SectionEntrance delay={0.1}>
            <div
              className="p-8 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl"
              style={{ borderRadius: "28px" }}
            >
              <p className="text-lg leading-relaxed text-foreground/80">
                Founded in 2003, Arctura has grown from a two-person structural
                consultancy to a full-service engineering and architecture firm.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                We believe great engineering is invisible — it's the silent
                foundation that lets architecture soar.
              </p>
            </div>
          </SectionEntrance>

          {/* Premium Bento Cards */}
           {/* Values Cards */}
          <SectionEntrance delay={0.2}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Target, label: "Mission", desc: "Engineer structures that serve communities for generations." },
                { icon: Shield, label: "Integrity", desc: "Transparent processes and honest engineering assessments." },
                { icon: Users, label: "Collaboration", desc: "Architects, engineers, and clients working as one team." },
                { icon: Award, label: "Excellence", desc: "12 national engineering awards in the last decade." },
              ].map((v) => (
                <div
                  key={v.label}
                  className="glass-card-static p-6 group hover:scale-[1.03] hover:shadow-xl transition-all duration-500"
                  style={{ borderRadius: "24px" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <v.icon size={18} className="text-accent" />
                  </div>
                  <p className="text-sm font-semibold">{v.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </SectionEntrance>
        </div>
      </div>
    </section>

    {/* TEAM SECTION */}
    <section className="section-padding bg-secondary/40">
      <div className="container-main">
        <SectionEntrance>
          <p className="label-mono mb-3">Our Team</p>
          <h2 className="heading-section">Leadership & Expertise</h2>
        </SectionEntrance>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <SectionEntrance key={t.name} delay={i * 0.05}>
              <div
                className="p-4 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition"
                style={{ borderRadius: "28px" }}
              >
                {/* Image */}
                <div
                  className="w-full h-52 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600"
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>

                {/* Info */}
                <div className="mt-4">
                  <p className="text-base font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-foreground/70 mt-1">
                    {t.qualification}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <span> {t.exp}</span>
                  <span> Senior</span>
                </div>

                {/* Socials */}
                <div className="flex gap-3 mt-5">
                  {[Linkedin, Facebook, Instagram].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent/20 cursor-pointer transition"
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>

                {/* Button */}
                
              </div>
            </SectionEntrance>
          ))}
        </div>
      </div>
    </section>

    {/* CERTIFICATIONS */}
    <section className="section-padding">
      <div className="container-main">
        <SectionEntrance>
          <p className="label-mono mb-3">Credentials</p>
          <h2 className="heading-section">
            Certifications & Accreditations
          </h2>
        </SectionEntrance>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <SectionEntrance key={c} delay={i * 0.05}>
              <div
                className="p-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg flex items-center gap-3 hover:shadow-xl transition"
                style={{ borderRadius: "20px" }}
              >
                <Award className="text-accent" size={18} />
                <span className="text-sm font-medium">{c}</span>
              </div>
            </SectionEntrance>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;