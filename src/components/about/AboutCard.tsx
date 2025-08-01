import type { CardEntity } from "@/model/card/card";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateCardColorForm from "../forms/card/updateCardColorForm";
import UpdateCardTitleForm from "../forms/card/updateCardTitleForm";
import UpdateCardDescriptionForm from "../forms/card/updateCardDescriptionForm";
import UpdateCardTagsForm from "../forms/card/updateCardTagsForm";
import UpdateCardCheckForm from "../forms/card/updateCardCheckForm";
import UpdateCardFileForm from "../forms/card/updateCardFilesForm";
import UpdateCardDeadLineForm from "../forms/card/updateCardDeadLineForm";
import { Separator } from "../ui/separator";

interface componentProps {
  card: CardEntity;
  dashboardId?: string;
}

function AboutCard({ card, dashboardId }: componentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* Header */}
        <DialogTitle>
          <DialogHeader className="hidden sm:flex-row sm:flex">
            {/* Color */}
            <UpdateCardColorForm />
            {/* Base Info */}
            <div className="flex flex-col items-center justify-around w-full ">
              {/* Title */}
              <UpdateCardTitleForm />
              {/* Card Type */}
              <h2 className="text-sm sm:text-base">{card.cardType}</h2>
            </div>
            {/* Other Info */}
            <div className="flex flex-col items-center justify-around w-full ">
              {/* Dead Line */}
              <UpdateCardDeadLineForm />
            </div>
          </DialogHeader>
          <div className="flex flex-row justify-evenly sm:hidden">
            <div className="flex flex-col items-center w-20 gap-1">
              {/* Color */}
              <UpdateCardColorForm />
              {/* Card Type */}
              <h2 className="text-sm sm:text-base">{card.cardType}</h2>
            </div>
            <div className="flex flex-col items-center w-20 gap-1">
              {/* Title */}
              <UpdateCardTitleForm />
              {/* Dead Line */}
              <UpdateCardDeadLineForm />
            </div>
          </div>
        </DialogTitle>
        <Separator className="hidden sm:block" />
        {/* Body */}
        <DialogDescription className="grid gap-1 sm:gap-2">
          {/* Description */}
          <UpdateCardDescriptionForm />
          {/* Tags */}
          <UpdateCardTagsForm dashboardId={dashboardId} />
        </DialogDescription>
        <Separator className="hidden sm:block" />
        {/* Footer */}
        <DialogFooter>
          {/* Checks */}
          <UpdateCardCheckForm />
          {/* Attached Files */}
          <UpdateCardFileForm />
        </DialogFooter>
      </DialogContent>{" "}
    </Dialog>
  );
}

export default AboutCard;
