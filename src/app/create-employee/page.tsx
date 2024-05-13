'use client'
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {useCreateEmployeeMutation} from "@/store/employee/employeeApi";
import {employeeSchema} from "@/app/create-employee/helper";
import Input from "@/ui/Input";
import ShowError from "@/ui/ShowError";
import {ValidationError} from "yup";
import {CreateEmployeeType} from "@/types";
import styles from './style.module.css';

const initialValueError: Record<keyof CreateEmployeeType, string> = {
  age: '',
  position: '',
  department: '',
  email: '',
  name: ''
};
const inputArr: (keyof CreateEmployeeType)[] = ['name', 'age', 'position', 'department', 'email'];

export default function CreateEmployee() {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<CreateEmployeeType>({
    age: 0,
    position: '',
    department: '',
    email: '',
    name: ''
  });
  const [error, setError] = useState<Record<keyof CreateEmployeeType, string>>(initialValueError);
  const [createEmployee, {isLoading, error: createError}] = useCreateEmployeeMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(initialValueError);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      employeeSchema.validateSync(employeeData);
      await createEmployee(employeeData)
      router.push('/')
    } catch (e: ValidationError | any) {
      if (e.path) {
        setError(prev => ({
          ...prev,
          [e.path]: e.message
        }));
      }
    }
  }

  return (
    <div className={styles.createEmployee}>
      <h3 className={styles.title}>Creating employee</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        {
          inputArr.map(input => {
            const type = input === 'age' ? 'number' : 'text';
            return (
              <Input
                key={input}
                type={type}
                label={input}
                value={employeeData[input]}
                name={input}
                placeholder={input}
                onChange={handleChange}
                error={error[input]}
              />
            );
          })
        }
        <button type="submit" disabled={isLoading}>Create</button>
      </form>
      {
        createError && <ShowError text={createError}/>
      }
    </div>
  );
}
