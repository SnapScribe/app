import React from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon, Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Language } from "@/types";

interface SelectCardProps {
  placeholder: string;
  icon: any;
  options: Language[];
  onValueChange?: (value: string) => void;
  value?: string;
}

const SelectCard = ({
  placeholder,
  icon,
  options,
  onValueChange,
  value,
}: SelectCardProps) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger
        variant="outline"
        size="md"
        className="p-3 h-14 items-center bg-background-100 rounded-[18px] gap-3 flex flex-row data-[active=true]:bg-primary-100"
      >
        <Box className="p-3">
          <Icon as={icon} size="sm" className="text-primary-700" />
        </Box>

        <SelectInput
          placeholder={placeholder}
          className="font-dm-sans-medium text-typography-900 flex-1 text-left"
        />

        {/* Chevron Icon */}
        <Box className="h-6 w-6 bg-background-0 rounded-full items-center justify-center ml-3">
          <SelectIcon
            as={ChevronDownIcon}
            size="sm"
            className="text-background-800"
          />
        </Box>
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="bg-background-0 rounded-[18px] shadow-lg border border-outline-200">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map((option) => (
            <SelectItem
              key={option.iso639}
              label={option.name}
              value={option.iso639}
              className="p-3 font-dm-sans-medium text-typography-900 data-[focus=true]:bg-primary-100 data-[disabled=true]:opacity-50"
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectCard;
