import {
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

import {
  MdAccountBalance,
} from "react-icons/md";

import DashboardCard from "./DashboardCard";

const StatsGrid = ({
  dashboard,
}: any) => {
  return (
    <>
      <DashboardCard
        title="Total Investments"
        value={
          dashboard.totalInvestments
        }
        helper="All investments"
        icon={<MdAccountBalance />}
      />

      <DashboardCard
        title="Daily ROI"
        value={`Rs.${dashboard.dailyRoi ?? 0}`}
        helper="Credited today"
        icon={<FaChartLine />}
      />

      <DashboardCard
        title="Level Income"
        value={`Rs.${dashboard.totalLevelIncomeEarned}`}
        helper="Referral earnings"
        icon={<FaChartLine />}
      />

      <DashboardCard
        title="Wallet"
        value={`Rs.${dashboard.walletBalance}`}
        helper="Available balance"
        icon={<FaWallet />}
      />
    </>
  );
};

export default StatsGrid;
