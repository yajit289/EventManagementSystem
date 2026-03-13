import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RoleSelect({ value, onChange }) {
  return (
    <Field className="w-full">
      <FieldLabel>Role</FieldLabel>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <FieldDescription>
        Choose whether you are registering as a student or admin.
      </FieldDescription>
    </Field>
  )
}