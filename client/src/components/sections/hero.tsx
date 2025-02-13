import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -right-1/4 top-1/4 w-[500px] h-[500px] bg-[#E87C7C] rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -left-1/4 bottom-1/4 w-[500px] h-[500px] bg-[#E87C7C] rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Enterprise Sales Requires{" "}
            <span className="text-[#E87C7C]">Deep</span> Customer Understanding
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl">
            Transform fragmented data into strategic insights. Stop drowning in research 
            and start closing more enterprise deals with AI-powered customer intelligence.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <a
              href="#waitlist"
              className="px-8 py-4 bg-[#E87C7C] text-white rounded-lg hover:bg-[#E87C7C]/90 transition-colors text-lg font-medium"
            >
              Join Waitlist
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-lg font-medium"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Problem statements */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mt-24 max-w-4xl mx-auto"
        >
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-3">
              Time-Consuming Research & Preparation
            </h3>
            <p className="text-gray-400">
              Hours spent gathering and analyzing customer data before every sales interaction
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-3">
              Hard to Build Multithreaded Relationships
            </h3>
            <p className="text-gray-400">
              Difficulty maintaining meaningful connections across complex organizations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}