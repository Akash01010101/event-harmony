import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Users, QrCode, Settings, BarChart3 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const Dashboard = () => {
  const { user, profile, hasRole } = useAuth();
  const [myRegistrations, setMyRegistrations] = useState<any[]>([]);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    // Fetch registrations with event details
    const { data: regs } = await supabase
      .from("registrations")
      .select("*, events(*)")
      .eq("user_id", user!.id)
      .eq("status", "registered")
      .order("created_at", { ascending: false });
    setMyRegistrations(regs || []);

    // If organizer/admin, fetch their events
    if (hasRole("organizer") || hasRole("admin")) {
      const { data: events } = await supabase
        .from("events")
        .select("*")
        .eq("organizer_id", user!.id)
        .order("date", { ascending: false });
      setMyEvents(events || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome, <span className="text-gradient">{profile?.full_name || "Student"}</span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage your events and registrations</p>
          </div>
          {(hasRole("organizer") || hasRole("admin")) && (
            <Link to="/create-event">
              <Button variant="gradient" className="mt-4 md:mt-0">
                <Plus className="w-4 h-4" /> Create Event
              </Button>
            </Link>
          )}
        </div>

        <Tabs defaultValue="registrations">
          <TabsList>
            <TabsTrigger value="registrations">
              <Calendar className="w-4 h-4 mr-1" /> My Registrations
            </TabsTrigger>
            {(hasRole("organizer") || hasRole("admin")) && (
              <TabsTrigger value="my-events">
                <BarChart3 className="w-4 h-4 mr-1" /> My Events
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="registrations" className="mt-6">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : myRegistrations.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-2xl">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No registrations yet</h3>
                <p className="text-muted-foreground mb-4">Explore events and register to see them here</p>
                <Link to="/events"><Button variant="outline">Browse Events</Button></Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {myRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <Link to={`/events/${reg.events?.id}`} className="font-display font-semibold text-foreground hover:text-primary transition-colors">
                        {reg.events?.title}
                      </Link>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{reg.events?.date}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{reg.events?.location}</span>
                      </div>
                    </div>
                    <Badge>{reg.status}</Badge>
                    {reg.qr_code && (
                      <div className="p-2 bg-background rounded-lg">
                        <QRCodeSVG value={reg.qr_code} size={60} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {(hasRole("organizer") || hasRole("admin")) && (
            <TabsContent value="my-events" className="mt-6">
              {myEvents.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No events created</h3>
                  <Link to="/create-event"><Button variant="gradient">Create Your First Event</Button></Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {myEvents.map((event) => (
                    <div key={event.id} className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <Link to={`/events/${event.id}`} className="font-display font-semibold text-foreground hover:text-primary transition-colors">
                          {event.title}
                        </Link>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span>{event.date}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                        <Link to={`/manage-event/${event.id}`}>
                          <Button variant="outline" size="sm"><Settings className="w-4 h-4" /> Manage</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
