/**
 * ローディング処理の段階
 */
export type LoadingStage =
  | 'initializing'
  | 'processing_data'
  | 'validating'
  | 'generating_report'
  | 'finalizing'
  | 'completed';

/**
 * ローディング進捗情報
 */
export interface LoadingProgress {
  stage: LoadingStage;
  percentage: number;
  message: string;
  timestamp: number;
}

/**
 * ダミー処理の設定
 */
export interface DummyProcessConfig {
  stage: LoadingStage;
  duration: number;
  message: string;
  percentage: number;
}
