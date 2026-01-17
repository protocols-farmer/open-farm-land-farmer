import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Open Farmlands",
  description: "How we handle and protect your data at Open Farmlands.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-8">
      <header className="mb-16 border-b border-primary/10 pb-8">
        <h1 className="text-5xl font-black uppercase ">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          Effective: December 28, 2025
        </p>
      </header>

      <article className="space-y-12 text-muted-foreground text-lg leading-relaxed">
        <section>
          <h2 className="text-foreground font-bold text-xl mb-4">
            01. Data Collection
          </h2>
          <p>
            We collect minimal data. This includes your email and username for
            authentication and any content you voluntarily publish. We do not
            track your behavior outside of Open Farmlands.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-bold text-xl mb-4">
            02. Third Parties
          </h2>
          <p>
            We do not sell your data. We use industry-standard providers (like
            Vercel and Auth services) strictly to keep the platform running.
            Your project journeys remain your own.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-bold text-xl mb-4">
            03. User Rights
          </h2>
          <p>
            You have the right to export your data or delete your account at any
            time. We believe in the "Right to be Forgotten." Once you hit
            delete, the soil is cleared.
          </p>
        </section>
      </article>
    </main>
  );
}
