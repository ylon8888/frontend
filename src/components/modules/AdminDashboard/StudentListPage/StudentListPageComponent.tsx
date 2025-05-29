'use client';
import { DataTable } from '@/components/shared/core/DataTable/DataTable';
import Loading from '@/components/ui/core/Loading/Loading';
import { useGetAllStudentQuery } from '@/redux/features/student/student.api';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

// Sample data for the student list
// const students: Student[] = [
//   {
//     id: 1,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 2,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 3,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 4,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 5,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 6,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 7,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
//   {
//     id: 8,
//     enrollDate: 'March 12, 2025',
//     name: 'Saifur Rahman',
//     email: 'ux.saifur.info@gmail.com',
//     phoneNumber: '+880 1567808747',
//     courseClass: 'Class Nine, Chapter 2',
//     action: ['View Details'],
//   },
// ];

const StudentListPageComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
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

export default StudentListPageComponent;
