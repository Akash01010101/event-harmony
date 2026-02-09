import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, QrCode, CheckCircle, XCircle } from "lucide-react";

const ManageEvent = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) fetchData();
  }, [id, user]);

  const fetchData = async () => {
    const { data: ev } = await supabase.from("events").select("*").eq("id", id!).single();
    setEvent(ev);

    const { data: regs } = await supabase
      .from("registrations")
      .select("*, profiles!registrations_user_id_fkey(full_name, email)")
      .eq("event_id", id!);
    setRegistrations(regs || []);
    setLoading(false);
  };

  const handleCheckIn = async (regId: string) => {
    // Organizer performs check-in - need to use a different approach since organizer doesn't own the registration
    const { error } = await supabase.from("registrations").update({
      status: "checked_in",
      checked_in_at: new Date().toISOString(),
    }).eq("id", regId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Checked in!", description: "Attendee has been checked in." });
      fetchData();
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

  const registered = registrations.filter((r) => r.status === "registered");
  const checkedIn = registrations.filter((r) => r.status === "checked_in");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{event?.title}</h1>
            <p className="text-muted-foreground mt-1">{event?.date} • {event?.location}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="bg-card border border-border rounded-xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-foreground">{registrations.length}</div>
              <div className="text-xs text-muted-foreground">Registered</div>
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-primary">{checkedIn.length}</div>
              <div className="text-xs text-muted-foreground">Checked In</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="attendees">
          <TabsList>
            <TabsTrigger value="attendees"><Users className="w-4 h-4 mr-1" /> Attendees</TabsTrigger>
          </TabsList>

          <TabsContent value="attendees" className="mt-6">
            {registrations.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-2xl">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">No registrations yet</h3>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="divide-y divide-border">
                  {registrations.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium text-foreground">{(reg.profiles as any)?.full_name || "Unknown"}</div>
                        <div className="text-sm text-muted-foreground">{(reg.profiles as any)?.email || ""}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={reg.status === "checked_in" ? "default" : "secondary"}>
                          {reg.status === "checked_in" ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Checked In</>
                          ) : reg.status === "cancelled" ? (
                            <><XCircle className="w-3 h-3 mr-1" /> Cancelled</>
                          ) : (
                            "Registered"
                          )}
                        </Badge>
                        {reg.status === "registered" && (
                          <Button variant="outline" size="sm" onClick={() => handleCheckIn(reg.id)}>
                            <QrCode className="w-4 h-4" /> Check In
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageEvent;
