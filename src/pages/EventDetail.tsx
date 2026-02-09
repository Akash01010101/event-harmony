import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  useEffect(() => {
    if (id && user) fetchRegistration();
  }, [id, user]);

  const fetchEvent = async () => {
    const { data } = await supabase.from("events").select("*").eq("id", id!).single();
    setEvent(data);

    const { count } = await supabase.from("registrations").select("*", { count: "exact", head: true }).eq("event_id", id!).eq("status", "registered");
    setAttendeeCount(count || 0);
    setLoading(false);
  };

  const fetchRegistration = async () => {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .eq("event_id", id!)
      .eq("user_id", user!.id)
      .maybeSingle();
    setRegistration(data);
  };

  const handleRegister = async () => {
    if (!user) { navigate("/auth"); return; }
    setRegistering(true);
    const qrCode = `${window.location.origin}/checkin/${id}/${user.id}`;
    const { error } = await supabase.from("registrations").insert({
      event_id: id,
      user_id: user.id,
      qr_code: qrCode,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registered!", description: "You're now registered for this event." });
      fetchRegistration();
      setAttendeeCount((c) => c + 1);
    }
    setRegistering(false);
  };

  const handleCancel = async () => {
    const { error } = await supabase.from("registrations").update({ status: "cancelled" }).eq("id", registration.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cancelled", description: "Your registration has been cancelled." });
      setRegistration(null);
      setAttendeeCount((c) => c - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          <Button variant="outline" onClick={() => navigate("/events")} className="mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button variant="ghost" onClick={() => navigate("/events")} className="mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden mb-6">
              <img
                src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            <Badge className="mb-3">{event.category}</Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{event.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>{event.start_time} - {event.end_time}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span>{attendeeCount}{event.max_attendees ? ` / ${event.max_attendees}` : ""} attending</span>
              </div>

              {registration && registration.status === "registered" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">You're registered!</span>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleCancel}>Cancel Registration</Button>
                </div>
              ) : (
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handleRegister}
                  disabled={registering || (event.max_attendees && attendeeCount >= event.max_attendees)}
                >
                  {registering ? "Registering..." : event.max_attendees && attendeeCount >= event.max_attendees ? "Event Full" : "Register Now"}
                </Button>
              )}
            </div>

            {/* QR Code */}
            {registration && registration.status === "registered" && registration.qr_code && (
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <h3 className="font-display font-semibold text-foreground mb-4">Your Check-in QR Code</h3>
                <div className="inline-block p-4 bg-background rounded-xl">
                  <QRCodeSVG value={registration.qr_code} size={180} />
                </div>
                <p className="text-sm text-muted-foreground mt-3">Show this at the event for check-in</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;
