import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            AI-Powered Sales Intelligence for B2B Teams
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Get deep insights about your target companies and make data-driven decisions 
            that close more deals. Join the waitlist for early access.
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
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/3 h-full">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
            alt="B2B Sales Meeting"
            className="object-cover rounded-l-3xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
