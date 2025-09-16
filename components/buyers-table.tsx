"use client"
import { useState } from "react"
import React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, Mail, Phone } from "lucide-react"
import { format } from "date-fns"

interface Buyer {
  id: string
  name: string
  email: string
  phone?: string
  ticketType: "NORMAL" | "VR" | "VIP"
  ticketCategory: string
  quantity: number
  totalAmount: number
  purchaseDate: string
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  seatNumbers?: string[]
}

interface BuyersTableProps {
  buyers: Buyer[]
  eventTitle: string
}

export function BuyersTable({ buyers, eventTitle }: BuyersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredBuyers, setFilteredBuyers] = useState(buyers)

  // Filter buyers based on search and filters
  React.useEffect(() => {
    let filtered = buyers

    if (searchTerm) {
      filtered = filtered.filter(
        (buyer) =>
          buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          buyer.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((buyer) => buyer.ticketType === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((buyer) => buyer.paymentStatus === statusFilter)
    }

    setFilteredBuyers(filtered)
  }, [buyers, searchTerm, typeFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500 text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      case "refunded":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIP":
        return "bg-purple-500 text-white"
      case "VR":
        return "bg-blue-500 text-white"
      case "NORMAL":
        return "bg-green-500 text-white"
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

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Ticket Type",
      "Category",
      "Quantity",
      "Amount",
      "Purchase Date",
      "Status",
    ]
    const csvData = [
      headers,
      ...filteredBuyers.map((buyer) => [
        buyer.name,
        buyer.email,
        buyer.phone || "",
        buyer.ticketType,
        buyer.ticketCategory,
        buyer.quantity.toString(),
        buyer.totalAmount.toString(),
        format(new Date(buyer.purchaseDate), "yyyy-MM-dd"),
        buyer.paymentStatus,
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${eventTitle.replace(/\s+/g, "_")}_buyers.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totalRevenue = filteredBuyers.reduce((sum, buyer) => sum + buyer.totalAmount, 0)
  const totalTickets = filteredBuyers.reduce((sum, buyer) => sum + buyer.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Buyers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredBuyers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Ticket Buyers</CardTitle>
            <Button onClick={exportToCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Ticket Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="VR">VR</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Ticket Details</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuyers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No buyers found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBuyers.map((buyer) => (
                    <TableRow key={buyer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{buyer.name}</p>
                          {buyer.seatNumbers && (
                            <p className="text-xs text-muted-foreground">Seats: {buyer.seatNumbers.join(", ")}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span className="text-muted-foreground">{buyer.email}</span>
                          </div>
                          {buyer.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              <span className="text-muted-foreground">{buyer.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getTypeColor(buyer.ticketType)}>{buyer.ticketType}</Badge>
                          <p className="text-sm text-muted-foreground">{buyer.ticketCategory}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{buyer.quantity}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{formatCurrency(buyer.totalAmount)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{format(new Date(buyer.purchaseDate), "MMM dd, yyyy")}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(buyer.paymentStatus)}>
                          {buyer.paymentStatus.charAt(0).toUpperCase() + buyer.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          {buyer.paymentStatus === "pending" && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Refund
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
