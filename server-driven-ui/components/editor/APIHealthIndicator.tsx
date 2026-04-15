"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/lib/api/client";

type HealthStatus = "checking" | "online" | "offline";

export const APIHealthIndicator = () => {
  const [status, setStatus] = useState<HealthStatus>("checking");

  const healthUrl = `${(apiClient.defaults.baseURL || "http://localhost:5001/api").replace(/\/api\/?$/, "")}/health`;

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Hit a lightweight endpoint to check API health
        const response = await fetch(healthUrl, {
          method: "GET",
          signal: AbortSignal.timeout(5000),
        });
        setStatus(response.ok ? "online" : "offline");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          setStatus("offline");
        } else {
          setStatus("offline");
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [healthUrl]);

  const statusConfig = {
    checking: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      dot: "bg-yellow-400 animate-pulse",
      text: "text-yellow-700",
      label: "Checking",
    },
    online: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
      label: "Online",
    },
    offline: {
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
      text: "text-red-700",
      label: "Offline",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bg} ${config.border}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
      <span
        className={`text-[11px] font-semibold uppercase tracking-widest ${config.text}`}
      >
        {config.label}
      </span>
    </div>
  );
};
