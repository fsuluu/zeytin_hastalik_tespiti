export interface AnalysisResult {
  isOlivePlant: boolean;
  isHealthy: boolean;
  diseaseName: string | null;
  confidenceScore: number;
  description: string;
  treatmentSuggestions: string[];
}

export enum UploadStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
