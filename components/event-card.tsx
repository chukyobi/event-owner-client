import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"
import { format } from "date-fns"

interface EventCardProps {
  event: {
    id: string
    title: string
    description?: string
    startDate: string
    endDate: string
    location?: string
    isVirtual: boolean
    category: string
    ticketsSold: number
    totalTickets: number
    revenue: number
    status: "upcoming" | "live" | "ended"
  }
}

export function EventCard({ event }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500 text-white"
      case "upcoming":
        return "bg-blue-500 text-white"
      case "ended":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-balance">{event.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {event.category}
            </Badge>
          </div>
          <Badge className={getStatusColor(event.status)}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.startDate), "MMM dd, yyyy 'at' h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.isVirtual ? "Virtual Event" : event.location || "TBD"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Tickets Sold</span>
            </div>
            <p className="text-lg font-semibold">
              {event.ticketsSold} / {event.totalTickets}
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((event.ticketsSold / event.totalTickets) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Revenue</span>
            </div>
            <p className="text-lg font-semibold">{formatCurrency(event.revenue)}</p>
          </div>
        </div>

        <div className="pt-2">
          <Link href={`/dashboard/events/${event.id}`}>
            <Button className="w-full">Manage Event</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
