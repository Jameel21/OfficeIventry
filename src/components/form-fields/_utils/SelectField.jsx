import { useState } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

const MultiSelect = ({ options, placeholder = "Select options", label, className }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (value) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleRemove = (value) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== value));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <Select>
        <SelectTrigger className="w-full px-4 py-2 border rounded-md">
          <div className="flex flex-wrap items-center gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleRemove(item)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={option}
                onClick={() => handleSelect(option)}
                className={selectedOptions.includes(option) ? "hidden" : ""}
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelect;
