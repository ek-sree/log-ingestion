import { Calendar, Filter, Search, Server, Trash2 } from "lucide-react";
import type { ILogFilters } from "../types/ILogs";
import { useEffect, useState } from "react";
import useDebounce from "../Hooks/useDebounce";

interface FilterBarProps {
  filters: ILogFilters;
  setFilters: React.Dispatch<React.SetStateAction<ILogFilters>>;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [messageInput, setMessageInput] = useState(filters.message || "");
  const [resourceIdInput, setResourceIdInput] = useState(filters.resourceId || "");

  const debouncedMessage = useDebounce(messageInput, 500); // custom hook to delat the search like message and resourceId (debounce hook)
  const debouncedResourceId = useDebounce(resourceIdInput, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "message") {
      setMessageInput(value);
    } else if (name === "resourceId") {
      setResourceIdInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      message: debouncedMessage.trim() !== "" ? debouncedMessage : undefined,
    }));
  }, [debouncedMessage, setFilters]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      resourceId: debouncedResourceId.trim() !== "" ? debouncedResourceId : undefined,
    }));
  }, [debouncedResourceId, setFilters]);

  const clearFilters = () => {
    setMessageInput("");
    setResourceIdInput("");
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filter Logs</h3>
        {hasActiveFilters && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* message input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="message"
            placeholder="Search messages..."
            value={messageInput}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Level dropdown */}
        <div className="relative">
          <select
            name="level"
            value={filters.level || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
          >
            <option value="">All Levels</option>
            <option value="error">🔴 Error</option>
            <option value="warn">🟡 Warning</option>
            <option value="info">🔵 Info</option>
            <option value="debug">⚫ Debug</option>
          </select>
        </div>

        {/*  resourceId input */}
        <div className="relative">
          <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="resourceId"
            placeholder="Resource ID..."
            value={resourceIdInput}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Start timestamp */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="datetime-local"
            name="timestamp_start"
            value={filters.timestamp_start || ""}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* End timestamp */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="datetime-local"
            name="timestamp_end"
            value={filters.timestamp_end || ""}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Clear filters button */}
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
