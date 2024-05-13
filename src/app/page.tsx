'use client'
import {useDeleteEmployeeMutation, useGetEmployeesQuery} from "@/store/employee/employeeApi";
import {useState} from "react";
import {IEmployee} from "@/store/employee/type";
import ActionBlock from "@/app/_components/ActionBlock";
import useDebounce from "@/hooks/useDebounce";
import Loader from "../ui/Loader";
import ShowError from "@/ui/ShowError";
import EmployeeCard from "@/app/_components/EmployeeCard";
import styles from "./page.module.css";

export default function Home() {
  const [filterBy, setFilterBy] = useState<keyof IEmployee>('id');
  const [filterValue, setFilterValue] = useState<string>('');
  const debouncedFilter = useDebounce<string>(filterValue, 500);
  const {isLoading, data, error, isFetching} = useGetEmployeesQuery({
    filterBy,
    filter: debouncedFilter
  });
  const [deleteAction, {isLoading: deleteLoading}] = useDeleteEmployeeMutation();

  const handleDelete = (id: string) => {
    deleteAction(id);
  };

  return (
    <main className={styles.main}>
      <ActionBlock
        filterBy={filterBy}
        filterValue={filterValue}
        setFilterBy={setFilterBy}
        setFilterValue={setFilterValue}
      />
      <div className={styles.listBlock}>
        {
          data?.length
            ? data.map(employee => (
              <EmployeeCard
                handleDelete={handleDelete}
                key={employee.id}
                employee={employee}
              />
            ))
            : !isLoading && <p>No data. Create employee</p>
        }
        {
           isFetching && <Loader />
        }
        {
          error && <ShowError text={error} />
        }
      </div>
    </main>
  );
}
