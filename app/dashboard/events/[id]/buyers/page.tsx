"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BuyersTable } from "@/components/buyers-table"
import { ArrowLeft } from "lucide-react"

// Mock data - replace with actual API calls
const mockBuyers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    ticketType: "NORMAL" as const,
    ticketCategory: "Early Bird",
    quantity: 1,
    totalAmount: 99,
    purchaseDate: "2024-02-01T10:30:00Z",
    paymentStatus: "paid" as const,
    seatNumbers: ["A-12"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    ticketType: "VIP" as const,
    ticketCategory: "VIP Experience",
    quantity: 2,
    totalAmount: 598,
    purchaseDate: "2024-02-02T14:15:00Z",
    paymentStatus: "paid" as const,
    seatNumbers: ["VIP-1", "VIP-2"],
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    ticketType: "NORMAL" as const,
    ticketCategory: "Regular",
    quantity: 1,
    totalAmount: 149,
    purchaseDate: "2024-02-03T09:45:00Z",
    paymentStatus: "pending" as const,
    seatNumbers: ["B-15"],
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 (555) 345-6789",
    ticketType: "VR" as const,
    ticketCategory: "VR Experience",
    quantity: 1,
    totalAmount: 199,
    purchaseDate: "2024-02-04T16:20:00Z",
    paymentStatus: "paid" as const,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    ticketType: "VIP" as const,
    ticketCategory: "VIP Experience",
    quantity: 1,
    totalAmount: 299,
    purchaseDate: "2024-02-05T11:10:00Z",
    paymentStatus: "paid" as const,
    seatNumbers: ["VIP-3"],
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+1 (555) 456-7890",
    ticketType: "NORMAL" as const,
    ticketCategory: "Premium",
    quantity: 3,
    totalAmount: 597,
    purchaseDate: "2024-02-06T13:25:00Z",
    paymentStatus: "paid" as const,
    seatNumbers: ["C-10", "C-11", "C-12"],
  },
  {
    id: "7",
    name: "Edward Norton",
    email: "edward@example.com",
    ticketType: "VR" as const,
    ticketCategory: "VR Experience",
    quantity: 2,
    totalAmount: 398,
    purchaseDate: "2024-02-07T08:40:00Z",
    paymentStatus: "failed" as const,
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona@example.com",
    phone: "+1 (555) 567-8901",
    ticketType: "NORMAL" as const,
    ticketCategory: "Early Bird",
    quantity: 1,
    totalAmount: 99,
    purchaseDate: "2024-02-08T15:55:00Z",
    paymentStatus: "refunded" as const,
    seatNumbers: ["A-20"],
  },
]

const mockEventTitle = "Tech Conference 2024"

export default function EventBuyersPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [buyers, setBuyers] = useState(mockBuyers)
  const [eventTitle, setEventTitle] = useState(mockEventTitle)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Ticket Buyers</h1>
          <p className="text-muted-foreground">{eventTitle}</p>
        </div>
      </div>

      {/* Buyers Table */}
      <BuyersTable buyers={buyers} eventTitle={eventTitle} />
    </div>
  )
}
