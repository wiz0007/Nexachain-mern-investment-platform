import {
  useEffect,
  useState,
} from "react";

import {
  getDashboard,
} from "../services/dashboard.service";

import {
  getInvestments,
} from "../services/investment.service";

import {
  getRoiHistory,
} from "../services/roi.service";

import {
  getReferralIncomeHistory,
  getReferralTree,
} from "../services/referral.service";

export const useDashboardData =
  () => {

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      error,
      setError,
    ] = useState("");

    const [
      dashboard,
      setDashboard,
    ] = useState(null);

    const [
      investments,
      setInvestments,
    ] = useState([]);

    const [
      roiHistory,
      setRoiHistory,
    ] = useState([]);

    const [
      referralIncome,
      setReferralIncome,
    ] = useState([]);

    const [
      referralTree,
      setReferralTree,
    ] = useState(null);

    useEffect(() => {

      const load =
        async () => {

          try {

            const [
              dashboardData,
              investmentData,
              roiData,
              incomeData,
              treeData,
            ] =
              await Promise.all([
                getDashboard(),
                getInvestments(),
                getRoiHistory(),
                getReferralIncomeHistory(),
                getReferralTree(),
              ]);

            setDashboard(
              dashboardData
            );

            setInvestments(
              investmentData
                .investments
            );

            setRoiHistory(
              roiData.items
            );

            setReferralIncome(
              incomeData.items
            );

            setReferralTree(
              treeData
            );

          } catch {

            setError(
              "Failed to load dashboard"
            );

          } finally {

            setLoading(
              false
            );

          }
        };

      load();

    }, []);

    return {
      loading,
      error,
      dashboard,
      investments,
      roiHistory,
      referralIncome,
      referralTree,
    };
  };