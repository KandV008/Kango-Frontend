import {
  BookDashed,
  CreditCard,
  Eye,
  File,
  Rows3,
  Tag,
  Trash,
} from "lucide-react";
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
import type { TableEntity } from "@/model/table/table";
import UpdateDashboardNameForm from "../forms/dashboard/updateDashboardNameForm";
import { useState } from "react";
import { Separator } from "../ui/separator";

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
    title: "templates",
    icon: BookDashed,
  },
  {
    title: "tags",
    icon: Tag,
  },
];

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  dashboard: DashboardEntity;
  onDelete: () => void;
}

function Dashboard({ dashboard, onDelete }: componentProps) {
  const [dashboardName, setDashboardName] = useState<string>(dashboard.name);

  const calculateNumCards = (tables: TableEntity[]) => {
    return tables.reduce((count, table) => count + table.cardList.length, 0);
  };

  const stadistics = [
    {
      title: "tables",
      count: dashboard.tableList.length,
    },
    {
      title: "cards",
      count: calculateNumCards(dashboard.tableList),
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

  const deleteDashboardAction = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/dashboards/${dashboard.id}`,
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
      onDelete();      
    } catch (error) {
      console.error("Error deleting dashboard:", error);
      toast.error("Error deleting dashboard. Please try again.");
    }
  };

  return (
    <article className="flex flex-col items-center justify-center w-full gap-2 px-5 py-4 mx-auto border-2 border-black shadow-md dark:border-white rounded-b-md rounded-tr-md rounded-tl-2xl h-28">
      {/* Dashboard */}
      <section className="flex flex-row items-center justify-between w-full">
        {/* Name */}
        <h1 className="font-semibold break-words whitespace-normal max-w-36 sm:max-w-full md:text-xl xl:text-2xl">
          {dashboardName}
        </h1>
        {/* Options */}
        <article className="flex flex-row gap-3">
          {/* Update Name */}
          <UpdateDashboardNameForm
            dashboard={dashboard}
            updatedAction={(newValue: string) => {
              setDashboardName(newValue);
            }}
          />
          {/* See Dashboard */}
          <Button onClick={readDashboardAction}>
            <Eye />
            <p className="hidden lg:block">Access</p>
          </Button>
          {/* Delete Dashboard */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Trash />
                <p className="hidden lg:block">Delete</p>
              </Button>
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
                <AlertDialogAction onClick={deleteDashboardAction}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </article>
      </section>
      {/* Statistics */}
      <Separator />
      <section className="flex flex-row justify-around w-full">
        {items.map((item, index) => (
          <article key={"stadistics-" + index} className="flex gap-1 sm:gap-0 sm:items-center sm:flex-col lg:gap-1 lg:flex-row">
            <item.icon className="" />
            <span className="flex flex-row gap-1 sm:text-base xl:text-lg">
              {stadistics[index].count}{" "}
              <span className="hidden sm:block">{item.title}</span>
            </span>
          </article>
        ))}
      </section>
    </article>
  );
}

export default Dashboard;
