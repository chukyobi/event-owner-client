"use client"
import { useState } from "react"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AnalyticsMetrics } from "@/components/analytics-metrics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"

// Mock data - replace with actual API calls
const mockMetrics = {
  totalRevenue: 156750,
  revenueGrowth: 12.5,
  totalTicketsSold: 3420,
  ticketGrowth: 8.3,
  averageTicketPrice: 45.85,
  priceGrowth: 3.7,
  conversionRate: 24.6,
  conversionGrowth: -2.1,
}

const mockTicketSalesData = [
  { date: "Jan 1", sales: 45, revenue: 2250 },
  { date: "Jan 8", sales: 52, revenue: 2600 },
  { date: "Jan 15", sales: 48, revenue: 2400 },
  { date: "Jan 22", sales: 61, revenue: 3050 },
  { date: "Jan 29", sales: 55, revenue: 2750 },
  { date: "Feb 5", sales: 67, revenue: 3350 },
  { date: "Feb 12", sales: 72, revenue: 3600 },
  { date: "Feb 19", sales: 58, revenue: 2900 },
  { date: "Feb 26", sales: 64, revenue: 3200 },
  { date: "Mar 5", sales: 78, revenue: 3900 },
  { date: "Mar 12", sales: 82, revenue: 4100 },
  { date: "Mar 19", sales: 69, revenue: 3450 },
]

const mockRevenueByType = [
  { type: "General", revenue: 45600, count: 1520 },
  { type: "VIP", revenue: 67200, count: 224 },
  { type: "VR", revenue: 28800, count: 144 },
  { type: "Premium", revenue: 15150, count: 101 },
]

const mockDemographics = [
  { ageGroup: "18-25", count: 856, percentage: 25.0 },
  { ageGroup: "26-35", count: 1368, percentage: 40.0 },
  { ageGroup: "36-45", count: 684, percentage: 20.0 },
  { ageGroup: "46-55", count: 342, percentage: 10.0 },
  { ageGroup: "55+", count: 171, percentage: 5.0 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [metrics, setMetrics] = useState(mockMetrics)
  const [ticketSalesData, setTicketSalesData] = useState(mockTicketSalesData)
  const [revenueByType, setRevenueByType] = useState(mockRevenueByType)
  const [demographics, setDemographics] = useState(mockDemographics)

  const handleExportData = () => {
    // Implement CSV export functionality
    console.log("Exporting analytics data...")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Analytics</h1>
          <p className="text-muted-foreground">Track your event performance and audience insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportData} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <AnalyticsMetrics metrics={metrics} />

      {/* Charts */}
      <AnalyticsCharts ticketSalesData={ticketSalesData} revenueByType={revenueByType} demographics={demographics} />

      {/* Additional Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Top Performing Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tech Conference 2024", revenue: 67500, attendees: 450 },
                { name: "Virtual Marketing Summit", revenue: 36000, attendees: 1200 },
                { name: "Design Workshop Series", revenue: 4250, attendees: 85 },
              ].map((event, index) => (
                <div key={event.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.attendees} attendees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(event.revenue)}
                    </p>
                    <p className="text-sm text-muted-foreground">#{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Revenue Growth</p>
                <p className="text-xs text-green-600 dark:text-green-300">
                  Your revenue increased by 12.5% compared to last month, driven by higher VIP ticket sales.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Audience Demographics</p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  65% of your attendees are between 26-45 years old, indicating strong professional engagement.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Conversion Rate</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-300">
                  Conversion rate decreased by 2.1%. Consider optimizing your event landing pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
