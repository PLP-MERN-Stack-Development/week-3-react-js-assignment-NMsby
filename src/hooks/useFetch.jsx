import { useState, useEffect, useRef } from 'react';

/**
 * Simple fetch hook for quick API calls
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Object} - Fetch state
 */
const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ref to track if component is mounted
    const mountedRef = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    ...options,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                // Only update state if component is still mounted
                if (mountedRef.current) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (mountedRef.current) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            mountedRef.current = false;
        };
    }, [url, JSON.stringify(options)]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return { data, loading, error };
};

export default useFetch;