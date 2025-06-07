export interface metricsInterceptor {
  timestamp: number;
  startCpuUser: number;
  startCpuSystem: number;
  startMem: number;
  endCpuUser: number;
  endCpuSystem: number;
  endMem: number;
  duration: number;
  operationType: string;
  operation: string;
  status: string;
}

export interface metricsExporter {
  timestamp: string;
  cpuUser: string;
  cpuSystem: string;
  mem: string;
}