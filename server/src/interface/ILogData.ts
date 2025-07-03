export interface LogDatas{
        level: string,
        message: string,
        resourceId: string,
        timestamp: Date,
        traceId: string,
        spanId: string,
        commit: string,
        metadata: {
            region:string
        }
}

export interface FilterParams {
  message: string;
  level: string;
  resourceId: string;
  timestamp_start: string;
  timestamp_end: string;
  page: number;
  limit: number;
}