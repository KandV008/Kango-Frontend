import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Upload } from "lucide-react";
import createDashboard from "@/lib/forms/createDashboard";

function Header() {
  return (
    <section className="flex flex-row items-center justify-between w-full h-12 px-5 border-b-2 border-gray-200 ">
      <Label>Kango</Label>
      <Popover>
        <PopoverTrigger>
          <Button>
            <Plus /> Create Dashboard
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-5 mt-5 mr-5 w-80 bg-neutral-100 rounded-2xl">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Create Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Set the attributes of the new dashboard.
              </p>
            </div>
            <form className="grid gap-5" action={createDashboard}>
              <div className="grid items-center grid-cols-3 gap-4">
                <Label htmlFor="width">Name</Label>
                <Input
                  id="name-input"
                  name="name"
                  placeholder="Dashboard X"
                  defaultValue={""}
                  className="h-8 col-span-2"
                />
              </div>
              <Button type="submit">
                <Upload /> Create Dashboard
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}

export default Header;
