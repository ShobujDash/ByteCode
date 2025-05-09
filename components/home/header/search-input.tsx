import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <form className="hidden sm:block">
      <div className=" relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" name="search" placeholder="Search article..."  className="pl-10 w-48 focus-visible:ring-1"/>
      </div>
    </form>
  );
};

export default SearchInput;
