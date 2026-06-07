import styles from "./Dashboard.module.css";

import { useDashboardData } from "../../hooks/useDashboardData";

import StatsGrid from "../../components/dashboard/StatsGrid";

import EarningsChart from "../../components/dashboard/EarningsChart";

import InvestmentHistoryTable from "../../components/dashboard/InvestmentHistoryTable";

import RoiHistoryTable from "../../components/dashboard/RoiHistoryTable";

import ReferralIncomeTable from "../../components/dashboard/ReferralIncomeTable";

import ReferralTree from "../../components/dashboard/ReferralTree";

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import ErrorState from "../../components/dashboard/ErrorState";

import TableWrapper from "../../components/dashboard/TableWrapper";

const Dashboard = () => {

  const {
    loading,
    error,

    dashboard,

    investments,

    roiHistory,

    referralIncome,

    referralTree,

    chartData,
  } =
    useDashboardData();

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={
          error
        }
      />
    );
  }

  return (
    <div
      className={
        styles.dashboard
      }
    >
      <h1>
        Dashboard
      </h1>

      <div className={styles.statsGrid}>
        <StatsGrid
          dashboard={
            dashboard
          }
        />
      </div>

      <TableWrapper
        title="Earnings Overview"
      >
        <EarningsChart
          data={
            chartData
          }
        />
      </TableWrapper>

      <TableWrapper
        title="Investment History"
      >
        <InvestmentHistoryTable
          data={
            investments
          }
        />
      </TableWrapper>

      <TableWrapper
        title="ROI History"
      >
        <RoiHistoryTable
          data={
            roiHistory
          }
        />
      </TableWrapper>

      <TableWrapper
        title="Referral Income History"
      >
        <ReferralIncomeTable
          data={
            referralIncome
          }
        />
      </TableWrapper>

      <TableWrapper
        title="Referral Tree"
      >
        <ReferralTree
          tree={
            referralTree
          }
        />
      </TableWrapper>
    </div>
  );
};

export default Dashboard;
