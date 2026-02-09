import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = ["Tech", "Cultural", "Sports", "Workshop", "Music", "Academic"];

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    short_description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    category: "",
    image_url: "",
    max_attendees: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const { error } = await supabase.from("events").insert({
      title: form.title,
      description: form.description,
      short_description: form.short_description || null,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      location: form.location,
      category: form.category,
      image_url: form.image_url || null,
      max_attendees: form.max_attendees ? parseInt(form.max_attendees) : null,
      organizer_id: user.id,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Event created!", description: "Your event is now live." });
      navigate("/dashboard");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Create <span className="text-gradient">Event</span>
        </h1>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <Label>Event Title *</Label>
            <Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} required placeholder="TechFest 2024" />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} required rows={4} placeholder="Describe your event..." />
          </div>

          <div className="space-y-2">
            <Label>Short Description</Label>
            <Input value={form.short_description} onChange={(e) => handleChange("short_description", e.target.value)} placeholder="Brief one-line summary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Start Time *</Label>
              <Input type="time" value={form.start_time} onChange={(e) => handleChange("start_time", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>End Time *</Label>
              <Input type="time" value={form.end_time} onChange={(e) => handleChange("end_time", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input value={form.location} onChange={(e) => handleChange("location", e.target.value)} required placeholder="Main Auditorium" />
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => handleChange("category", v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={form.image_url} onChange={(e) => handleChange("image_url", e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Max Attendees</Label>
              <Input type="number" value={form.max_attendees} onChange={(e) => handleChange("max_attendees", e.target.value)} placeholder="Unlimited" />
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full" disabled={submitting}>
            {submitting ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
