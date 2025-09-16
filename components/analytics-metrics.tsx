import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Target } from "lucide-react"

interface AnalyticsMetricsProps {
  metrics: {
    totalRevenue: number
    revenueGrowth: number
    totalTicketsSold: number
    ticketGrowth: number
    averageTicketPrice: number
    priceGrowth: number
    conversionRate: number
    conversionGrowth: number
  }
}

export function AnalyticsMetrics({ metrics }: AnalyticsMetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const TrendIcon = ({ growth }: { growth: number }) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const metricCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(metrics.totalRevenue),
      growth: metrics.revenueGrowth,
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Tickets Sold",
      value: metrics.totalTicketsSold.toLocaleString(),
      growth: metrics.ticketGrowth,
      icon: Calendar,
      description: "vs last month",
    },
    {
      title: "Avg. Ticket Price",
      value: formatCurrency(metrics.averageTicketPrice),
      growth: metrics.priceGrowth,
      icon: Target,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: formatPercentage(metrics.conversionRate),
      growth: metrics.conversionGrowth,
      icon: Users,
      description: "visitors to buyers",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendIcon growth={metric.growth} />
              <span className={metric.growth >= 0 ? "text-green-500" : "text-red-500"}>
                {metric.growth >= 0 ? "+" : ""}
                {formatPercentage(metric.growth)}
              </span>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
