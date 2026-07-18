import Link from "next/link";
import Image from "next/image";
import { FileText, Video, Vote, RotateCcw, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bootcampDays, type SegmentKind } from "@/lib/mock-data";

const segmentIcon: Record<SegmentKind, typeof FileText> = {
  slide: FileText,
  live_demo: Video,
  activity: Vote,
  recap: RotateCcw,
};

// Premium AI-themed illustrations for each bootcamp day, blended low-opacity
// into the empty right-hand space of the card. Purely decorative - sits
// behind the existing header/checklist/buttons via z-stacking, never on top.
const dayIllustration: Record<number, string> = {
  1: "/illustrations/bootcamp-day1-fundamentals.png",
  2: "/illustrations/bootcamp-day2-prompt-engineering.png",
  3: "/illustrations/bootcamp-day3-automation.png",
};

export default function StudentBootcampPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">3-Day Bootcamp</h1>
        <p className="text-sm text-muted-foreground">
          Every segment is hands-on &mdash; you&apos;ll take quizzes, duel, and calculate your own ROI.
        </p>
      </div>

      <div className="space-y-4">
        {bootcampDays.map((day) => (
          <Card key={day.id} className="relative overflow-hidden">
            {dayIllustration[day.dayNumber] && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] md:block"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, transparent 6%, black 32%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 6%, black 32%)",
                }}
              >
                <Image
                  src={dayIllustration[day.dayNumber]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 0px"
                  className="object-contain object-right opacity-90 dark:opacity-40"
                  priority={false}
                />
              </div>
            )}
            <div className="relative z-10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Day {day.dayNumber}: {day.title}</CardTitle>
                  {day.status === "done" ? (
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="size-3" /> Done
                    </Badge>
                  ) : day.status === "live" ? (
                    <Badge>Live now</Badge>
                  ) : (
                    <Badge variant="secondary">Upcoming</Badge>
                  )}
                </div>
                <CardDescription>{day.theme}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {day.segments.map((seg) => {
                    const Icon = segmentIcon[seg.kind];
                    return (
                      <li key={seg.id} className="flex items-start gap-2 text-sm">
                        <Icon className="mt-0.5 size-4 shrink-0 text-primary/70" />
                        <div>
                          <p>{seg.title}</p>
                          <p className="text-xs text-muted-foreground">{seg.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex gap-2">
                  <Link href={`/bootcamp/present/${day.dayNumber}`}>
                    <Button variant={day.status === "done" ? "outline" : "default"}>
                      {day.status === "done" ? "Review recap" : "Join session"}
                    </Button>
                  </Link>
                  <Link href={`/student/bootcamp/${day.dayNumber}`}>
                    <Button variant="outline">View lessons &amp; quizzes</Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
