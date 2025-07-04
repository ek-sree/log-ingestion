import { 
  Server,
  Hash,
  GitCommit,
  Clock,
  Database,
} from 'lucide-react';
import type { ILogData } from '../types/ILogs';
import { levelConfig } from '../constant/data';
import { formatTimestamp } from '../utils/formateTimestamp';

interface LogItemProps {
  log: ILogData;
}


const LogItem = ({ log }:LogItemProps) => {
  const config = levelConfig[log.level];
  const IconComponent = config.icon;
  
 
  return (
    <div className={`relative overflow-hidden rounded-xl border-l-4 ${config.color} p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.01]`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${config.badge}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.badge} uppercase tracking-wider`}>
              {log.level}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          {formatTimestamp(log.timestamp)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium text-gray-800 mb-2">{log.message}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Resource</p>
            <p className="font-mono text-gray-800">{log.resourceId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Trace ID</p>
            <p className="font-mono text-gray-800">{log.traceId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Span ID</p>
            <p className="font-mono text-gray-800">{log.spanId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Commit</p>
            <p className="font-mono text-gray-800">{log.commit}</p>
          </div>
        </div>
      </div>

      {log.metadata && Object.keys(log.metadata).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-gray-500" />
            <p className="text-gray-500 text-xs font-medium">Metadata</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <pre className="text-xs text-gray-700 font-mono overflow-x-auto">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogItem