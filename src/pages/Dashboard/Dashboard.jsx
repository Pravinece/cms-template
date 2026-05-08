import React, { useEffect } from "react";
import { analytics } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: analytics,
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  console.log("data: ", data);

  return <div>Dashboard</div>;
}

export default Dashboard;
