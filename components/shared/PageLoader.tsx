import React from "react";
import { Skeleton } from "../ui/skeleton";
import PageWrapper from "./PageWrapper";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";

const PageLoader = () => {
  return (
    <PageWrapper>
      <VStack className="px-4">
        <Skeleton className="h-12 w-full rounded-xl mb-6" />

        <VStack space="md">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-28 w-full rounded-2xl" />
          ))}
        </VStack>
      </VStack>
    </PageWrapper>
  );
};

export default PageLoader;
