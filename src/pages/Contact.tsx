import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import SectionEntrance from "@/components/SectionEntrance";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-16 lg:pt-20">
      <section className="section-padding">
        <div className="container-main">
          <SectionEntrance>
            <p className="label-mono mb-3">Contact</p>
            <h1 className="heading-display max-w-xl">Let's Build Together</h1>
            <p className="body-text mt-4">Schedule a free consultation or reach out with your project details.</p>
          </SectionEntrance>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionEntrance delay={0.1}>
                <div className="glass-card-static p-6 lg:p-10" style={{ borderRadius: "24px" }}>
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                      <h3 className="text-xl font-medium">Thank You!</h3>
                      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                        We've received your consultation request. Our team will reach out within 24 hours with a calendar invite.
                      </p>
                      <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", project: "", message: "" }); }} className="mt-6 text-sm text-accent font-medium">
                        Send Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="text-lg font-medium mb-6">Consultation Request</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Full Name *</label>
                          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" className="w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
                          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter your phone number" className="w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Project Type</label>
                          <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow appearance-none">
                            <option value="">Select type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="infrastructure">Infrastructure</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Message *</label>
                        <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." className="w-full px-4 py-3 rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none" />
                      </div>
                      <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium btn-press hover:opacity-90 transition-opacity">
                        Send Request <Send size={16} />
                      </button>
                    </form>
                  )}
                </div>
              </SectionEntrance>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <SectionEntrance delay={0.15}>
                <div className="glass-card-static p-6" style={{ borderRadius: "24px" }}>
                  <h3 className="text-sm font-medium mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <a href="mailto:email@example.com" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Mail size={16} className="text-accent" /></div>
                      email@example.com
                    </a>
                    <a href="tel:+919000000000" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Phone size={16} className="text-accent" /></div>
                      +91 9000000000
                    </a>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><MapPin size={16} className="text-accent" /></div>
                      Shivamogga Dist,Karnataka State
                    </div>
                  </div>
                </div>
              </SectionEntrance>

              <SectionEntrance delay={0.2}>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-static p-6 flex items-center gap-4 hover:shadow-[var(--card-shadow-hover)] transition-shadow cursor-pointer"
                  style={{ borderRadius: "24px" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Chat with us directly</p>
                  </div>
                </a>
              </SectionEntrance>

              <SectionEntrance delay={0.25}>
                <div className="glass-card-static overflow-hidden" style={{ borderRadius: "24px" }}>
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76238.72129070129!2d75.56471499999999!3d13.93220895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba8d0ec620495%3A0x5589d733c2761a17!2sShivamogga%2C%20Karnataka!5e1!3m2!1sen!2sin!4v1773841835731!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </SectionEntrance>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
