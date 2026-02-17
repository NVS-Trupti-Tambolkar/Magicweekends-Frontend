import React from 'react';

/**
 * Reusable Loading Spinner Component
 * 
 * Variants:
 * - "page"    → Full page loader with backdrop (for initial page/component loads)
 * - "overlay" → Overlay on top of content (for CRUD operations)
 * - "inline"  → Small inline spinner (for buttons, small sections)
 * - "skeleton"→ Skeleton shimmer cards (for card grid loading)
 */

// ─── Full Page Loader ──────────────────────────────────────────
export const PageLoader = ({ message = 'Loading...' }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 rounded-full border-4 border-yellow-200 animate-spin border-t-yellow-500"></div>
            {/* Inner pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
        </div>
        <p className="mt-6 text-gray-600 font-medium text-sm sm:text-base animate-pulse">{message}</p>
    </div>
);

// ─── Overlay Loader (for CRUD operations) ──────────────────────
export const OverlayLoader = ({ message = 'Processing...' }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-[200]">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 animate-fadeIn">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-yellow-200 animate-spin border-t-yellow-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
            </div>
            <p className="text-gray-700 font-semibold text-sm">{message}</p>
        </div>
    </div>
);

// ─── Inline Spinner (for buttons / small sections) ─────────────
export const InlineSpinner = ({ size = 'md', color = 'yellow' }) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
    };
    const colors = {
        yellow: 'border-yellow-200 border-t-yellow-500',
        white: 'border-white/30 border-t-white',
        gray: 'border-gray-200 border-t-gray-500',
    };
    return (
        <div className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`}></div>
    );
};

// ─── Skeleton Card (for grid/card loading) ─────────────────────
export const SkeletonCard = () => (
    <div className="bg-white shadow-md overflow-hidden animate-pulse">
        {/* Image placeholder */}
        <div className="relative" style={{ paddingTop: '66.67%' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer"></div>
        </div>
        {/* Content placeholder */}
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
);

// ─── Skeleton Grid (multiple cards) ────────────────────────────
export const SkeletonGrid = ({ count = 3, cols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' }) => (
    <div className={`grid ${cols} gap-4 sm:gap-6`}>
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);

// ─── Button with loading state ─────────────────────────────────
export const LoadingButton = ({ loading, children, className = '', ...props }) => (
    <button
        className={`${className} ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
        disabled={loading}
        {...props}
    >
        {loading ? (
            <span className="flex items-center justify-center gap-2">
                <InlineSpinner size="sm" color="white" />
                <span>Processing...</span>
            </span>
        ) : children}
    </button>
);

export default { PageLoader, OverlayLoader, InlineSpinner, SkeletonCard, SkeletonGrid, LoadingButton };
