import React, { useState, useEffect, useMemo } from 'react';
import { useApi, useDebounce } from '../hooks';
import { postsApi, usersApi, photosApi } from '../api/jsonPlaceholder';
import { DATA_TYPES, DEBOUNCE_DELAYS } from '../utils/constants';
import Button from './Button';
import Card from './Card';

/**
 * Component for displaying API data with search, filtering, and pagination
 * @returns {JSX.Element} - ApiDataDisplay component
 */
const ApiDataDisplay = () => {
    // State management
    const [activeTab, setActiveTab] = useState(DATA_TYPES.POSTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // Debounce search query
    const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAYS.SEARCH);

    // API hooks for different data types
    const postsQuery = useApi(postsApi.getPaginated, {
        immediate: false,
        cacheKey: `posts-${currentPage}-${pageSize}`,
    });

    const usersQuery = useApi(usersApi.getAll, {
        immediate: false,
        cacheKey: 'users-all',
    });

    const photosQuery = useApi(photosApi.getPaginated, {
        immediate: false,
        cacheKey: `photos-${currentPage}-12`,
    });

    // Search API hooks
    const postsSearchQuery = useApi(postsApi.searchByTitle, {
        immediate: false,
        cacheKey: `posts-search-${debouncedSearchQuery}`,
    });

    const usersSearchQuery = useApi(usersApi.searchByName, {
        immediate: false,
        cacheKey: `users-search-${debouncedSearchQuery}`,
    });

    // Get current query based on active tab
    const getCurrentQuery = () => {
        switch (activeTab) {
            case DATA_TYPES.POSTS:
                return debouncedSearchQuery ? postsSearchQuery : postsQuery;
            case DATA_TYPES.USERS:
                return debouncedSearchQuery ? usersSearchQuery : usersQuery;
            case DATA_TYPES.PHOTOS:
                return photosQuery;
            default:
                return postsQuery;
        }
    };

    const currentQuery = getCurrentQuery();

    // Load data when tab changes or search query changes
    useEffect(() => {
        if (debouncedSearchQuery) {
            // Handle search
            switch (activeTab) {
                case DATA_TYPES.POSTS:
                    postsSearchQuery.execute(debouncedSearchQuery);
                    break;
                case DATA_TYPES.USERS:
                    usersSearchQuery.execute(debouncedSearchQuery);
                    break;
                default:
                    break;
            }
        } else {
            // Handle regular data loading
            switch (activeTab) {
                case DATA_TYPES.POSTS:
                    postsQuery.execute(currentPage, pageSize);
                    break;
                case DATA_TYPES.USERS:
                    usersQuery.execute();
                    break;
                case DATA_TYPES.PHOTOS:
                    photosQuery.execute(currentPage, 12);
                    break;
                default:
                    break;
            }
        }
    }, [activeTab, debouncedSearchQuery, currentPage]);

    // Reset page when changing tabs or searching
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, debouncedSearchQuery]);

    // Filter data based on search query for client-side filtering
    const filteredData = useMemo(() => {
        if (!currentQuery.data || !debouncedSearchQuery) {
            return currentQuery.data;
        }

        const query = debouncedSearchQuery.toLowerCase();

        switch (activeTab) {
            case DATA_TYPES.POSTS:
                return currentQuery.data.filter(post =>
                    post.title.toLowerCase().includes(query) ||
                    post.body.toLowerCase().includes(query)
                );
            case DATA_TYPES.USERS:
                return currentQuery.data.filter(user =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.company.name.toLowerCase().includes(query)
                );
            default:
                return currentQuery.data;
        }
    }, [currentQuery.data, debouncedSearchQuery, activeTab]);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchQuery('');
    };

    // Handle refresh
    const handleRefresh = () => {
        currentQuery.refresh();
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Render data based on type
    const renderData = () => {
        const dataToRender = filteredData || [];

        if (currentQuery.loading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
                </div>
            );
        }

        if (currentQuery.error) {
            return (
                <Card variant="bordered" className="text-center py-8">
                    <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-semibold">Error loading data</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{currentQuery.error}</p>
                    <Button variant="primary" onClick={handleRefresh}>
                        Try Again
                    </Button>
                </Card>
            );
        }

        if (!dataToRender || dataToRender.length === 0) {
            return (
                <Card variant="bordered" className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                        {debouncedSearchQuery ? 'No results found for your search.' : 'No data available.'}
                    </p>
                </Card>
            );
        }

        switch (activeTab) {
            case DATA_TYPES.POSTS:
                return (
                    <div className="grid gap-4">
                        {dataToRender.map((post) => (
                            <Card key={post.id} variant="bordered" hoverable>
                                <h3 className="font-semibold text-lg mb-2 capitalize">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                    Post #{post.id} • User #{post.userId}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {post.body}
                                </p>
                            </Card>
                        ))}
                    </div>
                );

            case DATA_TYPES.USERS:
                return (
                    <div className="grid gap-4 md:grid-cols-2">
                        {dataToRender.map((user) => (
                            <Card key={user.id} variant="bordered" hoverable>
                                <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <p>📧 {user.email}</p>
                                    <p>📞 {user.phone}</p>
                                    <p>🌐 {user.website}</p>
                                    <p>🏢 {user.company.name}</p>
                                    <p>📍 {user.address.city}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                );

            case DATA_TYPES.PHOTOS:
                return (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {dataToRender.map((photo) => (
                            <Card key={photo.id} variant="bordered" hoverable className="overflow-hidden">
                                <img
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                                    }}
                                />
                                <h3 className="font-semibold text-sm mb-1 capitalize">
                                    {photo.title}
                                </h3>
                                <p className="text-gray-500 text-xs">
                                    Album #{photo.albumId} • Photo #{photo.id}
                                </p>
                            </Card>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    const tabs = [
        { id: DATA_TYPES.POSTS, label: '📝 Posts', searchable: true },
        { id: DATA_TYPES.USERS, label: '👥 Users', searchable: true },
        { id: DATA_TYPES.PHOTOS, label: '📸 Photos', searchable: false },
    ];

    const activeTabConfig = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card title="🌐 API Data Integration" subtitle="Live data from JSONPlaceholder API">
                <div className="space-y-4">
                    {/* Tab Navigation */}
                    <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search and Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Search Input */}
                        {activeTabConfig?.searchable && (
                            <div className="flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        )}

                        {/* Refresh Button */}
                        <Button
                            variant="secondary"
                            onClick={handleRefresh}
                            disabled={currentQuery.loading}
                            className="flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </Button>
                    </div>

                    {/* Data Count */}
                    {currentQuery.data && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {filteredData?.length || 0} {activeTab}
                            {debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`}
                        </div>
                    )}
                </div>
            </Card>

            {/* Data Display */}
            <div className="min-h-[400px]">
                {renderData()}
            </div>

            {/* Pagination */}
            {!debouncedSearchQuery && (activeTab === DATA_TYPES.POSTS || activeTab === DATA_TYPES.PHOTOS) && (
                <div className="flex justify-center space-x-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || currentQuery.loading}
                    >
                        Previous
                    </Button>

                    <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage}
          </span>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentQuery.loading || (currentQuery.data && currentQuery.data.length < pageSize)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ApiDataDisplay;