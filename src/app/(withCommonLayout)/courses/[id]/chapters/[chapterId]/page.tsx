import ChapterLayout from "@/components/singleChapter/ChapterLayout";
import WithRole from "@/role-wrapper/WithAdmin";
import React from "react";

const Chapter = () => {
  return (
    <WithRole allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="container max-w-[1320px] mx-auto px-5">
        <ChapterLayout />
      </div>
    </WithRole>
  );
};

export default Chapter;
