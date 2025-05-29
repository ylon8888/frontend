'use client';
import { DataTable } from '@/components/shared/core/DataTable/DataTable';
import Loading from '@/components/ui/core/Loading/Loading';
import { useGetAllStudentByChapterQuery } from '@/redux/features/chapter/chapter.admin.api';
import { Chapter, CourseEnroll } from '@/types/StudentByChapter';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Sample data for the student list
const students: any[] = [
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
  } = useGetAllStudentByChapterQuery({
    objectQuery,
    chapterId,
  });

  const data: Chapter = response?.data?.data[0] || {};
  const students: CourseEnroll[] = data?.subject?.courseEnrolls || [];

  // Define columns for the table
  const columns = [
    {
      header: 'Enroll Date',
      accessor: (student: CourseEnroll) => {
        const dateStr = student.createdAt;
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        };
        // Format: Mon25 Jun, 2025
        const parts = date
          .toLocaleDateString('en-US', options)
          .replace(',', '')
          .split(' ');
        // parts: [Mon, 06, Jun, 2025]
        if (parts.length < 4) return dateStr;
        return `${parts[0]}${parts[1]} ${parts[2]}, ${parts[3]}`;
      },
    },
    { header: 'Name', accessor: (student: CourseEnroll) => student.name },
    {
      header: 'Email',
      accessor: (student: CourseEnroll) => student.user.email,
    },
    {
      header: 'Phone Number',
      accessor: (student: CourseEnroll) => student.phoneNumber,
    },
  ];

  // Handle row click
  const handleRowClick = (student: any) => {
    console.log('Row clicked:', student);
  };

  // Render actions menu
  const renderActions = (student: CourseEnroll, closeMenu: () => void) => {
    return (
      <>
        <button
          onClick={() => {
            router.push(
              `/dashboard/classes/student-analytics/?studentId=${student.id}&chapterId=${chapterId}`
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

  if (isLoading || isFetching) return <Loading />;

  return (
    <div>
      <DataTable
        title={`Chapter ${data?.sLNumber}: ${data?.chapterName}`}
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

export default AllStudentByChapterPageComponent;
