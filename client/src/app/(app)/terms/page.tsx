import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Open Farmlands",
  description: "The rules of the land for using the Open Farmlands platform.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-8">
      <header className="mb-16">
        <div className="inline-block  px-2 py-1 text-xs font-bold  mb-4">
          Legal Document
        </div>
        <h1 className="text-5xl font-black uppercase  ">Terms of Service</h1>
      </header>

      <article className="grid gap-12 text-muted-foreground leading-relaxed">
        <div className="border-l-2 border-muted pl-6">
          <h2 className="text-foreground font-bold uppercase  mb-2">
            License to Content
          </h2>
          <p>
            By "Sowing" content on this platform, you grant us a non-exclusive
            license to host it. You still own the copyright; we just provide the
            land for it to grow.
          </p>
        </div>

        <div className="border-l-2 border-muted pl-6">
          <h2 className="text-foreground font-bold uppercase  mb-2">
            Account Responsibility
          </h2>
          <p>
            You are the shepherd of your account. Any activity under your
            credentials is your responsibility. Keep your secrets safe.
          </p>
        </div>

        <div className="border-l-2 border-muted pl-6">
          <h2 className="text-foreground font-bold uppercase  mb-2">
            Termination
          </h2>
          <p>
            We reserve the right to prune content or accounts that actively harm
            the ecosystem or violate our core community guidelines.
          </p>
        </div>
      </article>
    </main>
  );
}
