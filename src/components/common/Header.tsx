import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import DashboardForm from "../forms/dashboardForm";
import TableForm from "../forms/tableForm";

function Header() {
  const { id } = useParams();
  const isDashboardPage = id !== undefined;

  return (
    <section className="flex flex-row items-center justify-between w-full h-12 px-5 border-b-2 border-gray-200 ">
      <Label>Kango</Label>
      <Popover>
        <PopoverTrigger>
          <Button>
            <Plus /> Create {isDashboardPage ? "Table" : "Dashboard"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-5 mt-5 mr-5 w-80 bg-neutral-100 rounded-2xl">
          {isDashboardPage ? <TableForm dashboardId={id} /> : <DashboardForm />}
        </PopoverContent>
      </Popover>
    </section>
  );
}

export default Header;
