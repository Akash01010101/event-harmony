import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, Shield, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ users: 0, events: 0, registrations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*, user_roles(role)");
    setUsers(profiles || []);

    const { data: evts } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    setEvents(evts || []);

    const { count: regCount } = await supabase.from("registrations").select("*", { count: "exact", head: true });

    setStats({
      users: (profiles || []).length,
      events: (evts || []).length,
      registrations: regCount || 0,
    });
    setLoading(false);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    // Delete existing role and insert new one
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole } as any);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role updated" });
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Users", value: stats.users, color: "text-primary" },
            { icon: Calendar, label: "Total Events", value: stats.events, color: "text-accent" },
            { icon: BarChart3, label: "Registrations", value: stats.registrations, color: "text-primary" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <Icon className={`w-8 h-8 ${color}`} />
                <div>
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Users Management */}
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" /> User Management
        </h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
          <div className="divide-y divide-border">
            {users.map((u) => {
              const currentRole = u.user_roles?.[0]?.role || "student";
              return (
                <div key={u.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium text-foreground">{u.full_name || "No name"}</div>
                    <div className="text-sm text-muted-foreground">{u.email}</div>
                  </div>
                  <Select value={currentRole} onValueChange={(v) => handleRoleChange(u.user_id, v)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="organizer">Organizer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Events */}
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Recent Events</h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {events.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium text-foreground">{event.title}</div>
                  <div className="text-sm text-muted-foreground">{event.date} • {event.location}</div>
                </div>
                <Badge>{event.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
