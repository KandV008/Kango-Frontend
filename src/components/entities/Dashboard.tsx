import { CreditCard, File, Rows3, Tag } from "lucide-react";
import { Button } from "../ui/button";
import type { DashboardEntity } from "@/model/dashboard/dashboard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "tables",
    icon: Rows3,
  },
  {
    title: "cards",
    icon: CreditCard,
  },
  {
    title: "files",
    icon: File,
  },
  {
    title: "template cards",
    icon: CreditCard,
  },
  {
    title: "tags",
    icon: Tag,
  },
];

interface componentProps {
  dashboard: DashboardEntity;
}

function Dashboard({ dashboard }: componentProps) {
  const stadistics = [
    {
      title: "tables",
      count: dashboard.tableList.length,
    },
    {
      title: "cards",
      count: 0,
    },
    {
      title: "files",
      count: dashboard.atacchedFiles.length,
    },
    {
      title: "template cards",
      count: dashboard.templateCardList.length,
    },
    {
      title: "tags",
      count: dashboard.tagList.length,
    },
  ];

  const navigate = useNavigate();

  const readDashboardAction = () => {
    navigate(`/${dashboard.id}`);
  };

  const deleteDashboardACtion = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/dashboards/${dashboard.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete dashboard (status: ${response.status})`
        );
      }

      toast.success("Dashboard has been deleted.");
    } catch (error) {
      console.error("Error deleting dashboard:", error);
      toast.error("Error deleting dashboard. Please try again.");
    }
  };

  return (
    <article className="flex flex-col items-start justify-between w-full px-5 py-4 mx-auto border-2 border-black rounded-b-md rounded-tr-md rounded-tl-2xl h-28">
      <section className="flex flex-row items-center justify-between w-full">
        <h1>{dashboard.name}</h1>
        <article className="flex flex-row gap-3">
          <Button onClick={readDashboardAction}>Access</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this dashboard and all local data related to it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteDashboardACtion}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </article>
      </section>
      <section className="flex flex-row justify-around w-full">
        {items.map((item, index) => (
          <article className="flex flex-row gap-1">
            <item.icon />
            <span>
              {stadistics[index].count} {item.title}
            </span>
          </article>
        ))}
      </section>
    </article>
  );
}

export default Dashboard;
