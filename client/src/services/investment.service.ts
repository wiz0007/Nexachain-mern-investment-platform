import api from "./api";

interface InvestmentFilters {
  page?: number;
  limit?: number;
  status?: string;
}

export const getInvestments =
  async (
    filters: InvestmentFilters = {}
  ) => {

    const params =
      new URLSearchParams();

    if (filters.page) {
      params.append(
        "page",
        String(filters.page)
      );
    }

    if (filters.limit) {
      params.append(
        "limit",
        String(filters.limit)
      );
    }

    if (filters.status) {
      params.append(
        "status",
        filters.status
      );
    }

    const { data } =
      await api.get(
        `/investments?${params.toString()}`
      );

    return data.data;
  };