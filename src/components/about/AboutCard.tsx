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
import { Separator } from "@radix-ui/react-separator";
import UpdateCardDescriptionForm from "../forms/card/updateCardDescriptionForm";
import UpdateCardTagsForm from "../forms/card/updateCardTagsForm";
import UpdateCardCheckForm from "../forms/card/updateCardCheckForm";
import UpdateCardFileForm from "../forms/card/updateCardFilesForm";
import UpdateCardDeadLineForm from "../forms/card/updateCardDeadLineForm";

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
          <DialogHeader className="flex flex-row">
            {/* Color */}
            <UpdateCardColorForm card={card} />
            {/* Base Info */}
            <div className="flex flex-col items-center justify-around w-full ">
              {/* Title */}
              <UpdateCardTitleForm card={card} />
              {/* Card Type */}
              <h2>{card.cardType}</h2>
            </div>
            {/* Other Info */}
            <div className="flex flex-col items-center justify-around w-full ">
              {/* Delete */}
              <div>???</div>
              {/* Dead Line */}
              <UpdateCardDeadLineForm card={card} />
            </div>
          </DialogHeader>
        </DialogTitle>
        <Separator />
        {/* Body */}
        <DialogDescription className="grid gap-2">
          {/* Description */}
          <UpdateCardDescriptionForm card={card} />
          {/* Tags */}
          <UpdateCardTagsForm card={card} dashboardId={dashboardId} />
        </DialogDescription>
        <Separator />
        {/* Footer */}
        <DialogFooter>
          {/* Checks */}
          <UpdateCardCheckForm card={card} />
          {/* Attached Files */}
          <UpdateCardFileForm card={card} />
        </DialogFooter>
      </DialogContent>{" "}
    </Dialog>
  );
}

export default AboutCard;
