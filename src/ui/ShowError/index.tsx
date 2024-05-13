import {FC} from "react";
import styles from './styles.module.css';

type ShowErrorProps = {
  text: any;
};

const ShowError: FC<ShowErrorProps> = ({text}) => {
  return (
    <div className={styles.showError}>
      {text}
    </div>
  );
};

export default ShowError;