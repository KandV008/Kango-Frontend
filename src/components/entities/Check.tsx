import { Button } from "../ui/button";
import type { CheckProps } from "@/model/utils/check";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
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
interface componentProps {
  check: CheckProps;
  cardId: string;
}

function CheckComponent({ check, cardId }: componentProps) {
  const removeCheckAction = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cards/${cardId}/checks`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(check),
        }
      );

    if (response.status !== 204) {
        throw new Error(`Failed to remove check (status: ${response.status})`);
      }

      toast.success("Check has been removed.");
    } catch (error) {
      console.error("Error removing check:", error);
      toast.error("Error removing check. Please try again.");
    }
  };

  const updateCheckAction = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheck = { ...check, checked: e.target.checked };

    try {
      const response = await fetch(
        `http://localhost:8080/api/cards/${cardId}/checks`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCheck),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update check (status: ${response.status})`);
      }

      toast.success("Check has been updated.");
    } catch (error) {
      console.error("Error updating check:", error);
      toast.error("Error updating check. Please try again.");
    }
  };

  return (
    <div className="flex flex-row justify-between gap-1 px-2 py-1 border border-gray-200 rounded-2xl">
      {/* Info */}
      <div className="flex flex-row items-center justify-start w-full gap-2">
        <Input
          defaultChecked={check.checked}
          onChange={updateCheckAction}
          type="checkbox"
          className="size-5"
        />
        <div className="w-full">{check.label}</div>
      </div>
      {/* Remove Check */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <X />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this
              check.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeCheckAction}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CheckComponent;
