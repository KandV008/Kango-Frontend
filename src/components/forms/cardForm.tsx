import { Label } from "../ui/label";
import { Input } from "../ui/input";


function CardForm() {

    return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="title-input">Title</Label>
        <Input
          id="title-input"
          name="title"
          defaultValue=""
          placeholder="Card Template X"
        />
      </div>
    </div>
  );
}

export default CardForm;
