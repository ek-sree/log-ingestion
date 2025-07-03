import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Bug, 
  Server,
  Hash,
  GitCommit,
  Clock,
  Database,
} from 'lucide-react';


const levelConfig = {
  error: { 
    color: 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-900',
    badge: 'bg-red-500 text-white',
    icon: AlertCircle
  },
  warn: { 
    color: 'border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900',
    badge: 'bg-amber-500 text-white',
    icon: AlertTriangle
  },
  info: { 
    color: 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900',
    badge: 'bg-blue-500 text-white',
    icon: Info
  },
  debug: { 
    color: 'border-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900',
    badge: 'bg-gray-500 text-white',
    icon: Bug
  },
};


const LogItem = ({ log }) => {
  const config = levelConfig[log.level];
  const IconComponent = config.icon;
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

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