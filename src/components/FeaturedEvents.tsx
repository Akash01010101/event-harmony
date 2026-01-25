import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "TechFest 2024",
    description: "The biggest tech festival of the year featuring hackathons, workshops, and keynote speakers from top tech companies.",
    date: "Feb 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Main Auditorium",
    category: "Tech",
    attendees: 1250,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    featured: true,
  },
  {
    title: "Cultural Night",
    description: "An evening celebrating diverse cultures through music, dance, and art performances.",
    date: "Feb 20, 2024",
    time: "5:00 PM - 10:00 PM",
    location: "Open Air Theatre",
    category: "Cultural",
    attendees: 800,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    title: "Inter-College Sports Meet",
    description: "Annual sports competition featuring athletics, basketball, and football tournaments.",
    date: "Feb 25-28, 2024",
    time: "8:00 AM - 5:00 PM",
    location: "Sports Complex",
    category: "Sports",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1461896836934- voices08c24d3?w=800&q=80",
  },
  {
    title: "Design Thinking Workshop",
    description: "Learn the fundamentals of design thinking and human-centered innovation.",
    date: "Mar 2, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Lab",
    category: "Workshop",
    attendees: 60,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    title: "Battle of Bands",
    description: "College bands compete for the ultimate music championship title.",
    date: "Mar 5, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Main Stage",
    category: "Music",
    attendees: 1500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  },
];

const FeaturedEvents = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Upcoming <span className="text-gradient">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover exciting events happening on campus. From tech fests to cultural nights, 
              there's something for everyone.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
