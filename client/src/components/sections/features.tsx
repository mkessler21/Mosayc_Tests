import { motion } from "framer-motion";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users,
  BarChart4,
  MessageSquareText
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze company data to provide actionable insights"
  },
  {
    icon: Target,
    title: "Account Intelligence",
    description: "Deep understanding of target accounts through comprehensive data analysis"
  },
  {
    icon: TrendingUp,
    title: "Growth Signals",
    description: "Identify key growth indicators and business opportunities in real-time"
  },
  {
    icon: Users,
    title: "Decision Maker Mapping",
    description: "Map out key decision makers and their roles within target organizations"
  },
  {
    icon: BarChart4,
    title: "Market Position",
    description: "Understand company's market position and competitive landscape"
  },
  {
    icon: MessageSquareText,
    title: "Smart Recommendations",
    description: "Get personalized outreach recommendations based on company insights"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to supercharge your B2B sales efforts
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
              <Card className="h-full">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
