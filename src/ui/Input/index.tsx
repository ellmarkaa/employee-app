import {ChangeEvent, FC} from 'react'
import styles from './style.module.css';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
     type,
     label,
     value,
     name,
     placeholder,
     error,
     disabled,
     onChange
                               }) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Input