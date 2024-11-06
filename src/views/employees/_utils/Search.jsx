import UiInput from "@/components/form-fields/_utils/UiInput";
import { SlidersHorizontal } from "lucide-react";

const Search = () => {
  return (
    <div className="flex gap-4 ">
      <UiInput
        inputClassName={"md:w-[550px] lg:w-[800px] h-11"}
        placeholder="search"
      />
      <SlidersHorizontal className="mt-2" />
    </div>
  );
};

export default Search;
