import {
  ALargeSmall,
  CreditCard,
  Eye,
  Home,
  Languages,
  LogOut,
  Plus,
  Settings,
  Tag,
} from "lucide-react";

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
import createGlobalTag from "@/lib/forms/createGlobalTag";
import TagList from "./TagList";
import TagForm from "../forms/tagForm";
import CardForm from "../forms/cardForm";
import createGlobalTemplateCard from "@/lib/forms/createGlobalTemplateCard";
import CardList from "./CardList";

function SideBar() {
  return (
    <section>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
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
                  <SidebarMenuItem>
                    {/* Header */}
                    <SidebarMenuButton asChild>
                      <a>
                        <CreditCard />
                        <span>Card Templates</span>
                      </a>
                    </SidebarMenuButton>
                    {/* Options */}
                    <SidebarGroupContent className="pl-10">
                      {/* Create Template Card */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <SidebarMenuSubButton asChild>
                            <a>
                              <Plus />
                              <span>Create Card Template</span>
                            </a>
                          </SidebarMenuSubButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <form action={createGlobalTemplateCard} className="grid gap-5">
                            <DialogHeader>
                              <DialogTitle>Create Card Template</DialogTitle>
                              <DialogDescription>
                                Set the attributes of the new Card Template
                              </DialogDescription>
                            </DialogHeader>
                            <CardForm />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">
                                Create Card Template
                              </Button>
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
                              It will show all the available card templates, with the
                              posibility to update or delete them.
                            </DialogDescription>
                          </DialogHeader>
                          <CardList />
                        </DialogContent>
                      </Dialog>

                    </SidebarGroupContent>
                  </SidebarMenuItem>
                  {/* Tag */}
                  <SidebarMenuItem>
                    {/* Header */}
                    <SidebarMenuButton asChild>
                      <a>
                        <Tag />
                        <span>Tags</span>
                      </a>
                    </SidebarMenuButton>
                    {/* Options */}
                    <SidebarGroupContent className="pl-10">
                      {/* Create Tag */}
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
                          <TagList />
                        </DialogContent>
                      </Dialog>
                    </SidebarGroupContent>
                  </SidebarMenuItem>
                  {/* Configuration */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a>
                        <Settings />
                        <span>Configuration</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarGroupContent className="pl-10">
                      <SidebarMenuSubButton asChild>
                        <a>
                          <ALargeSmall />
                          <span>Change Font Size</span>
                        </a>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild>
                        <a>
                          <Languages />
                          <span>Change Language</span>
                        </a>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild>
                        <a>
                          <Eye />
                          <span>Change Color Blind</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarGroupContent>
                  </SidebarMenuItem>
                  {/* Exit */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <LogOut />
                        <span>Exit</span>
                      </a>
                    </SidebarMenuButton>
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
