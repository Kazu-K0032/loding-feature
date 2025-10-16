import { LoadingSSE } from '@/features/loading-sse';

/**
 * SSE ローディング画面のページコンポーネント
 * 検証用のページとして実装
 */
export default function LoadingSSEPage() {
  return (
    <div style={{ padding: '24px' }}>
      <LoadingSSE />
    </div>
  );
}
