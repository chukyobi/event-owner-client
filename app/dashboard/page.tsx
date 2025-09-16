"use client"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"

import { EventCard } from "@/components/event-card"
import { DashboardStats } from "@/components/dashboard-stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const mockEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring industry leaders",
    startDate: "2024-03-15T09:00:00Z",
    endDate: "2024-03-15T17:00:00Z",
    location: "San Francisco Convention Center",
    isVirtual: false,
    category: "Technology",
    ticketsSold: 450,
    totalTickets: 500,
    revenue: 67500,
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "Virtual Marketing Summit",
    description: "Online summit for marketing professionals",
    startDate: "2024-02-20T10:00:00Z",
    endDate: "2024-02-20T16:00:00Z",
    location: null,
    isVirtual: true,
    category: "Marketing",
    ticketsSold: 1200,
    totalTickets: 1500,
    revenue: 36000,
    status: "live" as const,
  },
  {
    id: "3",
    title: "Design Workshop Series",
    description: "Hands-on design workshops for beginners",
    startDate: "2024-01-10T14:00:00Z",
    endDate: "2024-01-10T18:00:00Z",
    location: "Creative Hub Downtown",
    isVirtual: false,
    category: "Design",
    ticketsSold: 85,
    totalTickets: 100,
    revenue: 4250,
    status: "ended" as const,
  },
]

const mockStats = {
  totalEvents: 12,
  totalAttendees: 3420,
  totalRevenue: 156750,
  activeEvents: 3,
}

export default function DashboardPage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stats, setStats] = useState(mockStats)

  // Filter events based on search and status
  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, statusFilter])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and track performance</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Events Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first event"}
            </p>
            <Link href="/dashboard/create">
              <Button>Create Your First Event</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
