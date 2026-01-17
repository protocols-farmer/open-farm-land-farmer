import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Open Farmlands",
  description: "Our technical approach to keeping your projects secure.",
};

export default function SecurityPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-8">
      <div className="flex items-baseline justify-between border-b-4 border-foreground pb-4 mb-12">
        <h1 className="text-4xl font-black uppercase">Security</h1>
        <span className="font-mono font-bold text-primary">v1.0-STABLE</span>
      </div>

      <article className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-foreground font-black text-xs uppercase  mb-4">
            Infrastructure
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We utilize encrypted-at-rest databases and TLS 1.3 for all data in
            transit. Our infrastructure is managed with strict least-privilege
            access controls.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-black text-xs uppercase  mb-4">
            Reporting
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Found a hole in the fence? We value responsible disclosure. Please
            reach out to us directly before making any vulnerabilities public.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-black text-xs uppercase  mb-4">
            Authentication
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We leverage industry-leading OAuth providers so we never store your
            raw passwords on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-black text-xs uppercase  mb-4">
            Backups
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your data is backed up daily to geo-redundant storage to ensure that
            even in a total system failure, the farmland remains recoverable.
          </p>
        </section>
      </article>
    </main>
  );
}
