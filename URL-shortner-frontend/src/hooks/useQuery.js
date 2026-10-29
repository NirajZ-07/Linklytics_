import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls", token],

    queryFn: async () => {
      return await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },

    select: (data) => {
      const sortedData = [...(data.data ?? [])].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      );
      return sortedData;
    },

    staleTime: 5000,
    enabled: Boolean(token),
  });
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick", token],

    queryFn: async () => {
      return await api.get(
        "/api/urls/totalClicks?startDate=2026-01-01&endDate=2031-12-31",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },

    select: (response) => {
      const clicksByDate = response.data ?? {};

      return Object.keys(clicksByDate).map((key) => ({
        clickDate: key,
        count: clicksByDate[key],
      }));
    },

    // React Query v5: use onError handling in the calling component
    staleTime: 5000,
    enabled: Boolean(token),
  });
};
