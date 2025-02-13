import { motion } from "framer-motion";
import { 
  Brain,
  Target,
  Bell,
  BarChart4,
  LineChart,
  BookOpen
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Bell,
    title: "Event Alerts",
    description: "Receive real-time alerts about significant customer events and opportunities"
  },
  {
    icon: Brain,
    title: "GraphRAG Intelligence",
    description: "Advanced relationship mapping using GraphRAG technology for deeper insights"
  },
  {
    icon: LineChart,
    title: "Causal Analysis",
    description: "Discover causal relationships to understand the 'what' and 'why' of key events"
  },
  {
    icon: Target,
    title: "Tailored Insights",
    description: "Get insights aligned directly with your company's sales goals and use cases"
  },
  {
    icon: BookOpen,
    title: "Deep Research",
    description: "Automated analysis of public data sources and internal CRM data"
  },
  {
    icon: BarChart4,
    title: "Strategy Recommendations",
    description: "AI-powered recommendations for effective account strategies"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#E87C7C]">
            From Fragmented Data to Strategic Insights
          </h2>
          <p className="text-lg text-gray-400">
            Helping AEs build compelling cases with comprehensive data analysis
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-[#E87C7C] mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}