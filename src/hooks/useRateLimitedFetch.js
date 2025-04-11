import { useState, useEffect } from "react";
import axios from "axios";

const MAX_HITS = 20;
const WINDOW_TIME = 120000;

let hitQueue = [];

export default function useRateLimitedFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = Date.now();
    hitQueue = hitQueue.filter((time) => now - time < WINDOW_TIME);

    if (hitQueue.length < MAX_HITS) {
      hitQueue.push(now);
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setError("");
        })
        .catch((err) => {
          setError("Failed to fetch data.");
        })
        .finally(() => setLoading(false));
    } else {
      setError("Rate limit exceeded. Please wait.");
      setLoading(false);
    }
  }, [url]);

  return { data, error, loading };
}
