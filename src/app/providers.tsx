import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className: '!rounded-2xl !border-sand !bg-white !font-[family-name:var(--font-body)] !text-midnight',
          }}
        />
      </MotionConfig>
    </QueryClientProvider>
  );
}
