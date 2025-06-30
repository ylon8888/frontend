import CourseOutlinePage from "@/components/chapters/ChaptersOutlinePage";
import WithRole from "@/role-wrapper/WithAdmin";
import React from "react";

const page = () => {
  return (
    <WithRole allowedRoles={["STUDENT", "ADMIN"]}>
      <div>
        <CourseOutlinePage />
      </div>
    </WithRole>
  );
};

export default page;
