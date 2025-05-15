'use client';
import { DataTable } from '@/components/shared/core/DataTable/DataTable';
import { useRouter } from 'next/navigation';
import React from 'react';
import Stats from './Stats/Stats';
import LineChart from './LineChart/LineChart';

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

const DashboardRootPage = () => {
  const router = useRouter();
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
            router.push(`/`);
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
    <div className="max-w-7xl space-y-8">
      <Stats />
      <div className="my-12 flex flex-col md:flex-row w-full gap-8">
        <div className="w-full md:w-[60%] p-5 bg-gray-50 rounded-lg">
          <LineChart />
        </div>
        <div className="w-full md:w-[40%] p-5 bg-gray-50 rounded-lg">
          <LineChart />
        </div>
      </div>
      <DataTable
        title="Student List"
        data={students}
        columns={columns}
        keyField="id"
        onRowClick={handleRowClick}
        renderActions={renderActions}
      />
    </div>
  );
};

export default DashboardRootPage;
