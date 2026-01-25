import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Campus Events?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join thousands of colleges already using CampusFest to create 
            memorable experiences for their students.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust badges */}
          <p className="mt-8 text-sm text-white/60">
            No credit card required • Free for small events • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
