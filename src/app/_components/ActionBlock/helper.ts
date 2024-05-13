import {IEmployee} from "@/store/employee/type";

export const employeeFilterFields: (keyof IEmployee)[] = [
  "age",
  "email",
  "id",
  "department",
  "position",
  "name"
]