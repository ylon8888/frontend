'use client';
import React, { useEffect, useState } from 'react';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import { DatePicker, DatePickerProps, Empty, Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetAllFeedbackQuery } from '@/redux/features/feedback/feedback.admin.api';
import Loading from '@/components/ui/core/Loading/Loading';

type Review = {
  rating: number;
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    studentProfiles: {
      profileImage: string | null;
    };
  };
};

const FeedBackPageComponent = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState<{ name: string; value: any }[]>(
    []
  );

  const [objectQuery, setObjectQuery] = useState<any[]>([
    {
      name: 'page',
      value: page,
    },
    {
      name: 'limit',
      value: pageSize,
    },
  ]);

  useEffect(() => {
    setObjectQuery([
      {
        name: 'page',
        value: page,
      },
      {
        name: 'limit',
        value: pageSize,
      },
    ]);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
    if (searchTerm !== '') {
      setObjectQuery([
        {
          name: 'page',
          value: page,
        },
        {
          name: 'limit',
          value: pageSize,
        },
        {
          name: 'searchTerm',
          value: searchTerm,
        },
      ]);
    }
  }, [searchTerm]);
  useEffect(() => {
    setPage(1);
    if (searchDate) {
      const baseQuery = [
        {
          name: 'page',
          value: page,
        },
        {
          name: 'limit',
          value: pageSize,
        },
        ...searchDate,
      ];
      if (searchTerm) {
        baseQuery.push({
          name: 'searchTerm',
          value: searchTerm,
        });
      }
      setObjectQuery(baseQuery);
    }
  }, [searchDate]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllFeedbackQuery(objectQuery);

  const feedbacks: Review[] = response?.data?.data || [];

  if (isLoading) return <Loading />;

  const onChange: DatePickerProps['onChange'] = (date, _dateString) => {
    if (date) {
      const formattedDate = date.format('DD-MM-YYYY');
      setSearchDate([{ name: 'date', value: formattedDate }]);
    } else {
      setSearchDate([]);
    }
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="w-full md:basis-2/5">
            <DatePicker
              style={{
                width: '100%',
                color: '#5b5454',
                padding: '7px',
                borderRadius: '8px',
              }}
              placeholder="Search Order by Date"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isFetching
          ? Array.from({ length: pageSize }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow animate-pulse border border-gray-200 h-[240px] w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="flex-1 mt-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))
          : feedbacks?.map((feedback: Review, idx: number) => (
              <FeedbackCard
                key={idx}
                rating={feedback?.rating}
                maxRating={5}
                feedback={feedback?.message}
                name={
                  feedback?.user?.firstName + ' ' + feedback?.user?.lastName
                }
                position="Student"
                avatarUrl={feedback?.user?.studentProfiles?.profileImage}
              />
            ))}
      </div>
      {!isLoading && !isFetching && feedbacks?.length === 0 && (
        <Empty description="No Feedback Found" />
      )}
      <div className="p-4 w-full flex justify-center items-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          // total={20}
          total={response?.data?.meta?.total}
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
