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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  //handle change function
  function handelchange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  //handel submit function

  async function handelSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
          headers: {
    "Content-Type": "application/json"
  },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })
      const data = await response.json()
      if (!response.ok) {
        alert("loin failed")
      }

      localStorage.setItem("role", data.user.role)
      //store token
      localStorage.setItem("token", data.token)
      alert("Login Sucessful")

      //check the role is admin or student and navigate accordingly
      if(data.user.role === "admin"){
        navigate("/admin/dashboard")
      }else{
        navigate("/student/dashboard")
      }

    } catch (error) {
      console.error(error)
      alert("Server error")
    }
  }
    return (
      <form onSubmit={handelSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            {/* <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p> */}
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" value={formData.email} name="email" onChange={handelchange} type="email" placeholder="m@example.com" required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" value={formData.password} name="password" onChange={handelchange} type="password" required />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register">Register</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    )
  
}
