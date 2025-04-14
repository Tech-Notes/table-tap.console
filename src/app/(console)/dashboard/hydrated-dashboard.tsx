import {checkApiHealth} from '@/api/dashboard';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

const HydratedDashboard = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['healthCheckk'],
    queryFn: serverFn<any, any>(checkApiHealth, {}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to the dashboard!</p>
      </div>
    </HydrationBoundary>
  );
};
export default HydratedDashboard;
