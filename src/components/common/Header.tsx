import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Eye, File, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import DashboardForm from "../forms/dashboard/dashboardForm";
import TableForm from "../forms/table/tableForm";
import { Separator } from "@radix-ui/react-separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AttachedFileForm from "../forms/attachedFileForm";
import addAttachedFile from "@/lib/forms/addAttachedFile";
import { Input } from "../ui/input";
import AttachedFileList from "../containers/AttachedFileList";

function Header() {
  const { id } = useParams();
  const isDashboardPage = id !== undefined;

  return (
    <section className="flex flex-row items-center justify-between w-full h-12 px-5 border-b-2 border-gray-200 ">
      <Label>Kango</Label>
      {/* Attached Files */}
      <article className="flex flex-row gap-2">
        {/* Handle Attached Files */}
        {isDashboardPage ? (
          <Popover>
            <PopoverTrigger>
              <Button>
                <File /> Attached Files
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid gap-2 p-5 mt-5 mr-5 w-fit bg-neutral-100 rounded-2xl">
              <Label>Handle Attached Files</Label>
              <Separator />
              <div className="flex flex-row gap-2">
                {/* Add Attach File */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button asChild>
                      <a>
                        <Plus />
                        <span>Attach File</span>
                      </a>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form action={addAttachedFile} className="grid gap-5">
                      <Input value={id} name="dashboard_id" type="hidden" />
                      <DialogHeader>
                        <DialogTitle>Add Attached File</DialogTitle>
                        <DialogDescription>
                          Set the attributes of the new file.
                        </DialogDescription>
                      </DialogHeader>
                      <AttachedFileForm />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add file</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>{" "}
                </Dialog>
                {/* See Attached Files */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Eye />
                      <span>See Files</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>See all attached files</DialogTitle>
                      <DialogDescription>
                        It will show all the files attached to this dashboard,
                        with the posibility to update or delete them.
                      </DialogDescription>
                    </DialogHeader>
                    <AttachedFileList dashboardId={id} />
                  </DialogContent>
                </Dialog>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <></>
        )}
        {/* Add new Entity */}
        <Popover>
          <PopoverTrigger>
            <Button>
              <Plus /> Create {isDashboardPage ? "Table" : "Dashboard"}
            </Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              sideOffset={10}
              className="z-50 p-5 mt-5 mr-5 w-80 bg-neutral-100 rounded-2xl"
            >
              {isDashboardPage ? (
                <TableForm dashboardId={id} />
              ) : (
                <DashboardForm />
              )}
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </article>
    </section>
  );
}

export default Header;
