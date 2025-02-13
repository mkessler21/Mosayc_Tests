import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import ValueProp from "@/components/sections/value-prop";
import WaitlistForm from "@/components/sections/waitlist-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ValueProp />
      <Features />
      <WaitlistForm />
    </div>
  );
}
