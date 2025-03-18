import { ReactNode } from "react";
import styles from "./Responsive.module.scss";

type Props = {
  children?: ReactNode;
};

export default function Responsive({ children, ...rest }: Props) {
  return (
    <div className={styles.resionsive} {...rest}>
      {children}
    </div>
  );
}
