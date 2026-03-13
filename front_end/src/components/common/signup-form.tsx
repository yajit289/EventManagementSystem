import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { RoleSelect } from "../ui/RoleSelect"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const navigate = useNavigate()

  function handelChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  async function handelSubmit(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("! password Does not Match")
      return;
    }
      if (!formData.role) {
    alert("Please select a role")
    return
  }
    // call post api
    const response = await fetch(
      "http://localhost:3000/user/register",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      }
    )
    const data = await response.json()

    if (!response.ok) {
      alert(data.message || " registration failed")
      return;
    }
    alert("User profile created successfully 🎉")

    navigate("/login")
  }



  return (
    <form onSubmit={handelSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" value={formData.name} onChange={handelChange} type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name='email' value={formData.email} onChange={handelChange} type="email" placeholder="m@example.com" required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name='password' value={formData.password} onChange={handelChange} type="password" required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handelChange} type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
       <RoleSelect
  value={formData.role}
  onChange={(value) =>
    setFormData({
      ...formData,
      role: value
    })
  }
/>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/login"> Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
