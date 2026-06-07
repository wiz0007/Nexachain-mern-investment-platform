import api from "./api";

export const getDirectReferrals =
  async () => {

    const { data } =
      await api.get(
        "/referrals/direct"
      );

    return data.data;
  };

  export const getReferralTree =
  async () => {

    const { data } =
      await api.get(
        "/referrals/tree"
      );

    return data.data;
  };

  export const getReferralIncomeHistory =
  async (
    page = 1,
    limit = 10
  ) => {

    const { data } =
      await api.get(
        `/referral-income-history?page=${page}&limit=${limit}`
      );

    return data.data;
  };