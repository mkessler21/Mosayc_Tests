import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ValueProp() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold mb-6">
              90% of Enterprise Revenue Comes From 10% of Accounts
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg">
                  High-quality research makes all the difference, but sales teams are drowning
                  in data. Mosayc.ai helps you quickly find relevant insights and build compelling
                  cases for your most valuable accounts.
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <div className="text-sm">Revenue from Key Accounts</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">10%</div>
                <div className="text-sm">Of Total Accounts</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Current Challenges</h3>
                <ul className="space-y-2">
                  <li>• Time-consuming research & preparation</li>
                  <li>• Hard to build multithreaded relationships</li>
                  <li>• Informed buyers demand tailored sales approaches</li>
                </ul>
              </div>
              <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Solution</h3>
                <ul className="space-y-2">
                  <li>• AI-powered research automation</li>
                  <li>• Intelligent relationship mapping</li>
                  <li>• Personalized outreach recommendations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}