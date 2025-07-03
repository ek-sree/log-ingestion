import { useEffect, useState } from "react";
import Axios from "../api/axios/axios";
import { LOG_ENDPOINTS } from "../api/endpoints/LogEndpoints";
import type { ILogData, ILogFilters } from "../types/ILogs";
import socket from "../sockets/socket";

const LIMIT = 5;

const useFetchLogs = (filters: ILogFilters) => {
  const [logs, setLogs] = useState<ILogData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLogs = async (newPage: number, reset = false) => {
    try {
      setLoading(true);
      const params = { ...filters, page: newPage, limit: LIMIT };

      const response = await Axios.get(`${LOG_ENDPOINTS.GET_LOGS}`, { params });
      const newLogs = response.data.data;

      if (reset) {
        setLogs(newLogs);
      } else {
        setLogs(prev => [...prev, ...newLogs]);
      }

      setPage(newPage);

      // Checking if more data is available
      if (newLogs.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  //  socket real time updates
  useEffect(() => {
    socket.on("new_log", (newLog: ILogData) => {
      setLogs(prev => [newLog, ...prev]);
    });

    return () => {
      socket.off("new_log");
    };
  }, []);

  // Refetch when filters change
  useEffect(() => {
    const resetAndFetch = async () => {
      setHasMore(true);
      await fetchLogs(1, true);
    };
    resetAndFetch();
  }, [filters]);

  // Load more logs for thenext page
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchLogs(page + 1);
    }
  };

  return { logs, error, loading, hasMore, loadMore };
};

export default useFetchLogs;
