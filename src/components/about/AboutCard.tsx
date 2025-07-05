import type { CardEntity } from "@/model/card/card";
import { Button } from "../ui/button";
import { Badge, Pen, Trash } from "lucide-react";

interface componentProps {
  card: CardEntity;
}

function AboutCard({ card }: componentProps) {
  return (
    <section className="border-2 border-black w-dvh">
      {/* Header */}
      <header className="flex flex-row w-full border-2 border-black h-1/3">
        
        <article className="grid grid-cols-2 grid-rows-2">
          {/* Options */}
          <div className="flex flex-row">
            <Button>
              <Pen />
            </Button>
            <Button>
              <Trash />
            </Button>
          </div>
          {/* Dead Line */}
          <h2>{card.deadLine.toUTCString()}</h2>
        </article>
      </header>
      {/* Body */}
      <main className="w-full border-2 border-black h-1/3">
        {/* Description */}
        <div>
            {card.description}
        </div>
        {/* Tags */}
        <div>
            {
                card.tagList.map((tag) => (<Badge>{tag.label}</Badge>))
            }
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full border-2 border-black h-1/3">
        {/* Checks */}
        {/* Attached Files */}
      </footer>
    </section>
  );
}

export default AboutCard;
