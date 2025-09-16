"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TicketSalesBreakdown } from "@/components/ticket-sales-breakdown"
import { AttendeesTable } from "@/components/attendees-table"
import { StreamingSettings } from "@/components/streaming-settings"
import { ArrowLeft, Edit, Calendar, MapPin, Clock, Users } from "lucide-react"
import { format } from "date-fns"

// Mock data - replace with actual API calls
const mockEventDetails = {
  id: "1",
  title: "Tech Conference 2024",
  description:
    "Annual technology conference featuring industry leaders and cutting-edge innovations. Join us for a day of networking, learning, and inspiration.",
  startDate: "2024-03-15T09:00:00Z",
  endDate: "2024-03-15T17:00:00Z",
  location: "San Francisco Convention Center",
  isVirtual: false,
  virtualType: undefined,
  virtualUrl: undefined,
  category: "Technology",
  maxAttendees: 500,
  status: "upcoming" as const,
}

const mockTicketCategories = [
  {
    id: "1",
    name: "Early Bird",
    type: "NORMAL" as const,
    price: 99,
    quantity: 100,
    soldQuantity: 85,
  },
  {
    id: "2",
    name: "Regular",
    type: "NORMAL" as const,
    price: 149,
    quantity: 300,
    soldQuantity: 245,
  },
  {
    id: "3",
    name: "VIP Experience",
    type: "VIP" as const,
    price: 299,
    quantity: 50,
    soldQuantity: 42,
  },
  {
    id: "4",
    name: "Premium",
    type: "NORMAL" as const,
    price: 199,
    quantity: 50,
    soldQuantity: 38,
  },
]

const mockAttendees = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    ticketType: "NORMAL",
    ticketCategory: "Early Bird",
    purchaseDate: "2024-02-01T10:30:00Z",
    paymentStatus: "paid" as const,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    ticketType: "VIP",
    ticketCategory: "VIP Experience",
    purchaseDate: "2024-02-02T14:15:00Z",
    paymentStatus: "paid" as const,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    ticketType: "NORMAL",
    ticketCategory: "Regular",
    purchaseDate: "2024-02-03T09:45:00Z",
    paymentStatus: "pending" as const,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    ticketType: "NORMAL",
    ticketCategory: "Premium",
    purchaseDate: "2024-02-04T16:20:00Z",
    paymentStatus: "paid" as const,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    ticketType: "VIP",
    ticketCategory: "VIP Experience",
    purchaseDate: "2024-02-05T11:10:00Z",
    paymentStatus: "paid" as const,
  },
]

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [event, setEvent] = useState(mockEventDetails)
  const [ticketCategories, setTicketCategories] = useState(mockTicketCategories)
  const [attendees, setAttendees] = useState(mockAttendees)

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

  const totalSold = ticketCategories.reduce((sum, cat) => sum + cat.soldQuantity, 0)
  const totalRevenue = ticketCategories.reduce((sum, cat) => sum + cat.price * cat.soldQuantity, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-balance">{event.title}</h1>
            <Badge className={getStatusColor(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground">{event.description}</p>
        </div>
        <Button className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Event
        </Button>
      </div>

      {/* Event Info */}
      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date & Time</span>
              </div>
              <div>
                <p className="font-medium">{format(new Date(event.startDate), "MMMM dd, yyyy")}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
              <p className="font-medium">{event.isVirtual ? "Virtual Event" : event.location}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Attendees</span>
              </div>
              <p className="font-medium">
                {totalSold} / {event.maxAttendees}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Category</span>
              </div>
              <Badge variant="secondary">{event.category}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Sales and Attendees */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TicketSalesBreakdown categories={ticketCategories} />
        <AttendeesTable attendees={attendees} eventId={eventId} />
      </div>

      {/* Streaming Settings */}
      <StreamingSettings event={event} />
    </div>
  )
}
