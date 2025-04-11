import React, { useState, useCallback } from "react";
import useRateLimitedFetch from "./hooks/useRateLimitedFetch";
import Card from "./components/Card";
import ChartView from "./components/ChartView";
import Switcher1 from "./components/ToggleSwitch";

const API_URL = "https://d29l1nxcqevrmo.cloudfront.net/dashboard";

export default function App() {
  const { data, error, loading } = useRateLimitedFetch(API_URL);
  const [analyticsMode, setAnalyticsMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleAnalytics = useCallback(() => {
    setAnalyticsMode((prev) => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  return (
    <div className={`min-h-screen transition-all duration-300 ${bg}`}>
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>Analytics</span>
            <Switcher1 checked={analyticsMode} onChange={toggleAnalytics} />
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full border">
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      <main className="p-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {data && (
          <>
            {analyticsMode ? (
              <ChartView data={data} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(data).map(([key, value]) => (
                  <Card key={key} title={key} value={value} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
