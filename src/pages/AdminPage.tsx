import { useState } from "react";
import { 
  LayoutDashboard, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Phone, 
  Mail, 
  Briefcase, 
  Share2, 
  MessageSquare,
  Search
} from "lucide-react";
import SectionEntrance from "@/components/SectionEntrance";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("enquiries");

  return (
    <main className="min-h-screen bg-background pt-20 pb-12">
      <div className="container-main">
        <SectionEntrance>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-12">
            
            <div>
              
              <p className="label-mono mb-2 text-accent">Management Console</p>
              <h1 className="heading-display text-4xl">System Admin</h1>
            </div>
            
            {/* Tab Switcher - Premium Glass Style */}
            <div className="flex p-1 bg-muted/30 backdrop-blur-md rounded-2xl border border-border/50">
              {["enquiries", "staff", "projects", "content"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab 
                    ? "bg-accent text-accent-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </SectionEntrance>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === "enquiries" && <EnquiryList />}
          {activeTab === "projects" && <ProjectCMS />}
          {activeTab === "staff" && <StaffCMS />}
          {activeTab === "content" && <GlobalContentCMS />}
        </div>
      </div>
    </main>
  );
};

/* --- ENQUIRY COMPONENT --- */
const EnquiryList = () => {
  // Mock Data
  const enquiries = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 9876543210", type: "Residential", date: "2024-03-18" },
    { id: 2, name: "Anita Rao", email: "anita.r@techcorp.in", phone: "+91 8882221110", type: "Commercial", date: "2024-03-17" },
  ];

  return (
    <SectionEntrance delay={0.1}>
      <div className="glass-card-static overflow-hidden" style={{ borderRadius: "24px" }}>
        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/10">
          <h3 className="font-medium flex items-center gap-2"><MessageSquare size={18}/> Recent Enquiries</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search leads..." className="pl-9 pr-4 py-2 bg-background/50 rounded-lg text-xs border border-border/50 focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground bg-muted/20">
                <th className="p-4 font-medium">User Details</th>
                <th className="p-4 font-medium">Project Type</th>
                <th className="p-4 font-medium">Date Received</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {enquiries.map((item) => (
                <tr key={item.id} className="hover:bg-accent/5 transition-colors group">
                  <td className="p-4">
                    <p className="font-medium text-sm">{item.name}</p>
                    <div className="flex gap-3 mt-1">
                      <a href={`mailto:${item.email}`} className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1">
                        <Mail size={12} /> {item.email}
                      </a>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{item.date}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`tel:${item.phone}`} className="p-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                        <Phone size={14} />
                      </a>
                      <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionEntrance>
  );
};

/* --- PROJECTS CMS COMPONENT --- */
const ProjectCMS = () => {
  return (
    <SectionEntrance delay={0.1}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Form */}
        <div className="lg:col-span-1 glass-card-static p-6 h-fit" style={{ borderRadius: "24px" }}>
          <h3 className="font-medium mb-6 flex items-center gap-2"><Plus size={18}/> Add New Project</h3>
          <div className="space-y-4">
            <input placeholder="Project Name" className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none text-sm focus:ring-2 focus:ring-accent" />
            <input placeholder="Year (e.g. 2024)" className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none text-sm" />
            <div className="w-full h-32 border-2 border-dashed border-border/50 rounded-2xl flex flex-center items-center justify-center text-muted-foreground text-xs hover:border-accent/50 transition-colors cursor-pointer">
               Click to Upload Image
            </div>
            <textarea placeholder="Project Details" rows={3} className="w-full p-4 rounded-xl bg-muted/50 border-none text-sm resize-none" />
            <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium btn-press">Save Project</button>
          </div>
        </div>

        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card-static p-4 flex gap-4 items-center group" style={{ borderRadius: "20px" }}>
              <div className="w-20 h-20 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Briefcase className="text-accent/40" />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-sm">Modern Villa Project {i}</h4>
                <p className="text-xs text-muted-foreground">Year: 2023 • Residential</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit3 size={16}/></button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionEntrance>
  );
};

/* --- Staff CMS COMPONENT --- */
const StaffCMS = () => {
  return (
    <SectionEntrance delay={0.1}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Form */}
        <div className="lg:col-span-1 glass-card-static p-6 h-fit" style={{ borderRadius: "24px" }}>
          <h3 className="font-medium mb-6 flex items-center gap-2"><Plus size={18}/> Add New Staff Member</h3>
          <div className="space-y-4">
            <input placeholder="Name" className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none text-sm focus:ring-2 focus:ring-accent" />
            <input placeholder="Position" className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none text-sm" />
            <div className="w-full h-32 border-2 border-dashed border-border/50 rounded-2xl flex flex-center items-center justify-center text-muted-foreground text-xs hover:border-accent/50 transition-colors cursor-pointer">
               Click to Upload Image
            </div>
            <textarea placeholder="Bio" rows={3} className="w-full p-4 rounded-xl bg-muted/50 border-none text-sm resize-none" />
            <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium btn-press">Save Staff Member</button>
          </div>
        </div>

        {/* Staff List */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card-static p-4 flex gap-4 items-center group" style={{ borderRadius: "20px" }}>
              <div className="w-20 h-20 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Briefcase className="text-accent/40" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit3 size={16}/></button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionEntrance>
  );
};

/* --- GLOBAL CONTENT (Socials & Contact) --- */
const GlobalContentCMS = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Social Links CRUD */}
      <div className="glass-card-static p-6" style={{ borderRadius: "24px" }}>
        <h3 className="font-medium mb-6 flex items-center gap-2"><Share2 size={18}/> Social Links</h3>
        <div className="space-y-3">
          {['Instagram', 'LinkedIn', 'WhatsApp'].map((platform) => (
            <div key={platform} className="flex gap-2">
              <div className="w-24 px-3 py-2 bg-muted/30 rounded-lg text-xs font-medium flex items-center">{platform}</div>
              <input placeholder="URL" className="flex-grow px-3 py-2 bg-muted/50 rounded-lg text-xs focus:ring-1 focus:ring-accent" />
            </div>
          ))}
          <button className="mt-4 w-full py-2 border border-accent/20 text-accent rounded-xl text-xs font-medium hover:bg-accent/5">Update Socials</button>
        </div>
      </div>

      {/* Global Contact Info */}
      <div className="glass-card-static p-6" style={{ borderRadius: "24px" }}>
        <h3 className="font-medium mb-6 flex items-center gap-2"><Save size={18}/> Contact Details</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase text-muted-foreground font-bold mb-1 block">Support Email</label>
            <input defaultValue="email@example.com" className="w-full px-4 py-2 bg-muted/50 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-[10px] uppercase text-muted-foreground font-bold mb-1 block">Display Phone</label>
            <input defaultValue="+91 9000000000" className="w-full px-4 py-2 bg-muted/50 rounded-xl text-sm" />
          </div>
          <button className="w-full py-2 bg-foreground text-background rounded-xl text-xs font-medium">Push Live Updates</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;