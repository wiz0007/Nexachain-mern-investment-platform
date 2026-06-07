import type { ReactNode } from "react";

import styles from "./TableWrapper.module.css";

interface Props {
  title: string;

  children: ReactNode;
}

const TableWrapper = ({
  title,
  children,
}: Props) => {
  return (
    <section className={styles.wrapper}>
      <h2>{title}</h2>

      {children}
    </section>
  );
};

export default TableWrapper;
