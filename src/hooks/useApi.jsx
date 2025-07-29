import { useState, useEffect, useCallback, useRef } from 'react';
import { LOADING_STATES, ERROR_MESSAGES } from '../utils/constants';

/**
 * Advanced hook for API data fetching with loading states, error handling, and caching
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - API state and control functions
 */
const useApi = (apiFunction, options = {}) => {
    const {
        immediate = true,
        cacheKey = null,
        cacheDuration = 5 * 60 * 1000, // 5 minutes
        onSuccess = null,
        onError = null,
        dependencies = [],
    } = options;

    // State management
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(LOADING_STATES.IDLE);

    // Refs for cleanup and caching
    const abortControllerRef = useRef(null);
    const cacheRef = useRef(new Map());

    /**
     * Check if cached data is still valid
     */
    const getCachedData = useCallback((key) => {
        if (!key) return null;

        const cached = cacheRef.current.get(key);
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > cacheDuration;
        if (isExpired) {
            cacheRef.current.delete(key);
            return null;
        }

        return cached.data;
    }, [cacheDuration]);

    /**
     * Cache data with timestamp
     */
    const setCachedData = useCallback((key, data) => {
        if (!key) return;

        cacheRef.current.set(key, {
            data,
            timestamp: Date.now(),
        });
    }, []);

    /**
     * Execute the API call
     */
    const execute = useCallback(async (...args) => {
        // Check cache first
        if (cacheKey) {
            const cachedData = getCachedData(cacheKey);
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                setError(null);
                setStatus(LOADING_STATES.SUCCESS);
                return cachedData;
            }
        }

        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            setError(null);
            setStatus(LOADING_STATES.LOADING);

            const result = await apiFunction(...args);

            // Check if request was aborted
            if (abortControllerRef.current.signal.aborted) {
                return;
            }

            setData(result);
            setLoading(false);
            setStatus(LOADING_STATES.SUCCESS);

            // Cache the result
            if (cacheKey) {
                setCachedData(cacheKey, result);
            }

            // Call success callback
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (err) {
            // Check if request was aborted
            if (abortControllerRef.current.signal.aborted) {
                return;
            }

            const errorMessage = err.message || ERROR_MESSAGES.GENERIC;

            setError(errorMessage);
            setLoading(false);
            setStatus(LOADING_STATES.ERROR);

            // Call error callback
            if (onError) {
                onError(err);
            }

            throw err;
        }
    }, [apiFunction, cacheKey, getCachedData, setCachedData, onSuccess, onError]);

    /**
     * Reset the state
     */
    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
        setStatus(LOADING_STATES.IDLE);
    }, []);

    /**
     * Refresh the data (bypass cache)
     */
    const refresh = useCallback(async (...args) => {
        if (cacheKey) {
            cacheRef.current.delete(cacheKey);
        }
        return execute(...args);
    }, [execute, cacheKey]);

    // Execute immediately if requested
    useEffect(() => {
        if (immediate) {
            execute();
        }

        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data,
        loading,
        error,
        status,
        execute,
        refresh,
        reset,
        // Computed properties
        isIdle: status === LOADING_STATES.IDLE,
        isLoading: status === LOADING_STATES.LOADING,
        isSuccess: status === LOADING_STATES.SUCCESS,
        isError: status === LOADING_STATES.ERROR,
    };
};

export default useApi;