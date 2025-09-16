"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Settings, ExternalLink, Play, Square } from "lucide-react"

export default function StreamingSetupPage() {
  const mockActiveStreams = [
    {
      id: "1",
      eventTitle: "Virtual Marketing Summit",
      status: "live",
      viewers: 1247,
      startTime: "2024-02-20T10:00:00Z",
    },
    {
      id: "2",
      eventTitle: "Tech Conference 2024",
      status: "scheduled",
      viewers: 0,
      startTime: "2024-03-15T09:00:00Z",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Streaming Setup</h1>
        <p className="text-muted-foreground">Manage your live streams and virtual events</p>
      </div>

      {/* Active Streams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Active Streams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActiveStreams.map((stream) => (
              <div
                key={stream.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{stream.eventTitle}</h3>
                    <Badge className={stream.status === "live" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}>
                      {stream.status === "live" ? "LIVE" : "Scheduled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stream.status === "live" ? `${stream.viewers} viewers` : "Starts March 15, 2024"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    View
                  </Button>
                  {stream.status === "live" ? (
                    <Button variant="destructive" size="sm" className="gap-2">
                      <Square className="h-4 w-4" />
                      Stop
                    </Button>
                  ) : (
                    <Button size="sm" className="gap-2">
                      <Play className="h-4 w-4" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streaming Guide */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Setup Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Configure Your Event</h4>
              <p className="text-sm text-muted-foreground">
                Set your event as virtual and choose the streaming type (Live, VR, or Both).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Get Your Stream Key</h4>
              <p className="text-sm text-muted-foreground">
                Copy your RTMP URL and stream key from the event details page.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Configure OBS/Streaming Software</h4>
              <p className="text-sm text-muted-foreground">
                Use the provided RTMP settings in your streaming software.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">4. Test & Go Live</h4>
              <p className="text-sm text-muted-foreground">Test your stream before the event starts.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Streaming Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Settings</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Resolution: 1920x1080 (1080p)</li>
                <li>• Frame Rate: 30 FPS</li>
                <li>• Bitrate: 3000-6000 kbps</li>
                <li>• Audio: 128 kbps, 44.1 kHz</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">VR Streaming</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Resolution: 3840x2160 (4K)</li>
                <li>• Frame Rate: 60 FPS</li>
                <li>• Bitrate: 8000-15000 kbps</li>
                <li>• Spatial Audio: Enabled</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
