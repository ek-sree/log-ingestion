export interface ILogData {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  resourceId: string;
  timestamp: string; 
  traceId: string;
  spanId: string;
  commit: string;
   metadata: {
            region:string
        } 
}

export interface ILogFilters {
  message?: string;
  level?: string;
  resourceId?: string;
  timestamp_start?: string;
  timestamp_end?: string;
}
