import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

interface Attendee {
  id: string
  name: string
  email: string
  ticketType: string
  ticketCategory: string
  purchaseDate: string
  paymentStatus: "paid" | "pending" | "failed"
}

interface AttendeesTableProps {
  attendees: Attendee[]
  eventId: string
}

export function AttendeesTable({ attendees, eventId }: AttendeesTableProps) {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500 text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const displayedAttendees = attendees.slice(0, 5) // Show only first 5

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Attendees</CardTitle>
          <p className="text-sm text-muted-foreground">Latest ticket purchases</p>
        </div>
        <Link href={`/dashboard/events/${eventId}/buyers`}>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            View All
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell className="text-muted-foreground">{attendee.email}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{attendee.ticketCategory}</div>
                    <Badge variant="secondary" className="text-xs">
                      {attendee.ticketType}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(attendee.purchaseDate), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(attendee.paymentStatus)}>
                    {attendee.paymentStatus.charAt(0).toUpperCase() + attendee.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {attendees.length === 0 && <div className="text-center py-8 text-muted-foreground">No attendees yet</div>}
      </CardContent>
    </Card>
  )
}
