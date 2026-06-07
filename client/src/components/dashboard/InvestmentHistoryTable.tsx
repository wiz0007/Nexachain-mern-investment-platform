import type { Investment } from "../../types/investment.types";

import EmptyState from "./EmptyState";

import styles from "./Table.module.css";

interface Props {
  data: Investment[];
}

const InvestmentHistoryTable = ({
  data,
}: Props) => {

  if (!data.length) {
    return (
      <EmptyState
        message="No investments found"
      />
    );
  }

  return (
    <div className={styles.responsive}>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Plan</th>
            <th>Start</th>
            <th>End</th>
            <th>ROI %</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (investment) => (
              <tr
                key={
                  investment._id
                }
              >
                <td>
                  Rs.
                  {
                    investment.investmentAmount
                  }
                </td>

                <td>
                  {
                    investment.planDetails
                  }
                </td>

                <td>
                  {new Date(
                    investment.startDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {new Date(
                    investment.endDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {
                    investment.dailyROIPercentage
                  }
                  %
                </td>

                <td>
                  {
                    investment.status
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

export default InvestmentHistoryTable;
