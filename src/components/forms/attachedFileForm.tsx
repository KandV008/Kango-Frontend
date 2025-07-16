import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AttachedFileForm() {
    return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="file-name-input">File Name</Label>
        <Input
          id="file-name-input"
          name="file-name"
          defaultValue=""
          placeholder="Name X"
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="file-url-input">File URL</Label>
        <Input
          id="file-url-input"
          name="file-url"
          defaultValue=""
          placeholder="URL X"
          required
        />
      </div>
    </div>
  );
}

export default AttachedFileForm;
