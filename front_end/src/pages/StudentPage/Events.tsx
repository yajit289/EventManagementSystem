import { useState, useEffect } from "react"
import EventCard from "@/components/common/event-card"

export default function Events() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {

      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:3000/event", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      setEvents(data)

    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const now = new Date()

  const liveEvents = events.filter(
    (event) => new Date(event.startDate) <= now && new Date(event.endDate) >= now
  )

  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > now
  )

  const previousEvents = events.filter(
    (event) => new Date(event.endDate) < now
  )

  return (
    <div className="p-10 space-y-16">

      {/* Live Events */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-red-500">🔴 Live Events</h2>

        {liveEvents.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No live events right now.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {liveEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>


      {/* Upcoming Events */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-500">🟢 Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No upcoming events scheduled.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>


      {/* Previous Events */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-500">⚫ Previous Events</h2>

        {previousEvents.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No past events available.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {previousEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}