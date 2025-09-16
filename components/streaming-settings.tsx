"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ExternalLink, Video, Settings } from "lucide-react"
import { useState } from "react"

interface StreamingSettingsProps {
  event: {
    id: string
    isVirtual: boolean
    virtualType?: "LIVE" | "VR" | "BOTH"
    virtualUrl?: string
  }
}

export function StreamingSettings({ event }: StreamingSettingsProps) {
  const [rtmpUrl] = useState(`rtmp://stream.eventpro.com/live/${event.id}`)
  const [streamKey] = useState(`sk_${event.id}_${Math.random().toString(36).substr(2, 9)}`)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (!event.isVirtual) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Streaming Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Video className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>This is a physical event. Streaming is not configured.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Streaming Settings
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{event.virtualType || "LIVE"}</Badge>
          <Badge className="bg-green-500 text-white">Virtual Event</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stream URL */}
        <div className="space-y-2">
          <Label htmlFor="stream-url">Stream URL</Label>
          <div className="flex gap-2">
            <Input
              id="stream-url"
              value={event.virtualUrl || "https://stream.eventpro.com/watch/" + event.id}
              readOnly
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(event.virtualUrl || "https://stream.eventpro.com/watch/" + event.id)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* RTMP Settings */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            RTMP Configuration
          </h4>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="rtmp-url">RTMP URL</Label>
              <div className="flex gap-2">
                <Input id="rtmp-url" value={rtmpUrl} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(rtmpUrl)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stream-key">Stream Key</Label>
              <div className="flex gap-2">
                <Input id="stream-key" value={streamKey} readOnly type="password" />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(streamKey)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* VR Setup Guide */}
        {(event.virtualType === "VR" || event.virtualType === "BOTH") && (
          <div className="space-y-2">
            <Label>VR Setup Guide</Label>
            <Textarea
              readOnly
              value={`VR Setup Instructions:
1. Ensure your VR headset is connected and calibrated
2. Use the RTMP URL above with VR streaming software
3. Set resolution to 4K (3840x2160) for optimal quality
4. Enable spatial audio for immersive experience
5. Test stream before going live

Recommended VR streaming software:
- OBS Studio with VR plugin
- Wirecast VR
- Unity Render Streaming`}
              rows={10}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1">Test Stream</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Go Live
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
