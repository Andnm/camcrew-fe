import React from 'react';

export default function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-900 rounded-lg p-8 mb-6 animate-pulse">
              <div className="h-8 w-2/3 bg-gray-700 rounded mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full" />
                  <div>
                    <div className="h-3 w-20 bg-gray-700 rounded mb-2" />
                    <div className="h-5 w-28 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full" />
                  <div>
                    <div className="h-3 w-20 bg-gray-700 rounded mb-2" />
                    <div className="h-4 w-40 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full" />
                  <div>
                    <div className="h-3 w-24 bg-gray-700 rounded mb-2" />
                    <div className="h-4 w-36 bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6 mb-8">
                <div className="h-4 w-56 bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-700 rounded" />
              </div>
              <div className="flex space-x-4 mb-8">
                <div className="bg-[#FF9500] h-12 rounded-lg flex-1" />
                <div className="h-12 w-40 border-2 border-[#FF9500] rounded-lg" />
              </div>
              <div className="mb-8">
                <div className="h-6 w-56 bg-gray-700 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-700 rounded" />
                  <div className="h-4 w-5/6 bg-gray-700 rounded" />
                  <div className="h-4 w-2/3 bg-gray-700 rounded" />
                  <div className="h-4 w-4/6 bg-gray-700 rounded" />
                  <div className="h-4 w-3/5 bg-gray-700 rounded" />
                </div>
              </div>
              <div>
                <div className="h-6 w-72 bg-gray-700 rounded mb-4" />
                <div className="relative bg-gray-700 rounded-lg overflow-hidden h-64" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-gray-900 rounded-lg p-6 mb-6 animate-pulse">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4" />
                <div className="h-5 w-40 bg-gray-700 rounded mx-auto" />
              </div>
              <div className="w-full h-11 bg-[#FF9500] rounded-lg mb-6" />
              <div className="space-y-4 mb-6">
                <div className="h-4 w-64 bg-gray-700 rounded" />
                <div className="h-4 w-56 bg-gray-700 rounded" />
                <div className="h-4 w-40 bg-gray-700 rounded" />
              </div>
              <div className="mb-4">
                <div className="h-4 w-40 bg-gray-700 rounded mb-3" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-24 bg-gray-700 rounded-full" />
                  <div className="h-6 w-28 bg-gray-700 rounded-full" />
                  <div className="h-6 w-20 bg-gray-700 rounded-full" />
                </div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-700 rounded mb-3" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-24 bg-gray-700 rounded-full" />
                  <div className="h-6 w-24 bg-gray-700 rounded-full" />
                  <div className="h-6 w-24 bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="h-5 w-64 bg-gray-700 rounded mb-4" />
              <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-16 h-16 bg-gray-600 rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="h-4 w-40 bg-gray-700 rounded mb-2" />
                      <div className="h-3 w-32 bg-gray-700 rounded mb-2" />
                      <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                      <div className="h-3 w-36 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-24 h-4 bg-gray-700 rounded mt-4 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
