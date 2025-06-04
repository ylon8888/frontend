import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StepEightContentSkeleton = () => {
  return (
    <div>
      <Tabs defaultValue="tab1" className="w-full">
        {/* Tabs List Skeleton */}
        <TabsList className="bg-white border-1 rounded-md mb-4">
          <TabsTrigger value="tab1" disabled>
            <Skeleton className="h-4 w-20" />
          </TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            <Skeleton className="h-4 w-24" />
          </TabsTrigger>
          <TabsTrigger value="tab3" disabled>
            <Skeleton className="h-4 w-16" />
          </TabsTrigger>
        </TabsList>

        {/* Tab Content Skeleton */}
        <TabsContent value="tab1">
          <div className="space-y-6">
            {/* Quiz Questions Skeleton */}
            {[1, 2, 3].map((questionIndex) => (
              <div
                key={questionIndex}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                {/* Question Title */}
                <div className="mb-4">
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-3"
                    >
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button Skeleton */}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </TabsContent>

        {/* Additional hidden tab contents for structure */}
        <TabsContent value="tab2">
          <div className="space-y-6">
            {[1, 2].map((questionIndex) => (
              <div
                key={questionIndex}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                <div className="mb-4">
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-3"
                    >
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tab3">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((questionIndex) => (
              <div
                key={questionIndex}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                <div className="mb-4">
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-3"
                    >
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StepEightContentSkeleton;
