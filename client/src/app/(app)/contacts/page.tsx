//src/app/(app)/contacts/page.tsx
import { Metadata } from "next";
import { Mail, Phone, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Open Farm Land",
  description: "Get in touch with the Open Farm Land team.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-8">
      <header className="mb-16 border-b border-primary/10 pb-8">
        <h1 className="text-5xl font-black tracking-tighter">Contact</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          For technical support, inquiries, or security reports, please use the
          channels below.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="group p-8 rounded-2xl border bg-card hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Email</h2>
          </div>
          <a
            href="mailto:intellbiooid@gmail.com"
            className="text-lg text-muted-foreground hover:text-primary transition-colors break-all font-medium"
          >
            intellbiooid@gmail.com
          </a>
          <p className="text-xs text-muted-foreground/60 mt-4 uppercase tracking-widest font-bold">
            Primary communication
          </p>
        </div>

        <div className="group p-8 rounded-2xl border bg-card hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Phone</h2>
          </div>
          <a
            href="tel:+250790931024"
            className="text-lg text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            +250790931024
          </a>
          <p className="text-xs text-muted-foreground/60 mt-4 uppercase tracking-widest font-bold">
            Direct line / WhatsApp
          </p>
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-muted/30">
        <div className="inline-flex items-center text-xs font-mono text-muted-foreground/50 px-4 py-2 border border-muted/20 rounded-full bg-muted/5">
          <MessageSquare className="mr-2 h-3 w-3" />
          On-platform chat functionality coming soon
        </div>
      </footer>
    </main>
  );
}
