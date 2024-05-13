'use client'
import React, {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {useRouter} from "next/navigation";
import Input from '@/ui/Input';
import {employeeFilterFields} from "@/app/_components/ActionBlock/helper";
import {IEmployee} from "@/store/employee/type";
import styles from "./action.module.css";

type ActionBlockProps = {
  filterBy: keyof IEmployee;
  filterValue: string;
  setFilterBy: Dispatch<SetStateAction<keyof IEmployee>>;
  setFilterValue: Dispatch<SetStateAction<string>>;
};

const ActionBlock: FC<ActionBlockProps> = ({
 setFilterBy,
 setFilterValue,
 filterValue,
 filterBy
}) => {
  const router = useRouter();

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value as keyof IEmployee);
  };

  const handleChangeFiltration = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleClickCreate = () => {
    router.push('/create-employee');
  };

  return (
    <div className={styles.actionBlock}>
      <div className={styles.filteringBlock}>
        <label htmlFor="filterBy">Filter by:
          <select
            className={styles.select}
            id="filterBy"
            value={filterBy}
            onChange={handleChangeSelect}
          >
            {
              employeeFilterFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))
            }
          </select>
        </label>

        <Input
          value={filterValue}
          onChange={handleChangeFiltration}
          label="filtering"
          name="filter"
          placeholder="filter"
          type="text"
        />
      </div>

      <button className={styles.button} onClick={handleClickCreate}>
        Create Employee
      </button>
    </div>
  );
};

export default ActionBlock;