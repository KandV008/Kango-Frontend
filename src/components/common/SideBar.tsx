import { BadgePlus, Eye, Home, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

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
import { Button } from "../ui/button";
import createGlobalTag from "@/lib/forms/tag/createGlobalTag";
import TagForm from "../forms/tagForm";
import CardForm from "../forms/cardForm";
import createGlobalTemplateCard from "@/lib/forms/card/createGlobalTemplateCard";
import TemplateCardList from "../containers/TemplateCardList";
import TagList from "../containers/TagList";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import createLocalTemplateCard from "@/lib/forms/card/createLocalTemplateCard";
import createLocalTag from "@/lib/forms/tag/createLocalTag";
import { ModeToggle } from "../mode-toggle";

interface componentProps {
  isSideBarOpen: boolean;
  removeSideBar: () => void;
}

function SideBar({ isSideBarOpen, removeSideBar }: componentProps) {
  const { id } = useParams();
  const isDashboardPage = id !== undefined;

  return (
    <section className="">
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={removeSideBar}
        />
      )}
      <SidebarProvider>
        <Sidebar
          collapsible="none"
          className={`fixed top-0 left-0 h-dvh z-40  shadow transition-transform duration-300 md:static ${
            isSideBarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {" "}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex flex-row justify-between mb-1 text-lg font-semibold underline h-fit underline-offset-2">
                Actions
                <SidebarMenuSubButton asChild>
                  <ModeToggle />
                </SidebarMenuSubButton>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="grid gap-5">
                  {/* Home */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/">
                        <Home />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* Template Card */}
                  <SidebarMenuItem className="grid gap-2">
                    {/* Create Global Template Card */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuSubButton asChild>
                          <a>
                            <Plus />
                            <span>
                              {isDashboardPage
                                ? "Create Global Template"
                                : "Create Card Template"}
                            </span>
                          </a>
                        </SidebarMenuSubButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form
                          action={createGlobalTemplateCard}
                          className="grid gap-5"
                        >
                          <DialogHeader>
                            <DialogTitle>
                              Create Global Card Template
                            </DialogTitle>
                            <DialogDescription>
                              Set the attributes of the new Global Card Template
                            </DialogDescription>
                          </DialogHeader>
                          <CardForm />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Card Template</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>{" "}
                    </Dialog>
                    {/* Create Local Template Card */}
                    <Dialog>
                      {isDashboardPage ? (
                        <DialogTrigger asChild>
                          <SidebarMenuSubButton asChild>
                            <a>
                              <BadgePlus />
                              <span>Create Local Template</span>
                            </a>
                          </SidebarMenuSubButton>
                        </DialogTrigger>
                      ) : (
                        <></>
                      )}
                      <DialogContent className="sm:max-w-[425px]">
                        <form
                          action={createLocalTemplateCard}
                          className="grid gap-5"
                        >
                          <Input type="hidden" value={id} name="dashboard_id" />
                          <DialogHeader>
                            <DialogTitle>
                              Create Local Card Template
                            </DialogTitle>
                            <DialogDescription>
                              Set the attributes of the new Local Card Template
                            </DialogDescription>
                          </DialogHeader>
                          <CardForm />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Card Template</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>{" "}
                    </Dialog>
                    {/* See Template Cards */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuSubButton asChild>
                          <a>
                            <Eye />
                            <span>See Card Templates</span>
                          </a>
                        </SidebarMenuSubButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>See all Card Templates</DialogTitle>
                          <DialogDescription>
                            It will show all the available card templates, with
                            the posibility to update or delete them.
                          </DialogDescription>
                        </DialogHeader>
                        <TemplateCardList dashboardId={id} />
                      </DialogContent>
                    </Dialog>
                  </SidebarMenuItem>
                  {/* Tag */}
                  <SidebarMenuItem className="grid gap-2">
                    {/* Create Globabl Tag */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuSubButton asChild>
                          <a>
                            <Plus />
                            <span>Create Global Tag</span>
                          </a>
                        </SidebarMenuSubButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form action={createGlobalTag} className="grid gap-5">
                          <DialogHeader>
                            <DialogTitle>Create Global Tag</DialogTitle>
                            <DialogDescription>
                              Set the attributes of the new Global Tag
                            </DialogDescription>
                          </DialogHeader>
                          <TagForm />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Tag</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>{" "}
                    </Dialog>
                    {/* Create Local Tag */}
                    <Dialog>
                      {isDashboardPage ? (
                        <DialogTrigger asChild>
                          <SidebarMenuSubButton asChild>
                            <a>
                              <BadgePlus />
                              <span>Create Local Tag</span>
                            </a>
                          </SidebarMenuSubButton>
                        </DialogTrigger>
                      ) : (
                        <></>
                      )}
                      <DialogContent className="sm:max-w-[425px]">
                        <form action={createLocalTag} className="grid gap-5">
                          <Input type="hidden" value={id} name="dashboard_id" />
                          <DialogHeader>
                            <DialogTitle>Create Local Tag</DialogTitle>
                            <DialogDescription>
                              Set the attributes of the new Local Tag
                            </DialogDescription>
                          </DialogHeader>
                          <TagForm />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Tag</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>{" "}
                    </Dialog>
                    {/* See Tag */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuSubButton asChild>
                          <a>
                            <Eye />
                            <span>See Tags</span>
                          </a>
                        </SidebarMenuSubButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>See all Tags</DialogTitle>
                          <DialogDescription>
                            It will show all the available tags, with the
                            posibility to update or delete them.
                          </DialogDescription>
                        </DialogHeader>
                        <TagList dashboardId={id} />
                      </DialogContent>
                    </Dialog>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </section>
  );
}

export default SideBar;
