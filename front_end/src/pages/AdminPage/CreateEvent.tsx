import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription
} from "@/components/ui/field"

export default function CreateEvent() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: "",
    startDate: "",
    endDate: "",
    registrationDeadline: ""
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
  alert("Please login first")
  return
}

    const response = await fetch("http://localhost:3000/event/createevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (!response.ok) {
      alert("Failed to create event")
      return
    }

    alert("Event created successfully 🎉")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-6 bg-card border rounded-xl p-6"
    >

      <h2 className="text-2xl font-bold">Create Event</h2>

      <FieldGroup>

        <Field>
          <FieldLabel>Event Title</FieldLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Hackathon 2025"
            required
          />
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
            required
          />
        </Field>

        <Field>
          <FieldLabel>Start Date</FieldLabel>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Field>

                <Field>
          <FieldLabel>Registration Deadline</FieldLabel>
          <Input
            type="date"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <FieldLabel>End Date</FieldLabel>
          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Auditorium"
            required
          />
        </Field>

      </FieldGroup>

      <Button type="submit" className="w-full">
        Create Event
      </Button>

    </form>
  )
}