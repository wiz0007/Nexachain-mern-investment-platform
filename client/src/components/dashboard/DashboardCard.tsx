import type { ReactNode } from "react";

import styles from "./DashboardCard.module.css";

interface Props {
  title: string;

  value: string | number;

  helper: string;

  icon: ReactNode;
}

const DashboardCard = ({
  title,
  value,
  helper,
  icon,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {icon}
      </div>

      <h4>{title}</h4>

      <h2>{value}</h2>

      <p>{helper}</p>
    </div>
  );
};

export default DashboardCard;
