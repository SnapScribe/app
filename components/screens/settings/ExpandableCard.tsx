import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionIcon,
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon, Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";

interface ExpandableCardProps {
  title: string;
  icon: React.ElementType;
  children: ReactNode;
}

const ExpandableCard = ({ title, icon, children }: ExpandableCardProps) => {
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      className="w-full border-0 bg-background-100 rounded-[18px] mb-3 shadow-none"
    >
      <AccordionItem
        value={title}
        className="border-0 bg-background-100 rounded-[18px]"
      >
        <AccordionHeader className="p-0">
          <AccordionTrigger className="p-3 h-14 rounded-[18px] data-[state=open]:bg-primary-100">
            {({ isExpanded }) => {
              return (
                <HStack className="items-center gap-3 flex-1">
                  <Box className="p-3">
                    <Icon as={icon} size="sm" className="text-primary-700" />
                  </Box>

                  <AccordionTitleText className="font-dm-sans-medium text-typography-900 flex-1 text-left">
                    {title}
                  </AccordionTitleText>

                  <Box className="h-6 w-6 bg-background-0 rounded-full items-center justify-center">
                    {isExpanded ? (
                      <AccordionIcon
                        as={ChevronUpIcon}
                        size="sm"
                        className="text-background-800"
                      />
                    ) : (
                      <AccordionIcon
                        as={ChevronDownIcon}
                        size="sm"
                        className="text-background-800"
                      />
                    )}
                  </Box>
                </HStack>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent className="px-3 pb-3">
          <Box className="ml-12 mr-9">{children}</Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpandableCard;
