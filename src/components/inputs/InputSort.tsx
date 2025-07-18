import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export function InputSort() {
  return (
    <Select name="sortType" required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a sort type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Type</SelectLabel>
          <SelectItem value="BY_ID">By Card's Id</SelectItem>
          <SelectItem value="BY_ID_REVERSE">By Card's Id Reverse</SelectItem>
          <SelectItem value="BY_TITLE">By Card's Title</SelectItem>
          <SelectItem value="BY_TITLE_REVERSE">By Card's Title Reverse</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
