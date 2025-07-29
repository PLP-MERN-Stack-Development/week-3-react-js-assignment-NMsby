/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
};

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    PHOTOS_PAGE_SIZE: 12,
    COMMENTS_PAGE_SIZE: 20,
};

// API Endpoints
export const ENDPOINTS = {
    POSTS: '/posts',
    USERS: '/users',
    COMMENTS: '/comments',
    ALBUMS: '/albums',
    PHOTOS: '/photos',
};

// Data types for filtering and display
export const DATA_TYPES = {
    POSTS: 'posts',
    USERS: 'users',
    COMMENTS: 'comments',
    ALBUMS: 'albums',
    PHOTOS: 'photos',
};

// Loading states
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    NOT_FOUND: 'The requested data was not found.',
    TIMEOUT: 'Request timed out. Please try again.',
    GENERIC: 'An unexpected error occurred. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
    DATA_LOADED: 'Data loaded successfully',
    SEARCH_COMPLETED: 'Search completed',
    REFRESH_COMPLETED: 'Data refreshed successfully',
};

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    API_CACHE: 'api_cache',
    USER_PREFERENCES: 'user_preferences',
    SEARCH_HISTORY: 'search_history',
};

// Debounce delays (in milliseconds)
export const DEBOUNCE_DELAYS = {
    SEARCH: 300,
    RESIZE: 250,
    SCROLL: 100,
    INPUT: 200,
};

// Animation durations (in milliseconds)
export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 200,
    SLOW: 300,
    PAGE_TRANSITION: 500,
};

export default {
    API_CONFIG,
    PAGINATION,
    ENDPOINTS,
    DATA_TYPES,
    LOADING_STATES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    STORAGE_KEYS,
    DEBOUNCE_DELAYS,
    ANIMATIONS,
};