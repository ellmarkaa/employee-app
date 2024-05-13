'use-client'
import {useRouter} from "next/navigation";
import {NextPage} from "next";
import {IEmployee} from "@/store/employee/type";
import styles from './style.module.css';

type EmployeeCardProps = {
  employee: IEmployee;
  handleDelete: (id: string) => void;
};

const EmployeeCard: NextPage<EmployeeCardProps> = ({employee, handleDelete}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/employee/${employee.id}`);
  };

  const deleteClick = () => {
    const isDelete = confirm(`Do you really want to delete employee - ${employee.name}?`);
    if (isDelete) handleDelete(employee.id);
  };

  return (
    <div className={styles.employeeCard}>
      <div className={styles.infoBlock}>
        <ul className={styles.list}>
          <li>Name: {employee.name}</li>
          <li>Email: {employee.email}</li>
          <li>Position: {employee.position}</li>
        </ul>

        <ul className={styles.list}>
          <li>Age: {employee.age}</li>
          <li>Department: {employee.department}</li>
        </ul>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={handleEdit}>
          Edit
        </button>

        <button
          className={styles.deleteButton}
          onClick={deleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;