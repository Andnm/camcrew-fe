import React from 'react';

export default function ServiceCardSkeleton() {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700">
            <div className="p-6">
                <div className="flex items-start gap-4 animate-pulse">
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-700 rounded-lg" />
                        <div className="h-4 w-24 bg-gray-700 rounded mt-2 mx-auto" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div className="h-5 w-2/3 bg-gray-700 rounded" />
                            <div className="h-6 w-28 bg-gray-700 rounded" />
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="h-4 w-1/2 bg-gray-700 rounded" />
                            <div className="h-4 w-1/3 bg-gray-700 rounded" />
                            <div className="h-4 w-16 bg-gray-700 rounded" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className="h-6 w-20 bg-gray-700 rounded-full" />
                            <div className="h-6 w-24 bg-gray-700 rounded-full" />
                            <div className="h-6 w-16 bg-gray-700 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                            <div className="h-4 w-48 bg-gray-700 rounded" />
                            <div className="h-8 w-28 bg-gray-700 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
