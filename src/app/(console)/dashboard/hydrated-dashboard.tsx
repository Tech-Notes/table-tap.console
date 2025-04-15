import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import Dashboard from './dashboard';
import {checkApiHealth} from '@/api/dashboard';

const HydratedDashboard = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['healthCheckk'] as const,
    queryFn: serverFn<any, any>(checkApiHealth, {}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Dashboard />
    </HydrationBoundary>
  );
};
export default HydratedDashboard;
