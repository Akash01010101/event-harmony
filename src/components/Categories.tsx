import { Code, Music, Palette, Trophy, BookOpen, Mic2, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Tech & Innovation", icon: Code, count: 45, color: "from-blue-500 to-cyan-500" },
  { name: "Music & Arts", icon: Music, count: 32, color: "from-pink-500 to-rose-500" },
  { name: "Cultural", icon: Palette, count: 28, color: "from-purple-500 to-violet-500" },
  { name: "Sports", icon: Trophy, count: 24, color: "from-green-500 to-emerald-500" },
  { name: "Academic", icon: BookOpen, count: 18, color: "from-amber-500 to-orange-500" },
  { name: "Debates", icon: Mic2, count: 15, color: "from-teal-500 to-cyan-500" },
  { name: "Photography", icon: Camera, count: 12, color: "from-indigo-500 to-purple-500" },
  { name: "Gaming", icon: Gamepad2, count: 20, color: "from-red-500 to-pink-500" },
];

const Categories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find events that match your interests from our diverse range of categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.count} events
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
