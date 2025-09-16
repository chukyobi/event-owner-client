import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface TicketCategory {
  id: string
  name: string
  type: "NORMAL" | "VR" | "VIP"
  price: number
  quantity: number
  soldQuantity: number
}

interface TicketSalesBreakdownProps {
  categories: TicketCategory[]
}

export function TicketSalesBreakdown({ categories }: TicketSalesBreakdownProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
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

  const totalRevenue = categories.reduce((sum, cat) => sum + cat.price * cat.soldQuantity, 0)
  const totalSold = categories.reduce((sum, cat) => sum + cat.soldQuantity, 0)
  const totalQuantity = categories.reduce((sum, cat) => sum + cat.quantity, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Sales Breakdown</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Total Sold: {totalSold} / {totalQuantity}
          </span>
          <span>Revenue: {formatCurrency(totalRevenue)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => {
          const soldPercentage = (category.soldQuantity / category.quantity) * 100
          const revenue = category.price * category.soldQuantity

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(category.type)}>{category.type}</Badge>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{formatCurrency(category.price)}</div>
                  <div className="text-muted-foreground">
                    {category.soldQuantity} / {category.quantity} sold
                  </div>
                </div>
              </div>
              <Progress value={soldPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{soldPercentage.toFixed(1)}% sold</span>
                <span>Revenue: {formatCurrency(revenue)}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
