import {IEmployee} from "@/store/employee/type";

export type CreateEmployeeType = Omit<IEmployee, 'id'>;