import { useState } from "react";
import { ChevronDown, ChevronRight, Mail, Send, Bell, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityEvent } from "@/lib/types";

const EVENT_ICON: Record<string, typeof Mail> = {
  sent: Send,
  reminder: Bell,
  escalation: Megaphone,
};

const EVENT_LABEL: Record<string, string> = {
  sent: "Request sent",
  reminder: "Auto-chase reminder",
  escalation: "Escalation",
};

interface VerificationTimelineProps {
  events: ActivityEvent[];
}

export function VerificationTimeline({ events }: VerificationTimelineProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Activity timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {events.map((event) => {
          const isOpen = openIds.has(event.id);
          const Icon = EVENT_ICON[event.eventType] ?? Mail;
          return (
            <div key={event.id} className="border border-border rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(event.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover-elevate"
              >
                {isOpen ? (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                )}
                <Icon className="size-4 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Day {event.dayOffset} — {EVENT_LABEL[event.eventType] ?? event.eventType}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">To: {event.recipient}</p>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-border bg-muted/40 p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">To:</span> {event.recipient}
                  </p>
                  <p className="text-sm font-semibold">{event.subject}</p>
                  <p className="text-sm whitespace-pre-line">{event.body}</p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
