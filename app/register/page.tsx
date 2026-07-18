"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner — new to AI" },
  { value: "intermediate", label: "Intermediate — some hands-on experience" },
  { value: "advanced", label: "Advanced — regularly build with AI" },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [reasonForJoining, setReasonForJoining] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, organization, experienceLevel, currentRole, reasonForJoining }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-bg flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="brand-gradient flex size-8 items-center justify-center rounded-xl shadow-[0_2px_10px_-2px_rgb(79_70_229_/_0.45)]">
          <Rocket className="size-4.5 text-white" />
        </span>
        <span className="font-heading text-xl font-semibold tracking-tight">AI Practitioner Program</span>
      </Link>

      <Card className="glass-panel w-full max-w-lg border-border shadow-lg">
        {submitted ? (
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-7 text-emerald-600" />
            </span>
            <CardTitle>You're registered!</CardTitle>
            <CardDescription>
              Thanks for applying to the AI Practitioner Program. We&apos;ll be in touch with next steps shortly.
            </CardDescription>
            <Link href="/student/courses">
              <Button className="mt-2">Back to your courses</Button>
            </Link>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Register for the AI Practitioner Program</CardTitle>
              <CardDescription>Takes less than two minutes. We&apos;ll follow up by email.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+968 9000 0000" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" required value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select value={experienceLevel} onValueChange={(v) => v && setExperienceLevel(v)}>
                      <SelectTrigger id="experienceLevel" className="w-full">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input id="currentRole" required value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="Product Manager" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reasonForJoining">Reason for Joining</Label>
                  <Textarea
                    id="reasonForJoining"
                    required
                    rows={3}
                    value={reasonForJoining}
                    onChange={(e) => setReasonForJoining(e.target.value)}
                    placeholder="What do you want to get out of the program?"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !experienceLevel}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
