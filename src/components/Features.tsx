import { QrCode, Bell, Award, CalendarCheck, Mail, Sparkles } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Check-ins",
    description: "Seamless event check-in with QR codes. Track attendance in real-time.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated email & SMS reminders so you never miss an event.",
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Instant certificate generation and verification for participants.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar Sync",
    description: "Integrate with Google Calendar for easy event scheduling.",
  },
  {
    icon: Mail,
    title: "Bulk Communications",
    description: "Send announcements and updates to all participants at once.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Get personalized event suggestions based on your interests.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to plan, manage, and execute successful college events.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
