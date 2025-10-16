"use client";

import { useState, useEffect, useCallback } from 'react';
import { LoadingProgress, DummyProcessConfig } from './LoadingSSE.types';

/**
 * ダミー処理の設定
 */
const DUMMY_PROCESSES: DummyProcessConfig[] = [
  {
    stage: 'initializing',
    duration: 1000,
    message: 'システムを初期化しています...',
    percentage: 10,
  },
  {
    stage: 'processing_data',
    duration: 2000,
    message: 'データを処理しています...',
    percentage: 30,
  },
  {
    stage: 'validating',
    duration: 1500,
    message: 'データを検証しています...',
    percentage: 60,
  },
  {
    stage: 'generating_report',
    duration: 2500,
    message: 'レポートを生成しています...',
    percentage: 85,
  },
  {
    stage: 'finalizing',
    duration: 1000,
    message: '処理を完了しています...',
    percentage: 100,
  },
];

/**
 * ローディング進捗を管理するカスタムフック
 * @returns ローディング進捗の状態と制御関数
 */
export default function useLoadingProgress() {
  /** 現在の進捗状況 */
  const [currentProgress, setCurrentProgress] = useState<LoadingProgress | null>(null);
  /** 処理が実行中かどうか(実行中: true, 停止中: false)  */
  const [isRunning, setIsRunning] = useState(false);
  /** 現在の段階(0: 初期化, 1: データ処理, 2: 検証, 3: レポート生成, 4: 最終処理, 5: 完了) */
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  /**
   * 処理を開始する
   */
  const startDummyProcess = useCallback(() => {
    setIsRunning(true);
    setCurrentStageIndex(0);
    setCurrentProgress(null);
  }, []);

  /**
   * ダミー処理を停止する
   */
  const stopDummyProcess = useCallback(() => {
    setIsRunning(false);
    setCurrentStageIndex(0);
    setCurrentProgress(null);
  }, []);

  /**
   * 次の段階に進む
   */
  const nextStage = useCallback(() => {
    if (currentStageIndex < DUMMY_PROCESSES.length) {
      const config = DUMMY_PROCESSES[currentStageIndex];
      const progress: LoadingProgress = {
        stage: config.stage,
        percentage: config.percentage,
        message: config.message,
        timestamp: Date.now(),
      };

      setCurrentProgress(progress);
      setCurrentStageIndex(prev => prev + 1);
    } else {
      // 全ての段階が完了
      setIsRunning(false);
      setCurrentProgress({
        stage: 'completed',
        percentage: 100,
        message: '処理が完了しました',
        timestamp: Date.now(),
      });
    }
  }, [currentStageIndex]);

  /**
   * ダミー処理の実行
   */
  useEffect(() => {
    // 処理が実行中でないか、全ての段階が完了している場合は処理を停止する
    if (!isRunning || currentStageIndex >= DUMMY_PROCESSES.length) {
      return;
    }

    // 現在の段階の設定を取得
    const config = DUMMY_PROCESSES[currentStageIndex];
    const progress: LoadingProgress = {
      stage: config.stage,
      percentage: config.percentage,
      message: config.message,
      timestamp: Date.now(),
    };

    // 現在の進捗状況を更新
    setCurrentProgress(progress);

    // 現在の段階の処理時間を設定
    const timer = setTimeout(() => {
      // 次の段階に進む
      nextStage();
    }, config.duration);

    // タイムアウト時にタイマーをクリア
    return () => clearTimeout(timer);
  }, [isRunning, currentStageIndex, nextStage]);

  return {
    currentProgress,
    isRunning,
    startDummyProcess,
    stopDummyProcess,
    nextStage,
  };
}
