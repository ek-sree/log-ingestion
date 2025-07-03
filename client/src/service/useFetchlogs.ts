import { useEffect, useState } from "react";
import Axios from "../api/axios/axios";
import { LOG_ENDPOINTS } from "../api/endpoints/LogEndpoints";
import type { ILogData, ILogFilters } from "../types/ILogs";
import socket from "../sockets/socket";

const useFetchLogs = (filters: ILogFilters) => {
  const [logs, setLogs] = useState<ILogData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLogs = async (newPage: number) => {
    try {
      setLoading(true);
      const params = { ...filters, page: newPage, limit: 5 };

      const response = await Axios.get(`${LOG_ENDPOINTS.GET_LOGS}`, { params });
      const newLogs = response.data.data;

      if (newLogs.length === 0) {
        setHasMore(false);
      } else {
        setLogs(prev => [...prev, ...newLogs]);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

      useEffect(() => {
    socket.on("new_log", (newLog: ILogData) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    return () => {
      socket.off("new_log");
    };
  }, []);


  useEffect(() => {
    setLogs([]);
    setPage(1);
    setHasMore(true);
    fetchLogs(1);
  }, [filters]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLogs(nextPage);
    }
  };

  return { logs, error, loading, hasMore, loadMore };
};

export default useFetchLogs;
