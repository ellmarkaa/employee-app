import * as yup from "yup";
import {CreateEmployeeType} from "@/types";

export const employeeSchema: yup.ObjectSchema<CreateEmployeeType> = yup.object({
  name: yup
    .string()
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  position: yup
    .string()
    .required(),
  age: yup
    .number()
    .min(18, 'Min age is 18')
    .max(103, 'Max age is 103 :(')
    .required(),
  department: yup
    .string()
    .required(),
});