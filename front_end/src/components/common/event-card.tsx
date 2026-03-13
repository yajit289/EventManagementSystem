import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function EventCard({ event }) {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card className="w-[350px] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{event.title}</CardTitle>
          <Badge variant="secondary">{event.status}</Badge>
        </div>

        <CardDescription>
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">

        <div className="text-sm text-muted-foreground">
          📅 Date: {formatDate(event.startDate)}
        </div>

        <div className="text-sm text-muted-foreground">
          📍 Location: {event.location}
        </div>

        <Button className="w-full">
          Register
        </Button>

      </CardContent>

    </Card>
  )
}