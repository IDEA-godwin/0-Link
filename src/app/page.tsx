import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import HowWeDoIt from "@/components/HowWeDoIt";
import Sandbox from "@/components/Sandbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <HowWeDoIt />
      <Sandbox />
    </main>
  );
}
