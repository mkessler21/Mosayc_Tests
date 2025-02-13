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
          >
            <img
              src="https://images.unsplash.com/photo-1699602050604-698045645108"
              alt="AI Technology"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Transform Your Sales Process with AI
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg">
                    Our platform analyzes millions of data points to provide you with 
                    actionable insights about your target companies, helping you make 
                    informed decisions and close deals faster.
                  </p>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">3x</div>
                  <div className="text-sm">Faster Deal Closure</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm">More Accurate Targeting</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
