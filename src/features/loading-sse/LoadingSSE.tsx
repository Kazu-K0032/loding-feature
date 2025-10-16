"use client";

import React from 'react';
import { Progress, Card, Typography, Button, Space, Alert } from 'antd';
import { PlayCircleOutlined, StopOutlined, ReloadOutlined } from '@ant-design/icons';
import useLoadingProgress from './useLoadingProgress';
import { LoadingStage } from './LoadingSSE.types';

const { Title, Text } = Typography;

interface LoadingSSEProps {
  onComplete?: () => void;
}

/**
 * SSEを使用したローディング画面コンポーネント
 * @param onComplete 処理完了時のコールバック
 */
export default function LoadingSSE({ onComplete }: LoadingSSEProps) {
  const {
    currentProgress,
    isRunning,
    startDummyProcess,
    stopDummyProcess,
  } = useLoadingProgress();

  /**
   * 処理開始ハンドラー
   */
  const handleStart = () => {
    startDummyProcess();
  };

  /**
   * 処理停止ハンドラー
   */
  const handleStop = () => {
    stopDummyProcess();
  };

  /**
   * 段階名を日本語に変換
   * @param stage ローディング段階
   * @returns 日本語の段階名
   */
  const getStageDisplayName = (stage: LoadingStage): string => {
    const stageNames: Record<LoadingStage, string> = {
      initializing: '初期化',
      processing_data: 'データ処理',
      validating: '検証',
      generating_report: 'レポート生成',
      finalizing: '最終処理',
      completed: '完了',
    };
    return stageNames[stage] || stage;
  };

  /**
   * 段階に応じた色を取得
   * @param stage ローディング段階
   * @returns 段階に対応する色
   */
  const getStageColor = (stage: LoadingStage): string => {
    const stageColors: Record<LoadingStage, string> = {
      initializing: '#1890ff',
      processing_data: '#52c41a',
      validating: '#faad14',
      generating_report: '#722ed1',
      finalizing: '#13c2c2',
      completed: '#52c41a',
    };
    return stageColors[stage] || '#1890ff';
  };

  return (
    <Card
      title="SSE ローディング画面"
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* コントロールボタン */}
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleStart}
            disabled={isRunning}
          >
            処理開始
          </Button>
          <Button
            icon={<StopOutlined />}
            onClick={handleStop}
            disabled={!isRunning}
          >
            停止
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              stopDummyProcess();
              setTimeout(handleStart, 100);
            }}
          >
            リセット
          </Button>
        </Space>

        {/* 進捗表示 */}
        {currentProgress && (
          <div>
            <Title level={4} style={{ marginBottom: 16 }}>
              {getStageDisplayName(currentProgress.stage)}
            </Title>

            <Progress
              percent={currentProgress.percentage}
              strokeColor={getStageColor(currentProgress.stage)}
              status={currentProgress.stage === 'completed' ? 'success' : 'active'}
              style={{ marginBottom: 16 }}
            />

            <Text type="secondary" style={{ fontSize: '14px' }}>
              {currentProgress.message}
            </Text>

            {currentProgress.stage === 'completed' && (
              <Alert
                message="処理が完了しました"
                type="success"
                style={{ marginTop: 16 }}
                showIcon
                afterClose={() => onComplete?.()}
              />
            )}
          </div>
        )}

        {/* 状態表示 */}
        {!currentProgress && !isRunning && (
          <Alert
            message="処理を開始するには「処理開始」ボタンをクリックしてください"
            type="info"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
}
