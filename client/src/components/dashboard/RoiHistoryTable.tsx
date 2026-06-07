import type { RoiHistory } from "../../types/roi.types";

import EmptyState from "./EmptyState";
import styles from "./Table.module.css";

interface Props {
  data: RoiHistory[];
}

const RoiHistoryTable = ({
  data,
}: Props) => {

  if (!data.length) {
    return (
      <EmptyState
        message="No ROI records found"
      />
    );
  }

  return (
    <div className={styles.responsive}>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>ROI Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (item) => (
              <tr
                key={item._id}
              >
                <td>
                  {item
                    .investment
                    ?.planDetails ??
                    "-"}
                </td>

                <td>
                  Rs.
                  {
                    item.roiAmount
                  }
                </td>

                <td>
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td>
                  {
                    item.status
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoiHistoryTable;
