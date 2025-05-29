'use client';
import { DataTable } from '@/components/shared/core/DataTable/DataTable';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Stats from './Stats/Stats';
import LineChart from './LineChart/LineChart';
import { Pagination } from 'antd';
import OverallGraph from './OverallGraph/OverallGraph';
import { useGetAllStudentQuery } from '@/redux/features/student/student.api';
import Loading from '@/components/ui/core/Loading/Loading';

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  _count: {
    courseEnrolls: number;
  };
};

const DashboardRootPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  const [objectQuery, setObjectQuery] = useState([
    {
      name: 'page',
      value: page,
    },
    {
      name: 'limit',
      value: pageSize,
    },
  ]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

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

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllStudentQuery(objectQuery);

  const studentList: Student[] = response?.data?.data || [];

  if (isLoading || isFetching) return <Loading />;

  // Define columns for the table
  const columns = [
    // {
    //   header: 'Enroll Date',
    //   accessor: (Student: Student) => Student.enrollDate,
    // },
    {
      header: 'Name',
      accessor: (Student: Student) =>
        Student.firstName + '  ' + Student.lastName,
    },
    { header: 'Email', accessor: (Student: Student) => Student.email },
    {
      header: 'Phone Number',
      accessor: (Student: Student) => Student.phoneNumber ?? 'N/A',
    },
    {
      header: 'Total Course Enroll',
      accessor: (Student: Student) => Student._count?.courseEnrolls,
    },
  ];

  // Handle row click
  const handleRowClick = (student: Student) => {
    console.log('Row clicked:', student);
  };

  // Render actions menu
  const renderActions = (student: Student, closeMenu: () => void) => {
    return (
      <>
        <button
          onClick={() => {
            router.push(`/dashboard/student-list/${student?.id}`);
            closeMenu();
          }}
          className="block w-20 cursor-pointer text-left underline text-sm text-secondary"
        >
          View Details
        </button>
      </>
    );
  };

  return (
    <div className="max-w-[1580px] space-y-8">
      <Stats />
      <div className="my-12 flex flex-col md:flex-row w-full gap-8">
        <div className="w-full md:w-[60%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          <LineChart />
        </div>
        <div className="w-full md:w-[40%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          <OverallGraph />
        </div>
      </div>
      <DataTable
        title="Student List"
        data={studentList}
        columns={columns}
        keyField="id"
        onRowClick={handleRowClick}
        renderActions={renderActions}
      />
      <div className="p-4 w-full flex justify-center items-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={response?.data?.meta?.total}
          // total={20}
          onChange={handlePaginationChange}
          className="custom-pagination"
          // showSizeChanger
          // pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default DashboardRootPage;
