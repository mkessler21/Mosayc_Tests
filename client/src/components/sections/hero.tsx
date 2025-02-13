import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="grid grid-cols-4 gap-4 opacity-20">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="aspect-square bg-primary/20 rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-64 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Deep Customer Understanding for Enterprise Sales
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Transform fragmented data into strategic insights. Stop drowning in research 
            and start closing more enterprise deals with AI-powered customer intelligence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" onClick={scrollToWaitlist}>
              Join the Waitlist
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}