import {
  useEffect,
  useMemo,
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

import { buildChartData } from "../utils/chartTransform";

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
    ] = useState<any>(
      null
    );

    const [
      investments,
      setInvestments,
    ] = useState<any[]>(
      []
    );

    const [
      roiHistory,
      setRoiHistory,
    ] = useState<any[]>(
      []
    );

    const [
      referralIncome,
      setReferralIncome,
    ] = useState<any[]>(
      []
    );

    const [
      referralTree,
      setReferralTree,
    ] = useState<any>(
      null
    );

    useEffect(() => {

      const loadData =
        async () => {

          try {

            setLoading(
              true
            );

            const [
              dashboardRes,
              investmentRes,
              roiRes,
              referralIncomeRes,
              referralTreeRes,
            ] =
              await Promise.all([
                getDashboard(),
                getInvestments({
                  page: 1,
                  limit: 10,
                }),
                getRoiHistory(
                  1,
                  20
                ),
                getReferralIncomeHistory(
                  1,
                  20
                ),
                getReferralTree(),
              ]);

            setDashboard(
              dashboardRes
            );

            setInvestments(
              investmentRes
                .investments || []
            );

            setRoiHistory(
              roiRes.items || []
            );

            setReferralIncome(
              referralIncomeRes.items ||
                []
            );

            setReferralTree(
              referralTreeRes
            );

          } catch (
            error
          ) {

            console.error(
              error
            );

            setError(
              "Failed to load dashboard data"
            );

          } finally {

            setLoading(
              false
            );

          }
        };

      loadData();

    }, []);

    const chartData =
      useMemo(
        () =>
          buildChartData(
            roiHistory,
            referralIncome
          ),
        [
          roiHistory,
          referralIncome,
        ]
      );

    return {
      loading,
      error,

      dashboard,

      investments,

      roiHistory,

      referralIncome,

      referralTree,

      chartData,
    };
  };