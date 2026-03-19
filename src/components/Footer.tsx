import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">AE</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Website</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs">
              Engineering the silent foundation of modernity. Architecture and structural integrity since 2003.
            </p>
          </div>

          <div>
            <h4 className="label-mono mb-4 text-background/60">Navigation</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Projects", "Services", "Tools", "About", "Contact", "Admin"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="label-mono mb-4 text-background/60">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Architectural Design</span>
              <span>Structural Engineering</span>
              <span>Construction Consulting</span>
              <span>Project Management</span>
              <span>Cost Estimation</span>
            </div>
          </div>

          <div>
            <h4 className="label-mono mb-4 text-background/60">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:email@example.com" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                <Mail size={14} /> email@example.com
              </a>
              <a href="tel:+919000000000" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                <Phone size={14} /> +91 9000000000
              </a>
              <span className="flex items-center gap-2 text-sm opacity-70">
                <MapPin size={14} /> Shivamogga, Karnataka
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40">© 2026 Engineering. All rights reserved.</p>
          <a
            href="#top"
            className="flex items-center gap-1 text-xs opacity-40 hover:opacity-70 transition-opacity"
          >
            Back to top <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
