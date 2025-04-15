'use client'

import { checkApiHealth } from "@/api/dashboard";
import { clientFn } from "@/clientFn";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const {data} = useQuery({
      queryKey: ['healthCheckka'] as const,
      queryFn: clientFn(checkApiHealth, {}),
    });

    console.log("Dashboard: ", data)

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to the dashboard!</p>
      </div>
    );
}

export default Dashboard;