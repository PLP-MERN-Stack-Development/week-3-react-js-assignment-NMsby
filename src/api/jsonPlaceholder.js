/**
 * JSONPlaceholder API client for fetching sample data
 * Provides methods for fetching posts, users, comments, albums, and photos
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
const apiRequest = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Posts API methods
 */
export const postsApi = {
    // Get all posts
    getAll: () => apiRequest('/posts'),

    // Get posts with pagination
    getPaginated: (page = 1, limit = 10) =>
        apiRequest(`/posts?_page=${page}&_limit=${limit}`),

    // Get single post by ID
    getById: (id) => apiRequest(`/posts/${id}`),

    // Get posts by user ID
    getByUserId: (userId) => apiRequest(`/posts?userId=${userId}`),

    // Search posts by title
    searchByTitle: (query) => apiRequest(`/posts?title_like=${query}`),
};

/**
 * Users API methods
 */
export const usersApi = {
    // Get all users
    getAll: () => apiRequest('/users'),

    // Get user by ID
    getById: (id) => apiRequest(`/users/${id}`),

    // Search users by name
    searchByName: (query) => apiRequest(`/users?name_like=${query}`),
};

/**
 * Comments API methods
 */
export const commentsApi = {
    // Get all comments
    getAll: () => apiRequest('/comments'),

    // Get comments by post ID
    getByPostId: (postId) => apiRequest(`/comments?postId=${postId}`),

    // Get comments with pagination
    getPaginated: (page = 1, limit = 10) =>
        apiRequest(`/comments?_page=${page}&_limit=${limit}`),
};

/**
 * Albums API methods
 */
export const albumsApi = {
    // Get all albums
    getAll: () => apiRequest('/albums'),

    // Get albums by user ID
    getByUserId: (userId) => apiRequest(`/albums?userId=${userId}`),

    // Get album by ID
    getById: (id) => apiRequest(`/albums/${id}`),
};

/**
 * Photos API methods
 */
export const photosApi = {
    // Get all photos (use with caution - 5000 items)
    getAll: () => apiRequest('/photos'),

    // Get photos with pagination
    getPaginated: (page = 1, limit = 12) =>
        apiRequest(`/photos?_page=${page}&_limit=${limit}`),

    // Get photos by album ID
    getByAlbumId: (albumId) => apiRequest(`/photos?albumId=${albumId}`),

    // Get photo by ID
    getById: (id) => apiRequest(`/photos/${id}`),
};

/**
 * Combined API object for easy imports
 */
const jsonPlaceholderApi = {
    posts: postsApi,
    users: usersApi,
    comments: commentsApi,
    albums: albumsApi,
    photos: photosApi,
};

export default jsonPlaceholderApi;