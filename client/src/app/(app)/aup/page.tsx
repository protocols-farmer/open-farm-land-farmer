import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceptable Use | Open Farmlands",
  description: "Prohibited activities and community standards.",
};

export default function AUPPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-8 text-center">
      <h1 className="text-6xl font-black  mb-4">A.U.P.</h1>
      <p className="text-xl text-primary font-medium mb-16 uppercase ">
        Acceptable Use Policy
      </p>

      <div className="text-left space-y-10 text-muted-foreground">
        <section className="bg-muted/30 p-8 rounded-lg">
          <h2 className="text-foreground font-bold mb-3 uppercase text-sm ">
            The Golden Rule
          </h2>
          <p>
            Don't be a jerk. We define this as harassment, hate speech, or the
            intentional sabotage of another user's work or reputation.
          </p>
        </section>

        <section className="p-8 border border-dashed border-muted rounded-lg">
          <h2 className="text-foreground font-bold mb-3 uppercase text-sm ">
            Platform Integrity
          </h2>
          <p>
            No automated scraping, DDoS attempts, or using the platform to host
            malware. We build here; we don't destroy.
          </p>
        </section>

        <section className="bg-muted/30 p-8 rounded-lg">
          <h2 className="text-foreground font-bold mb-3 uppercase text-sm ">
            Spam Policy
          </h2>
          <p>
            This is a place for projects and blogs. Low-effort SEO spam or
            affiliate link farming will be removed without notice.
          </p>
        </section>
      </div>
    </main>
  );
}
