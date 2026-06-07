import type { RoiHistory } from "../types/roi.types";

import type { ReferralIncome } from "../types/referral.types";

export const buildChartData =
  (
    roiData: RoiHistory[],
    levelData: ReferralIncome[]
  ) => {

    const map =
      new Map<
        string,
        {
          date: string;

          roi: number;

          levelIncome: number;
        }
      >();

    roiData.forEach(
      (item) => {
        const date =
          new Date(
            item.date
          ).toLocaleDateString();

        if (
          !map.has(
            date
          )
        ) {
          map.set(
            date,
            {
              date,
              roi: 0,
              levelIncome: 0,
            }
          );
        }

        map.get(
          date
        )!.roi +=
          item.roiAmount;
      }
    );

    levelData.forEach(
      (item) => {
        const date =
          new Date(
            item.date
          ).toLocaleDateString();

        if (
          !map.has(
            date
          )
        ) {
          map.set(
            date,
            {
              date,
              roi: 0,
              levelIncome: 0,
            }
          );
        }

        map.get(
          date
        )!.levelIncome +=
          item.incomeAmount;
      }
    );

    return Array.from(
      map.values()
    );
  };