import { useEffect, useRef, useState } from "react";
import FilterBar from "./FilterBar";
import LogItem from "./Logitem";
import { Search } from "lucide-react";
import type { ILogFilters } from "../types/ILogs";
import Loader from "../common/ui/Loader";
import ErrorPage from "../common/ui/ErrorPage";
import useFetchLogs from "../service/useFetchlogs";

const LogViewer = () => {
  const [filters, setFilters] = useState<ILogFilters>({});
  const {
    logs,
    error,
    loading,
    hasMore,
    loadMore,
  } = useFetchLogs(filters);

  const observerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      {
        rootMargin: "100px", // load earlier when user is near the bottom of the page.
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loadMore]);

  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Log Viewer</h1>
          <p className="text-gray-600">
            Monitor and analyze your application logs in real-time
          </p>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Logs ({logs.length})
            </h2>
          </div>

          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <LogItem key={`${log.traceId}-${index}`} log={log} />
              ))
            ) : !loading ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No logs match your current filters
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : null}

            {loading && <Loader />}

            {/* Observer div for infinite scroll . Here user reach here it will then call load more function. */}
            <div ref={observerRef} className="h-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
