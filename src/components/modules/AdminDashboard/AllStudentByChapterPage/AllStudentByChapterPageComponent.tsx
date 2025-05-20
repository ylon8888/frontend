'use client';
import { DataTable } from '@/components/shared/core/DataTable/DataTable';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Student = {
  id: string | number;
  enrollDate: string;
  name: string;
  email: string;
  phoneNumber: string;
  courseClass: string;
  action: string[];
};

// Sample data for the student list
const students: Student[] = [
  {
    id: 1,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 2,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 3,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 4,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 5,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 6,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 7,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
  {
    id: 8,
    enrollDate: 'March 12, 2025',
    name: 'Saifur Rahman',
    email: 'ux.saifur.info@gmail.com',
    phoneNumber: '+880 1567808747',
    courseClass: 'Class Nine, Chapter 2',
    action: ['View Details'],
  },
];

const AllStudentByChapterPageComponent = ({
  chapterId,
}: {
  chapterId: string;
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Define columns for the table
  const columns = [
    {
      header: 'Enroll Date',
      accessor: (Student: Student) => Student.enrollDate,
    },
    { header: 'Name', accessor: (Student: Student) => Student.name },
    { header: 'Email', accessor: (Student: Student) => Student.email },
    {
      header: 'Phone Number',
      accessor: (Student: Student) => Student.phoneNumber,
    },
    {
      header: 'Course Class',
      accessor: (Student: Student) => Student.courseClass,
    },
  ];

  // Handle row click
  const handleRowClick = (Student: Student) => {
    console.log('Row clicked:', Student);
  };

  // Render actions menu
  const renderActions = (Student: Student, closeMenu: () => void) => {
    return (
      <>
        <button
          onClick={() => {
            router.push(
              `/dashboard/classes/student-analytics/?studentId=${Student.id}&chapterId=${chapterId}`
            );
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
    <div>
      <DataTable
        title="Chapter 1: Cell Structure and Function Enroll Student"
        data={students}
        columns={columns}
        keyField="id"
        onRowClick={handleRowClick}
        renderActions={renderActions}
      />
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

export default AllStudentByChapterPageComponent;
