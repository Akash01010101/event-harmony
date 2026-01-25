import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  image: string;
  featured?: boolean;
}

const EventCard = ({
  title,
  description,
  date,
  time,
  location,
  category,
  attendees,
  image,
  featured = false,
}: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    "Tech": "bg-blue-100 text-blue-700",
    "Cultural": "bg-purple-100 text-purple-700",
    "Sports": "bg-green-100 text-green-700",
    "Workshop": "bg-orange-100 text-orange-700",
    "Music": "bg-pink-100 text-pink-700",
    "Academic": "bg-teal-100 text-teal-700",
  };

  return (
    <div
      className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Category Badge */}
        <Badge className={`absolute top-4 left-4 ${categoryColors[category] || "bg-secondary text-secondary-foreground"}`}>
          {category}
        </Badge>

        {/* Featured Badge */}
        {featured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}

        {/* Date overlay */}
        <div className="absolute bottom-4 left-4 text-primary-foreground">
          <div className="text-sm font-medium opacity-90">{date}</div>
          <div className="text-xs opacity-75">{time}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className={`text-muted-foreground mb-4 line-clamp-2 ${featured ? "text-base" : "text-sm"}`}>
          {description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{attendees} attending</span>
          </div>
        </div>

        {/* Action */}
        <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary">
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
