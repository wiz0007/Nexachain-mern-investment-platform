import api from "./api";

export const getRoiHistory =
  async (
    page = 1,
    limit = 10
  ) => {

    const { data } =
      await api.get(
        `/roi-history?page=${page}&limit=${limit}`
      );

    return data.data;
  };