'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FrameByAnima } from './FrameByAnima/FrameByAnima';

const StudentDetailsPageComponent = ({ studentId }: { studentId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // In a real app, you would call an API to delete the student
    setTimeout(() => {
      setIsDeleting(false);
      // Redirect or show success message
      toast.success('Account deleted successfully');
    }, 1000);
  };
  return (
    <div className="flex flex-col w-full max-w-[1580px] mx-auto gap-6">
      <div className="p-0">
        <FrameByAnima />
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-4 w-full">
        <button className="h-12 cursor-pointer px-6 py-2.5 rounded-lg bg-[#b2b2b2] hover:bg-[#a0a0a0] text-black border-none font-['Montserrat',Helvetica] font-semibold text-base md:text-lg w-full sm:w-auto">
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="h-12 px-6 cursor-pointer py-2.5 rounded-lg bg-[#FF4242] hover:bg-[#e63c3c] text-white font-['Montserrat',Helvetica] font-semibold text-base md:text-lg w-full sm:w-auto"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default StudentDetailsPageComponent;
