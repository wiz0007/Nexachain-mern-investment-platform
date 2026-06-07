import styles from "./DashboardSkeleton.module.css";

const DashboardSkeleton =
  () => {
    return (
      <div
        className={
          styles.container
        }
      >
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <div
              key={index}
              className={
                styles.card
              }
            />
          )
        )}
      </div>
    );
  };

export default DashboardSkeleton;
