//src/app/(app)/report-issue/page.tsx
import { Metadata } from "next";
import ReportIssuePage from "@/components/pages/reports/ReportIssuePage";

export const metadata: Metadata = {
  title: "Report an Issue | Administration Guild",
  description: "Log a bug or system vulnerability to help secure the platform.",
};

export default function Page() {
  return <ReportIssuePage />;
}
