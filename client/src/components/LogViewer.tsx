import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";
import LogItem from "./Logitem";
import { Search } from "lucide-react";
import useFetchLogs from "../service/useFetchlogs";
import type { ILogFilters } from "../types/ILogs";


const LogViewer = () => {
  const [filters, setFilters] = useState<ILogFilters>({});

  const {error,loading,logs} = useFetchLogs()

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Message filter
      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) {
        return false;
      }
      
      // Level filter
      if (filters.level && log.level !== filters.level) {
        return false;
      }
      
      // Resource ID filter
      if (filters.resourceId && !log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())) {
        return false;
      }
      
      // Timestamp filters
      if (filters.timestamp_start) {
        const startDate = new Date(filters.timestamp_start);
        const logDate = new Date(log.timestamp);
        if (logDate < startDate) return false;
      }
      
      if (filters.timestamp_end) {
        const endDate = new Date(filters.timestamp_end);
        const logDate = new Date(log.timestamp);
        if (logDate > endDate) return false;
      }
      
      return true;
    });
  }, [filters,logs]);


  if(error){
    return(
      <div>
        Error: {error}
      </div>
    )
  }
  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Log Viewer</h1>
          <p className="text-gray-600">Monitor and analyze your application logs in real-time</p>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Logs ({filteredLogs.length})
            </h2>
            {filteredLogs.length !== logs.length && (
              <span className="text-sm text-gray-500">
                Showing {filteredLogs.length} of {logs.length} logs
              </span>
            )}
          </div>

          <div className="space-y-4">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <LogItem key={`${log.traceId}-${index}`} log={log} />
              ))
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No logs match your current filters</p>
                <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;