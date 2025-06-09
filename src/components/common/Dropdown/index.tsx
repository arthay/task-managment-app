import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface I_Option {
  label: string;
  value: string;
}

interface I_DropdownProps {
  placeholder: string;
  defaultValue?: string;
  value?: string;
  options: I_Option[];
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

function Dropdown({
  placeholder,
  value,
  defaultValue,
  options,
  disabled,
  onValueChange,
}: I_DropdownProps) {
  return (
    <Select
      value={value || ""}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue defaultValue={defaultValue} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              className="cursor-pointer"
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Dropdown;
