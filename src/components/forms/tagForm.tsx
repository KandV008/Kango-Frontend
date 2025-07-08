import type { TagEntity } from "@/model/tag/tag";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputColor } from "../inputs/InputColor";

interface componentProps {
  tag?: TagEntity;
}

function TagForm({ tag }: componentProps) {
  return (
    <div className="grid gap-4">
        {tag ? <Input type="hidden" name="id" value={tag.id}/> : <></>}
        {tag ? <Input type="hidden" name="visibility" value={tag.visibility}/> : <></>}
      <div className="grid gap-3">
        <Label htmlFor="label-input">Label (Optional)</Label>
        <Input
          id="label-input"
          name="label"
          defaultValue={tag ? tag.label : ""}
          placeholder={tag ? (tag.label) : "Tag X"}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="color-input">Color</Label>
        <InputColor color={tag?.color}/>
      </div>
    </div>
  );
}

export default TagForm;
