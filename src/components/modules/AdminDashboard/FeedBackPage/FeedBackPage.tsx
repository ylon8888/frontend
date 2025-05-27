'use client';
import React, { useState } from 'react';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';

const FeedBackPageComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  const [dateRange, setDateRange] = useState('1 June 28 - 15 July 28');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  return (
    <div className="max-w-[1580px]">
      <div className="w-full mb-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="relative w-full md:w-auto flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center gap-2 bg-primary hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateRange}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${
                  isCalendarOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isCalendarOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 p-4">
                <div className="flex justify-between mb-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Previous
                  </button>
                  <div className="font-medium">June 2028</div>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Next
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  <div className="text-gray-500">Su</div>
                  <div className="text-gray-500">Mo</div>
                  <div className="text-gray-500">Tu</div>
                  <div className="text-gray-500">We</div>
                  <div className="text-gray-500">Th</div>
                  <div className="text-gray-500">Fr</div>
                  <div className="text-gray-500">Sa</div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 30 }, (_, i) => (
                    <button
                      key={i}
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                        i + 1 === 1
                          ? 'bg-teal-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setIsCalendarOpen(false)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(6)
          .fill(0)
          .map((_, idx: number) => (
            <FeedbackCard
              key={idx}
              rating={4}
              maxRating={5}
              feedback="The course was comprehensive and easy to follow. The hands-on projects were especially helpful, and I was able to apply the skills to real-life data problems!"
              name="Saifur Rahman"
              position="Product Manager"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
          ))}
      </div>
      <div className="p-4 w-full flex justify-center items-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          // total={getAllBlogResponse?.data?.meta?.total}
          total={20}
          onChange={handlePaginationChange}
          className="custom-pagination"
          // showSizeChanger
          // pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default FeedBackPageComponent;
