import About from "@/components/pages/about/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Open Farmlands",
  description:
    "Learn about the mission of Open Farmlands and the Protocols Farmer.",
};

export default function page() {
  return (
    <div className="w-full">
      <About />
    </div>
  );
}
