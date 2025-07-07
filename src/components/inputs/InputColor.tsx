import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { availableColors, type Color } from "@/model/utils/color";
import { Input } from "../ui/input";

interface componentProps {
  color?: Color | null;
}

export function InputColor({ color }: componentProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(color ? color : "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Input type="hidden" value={value} name="color" />
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? availableColors.find((color) => color.value === value)?.label
            : "Select color..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search color..." className="h-9" />
          <CommandList>
            <CommandEmpty>No color found.</CommandEmpty>
            <CommandGroup>
              {availableColors.map((color) => (
                <CommandItem
                  key={color.value}
                  value={color.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {color.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === color.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
