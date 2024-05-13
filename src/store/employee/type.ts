export interface IEmployee {
  id: string;
  name: string;
  email: string;
  age: number;
  position: string;
  department: string;
}

export type EmployeeFilterType = {
  filterBy: string;
  filter: string;
};