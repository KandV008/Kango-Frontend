import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Eye, File, Menu, Plus } from "lucide-react";
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
import { useEffect, useState } from "react";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import UpdateDashboardNameForm from "../forms/dashboard/updateDashboardNameForm";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  toggleSideBar: () => void;
}

function Header({ toggleSideBar }: componentProps) {
  const { id } = useParams();
  const isDashboardPage = id !== undefined;
  const [dashboard, setDashboard] = useState<DashboardEntity | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [dashboardName, setDashboardName] = useState<string>("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/dashboards/${id}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching dashboard (status: ${response.status})`
          );
        }

        const data = await response.json();
        const mappedDashboard = DashboardEntity.fromJSON(data);
        setDashboard(mappedDashboard);
        setDashboardName(mappedDashboard.name);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (id) fetchDashboard();
  }, [id]);

  const logoLabel = isDashboardPage ? "hidden lg:block" : "";

  return (
    <section className="flex flex-row items-center justify-between w-full h-12 gap-2 px-5 border-b-2 border-gray-200 grow-0">
      {/* Toggle Side Bar */}
      <Button
        variant={"outline"}
        className="md:hidden top-4 left-4"
        onClick={toggleSideBar}
      >
        <Menu />
      </Button>
      {/* App Name */}
      <Label className={logoLabel}>Kango</Label>
      {/* Dashboard Name */}
      {!isLoading && dashboard && (
        <article className="flex flex-row items-center justify-center w-full gap-2">
          <Label className="text-center w-fit">{dashboardName}</Label>
          <div className="hidden sm:block">
            <UpdateDashboardNameForm
            dashboard={dashboard}
            updatedAction={(newValue: string) => {
              setDashboardName(newValue);
            }}
          />
          </div>
        </article>
      )}
      {/* Actions */}
      <article className="flex flex-row gap-1 sm:gap-2">
        {!isLoading && dashboard && (
          <div className="block sm:hidden">
            <UpdateDashboardNameForm
              dashboard={dashboard}
              updatedAction={(newValue: string) => {
                setDashboardName(newValue);
              }}
            />
          </div>
        )}
        {/* Handle Attached Files */}
        {isDashboardPage ? (
          <Popover>
            <PopoverTrigger>
              <Button>
                <File />
                <span className="hidden lg:block">Attached</span>{" "}
                <span className="hidden sm:block">Files</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid gap-2 p-5 mt-5 mr-5 w-fit dark:bg-neutral-900 bg-neutral-100 rounded-2xl">
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
              <Plus /> <p className="hidden lg:block">Create</p>{" "}
              <p className="hidden sm:block">
                {isDashboardPage ? "Table" : "Dashboard"}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              sideOffset={10}
              className="z-50 p-5 mt-5 mr-5 w-80 dark:bg-neutral-900 bg-neutral-100 rounded-2xl"
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
