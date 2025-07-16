import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface componentProps{
    zone: number,
    destination: number,
    type: "CARD" | "TABLE",
}

type HoveredState = 'idle' | 'validMove' | 'invalidMove';

export function DropZone({ zone, destination, type }: componentProps) {
  /* Drag & Drop Logic */
  const ref = useRef(null);
    const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ zone, destination, type }),
      onDragEnter: ({ source }) => {

        if (source.data.type === type){
          setState("validMove")
        } else {
          setState("invalidMove")
        }
      },
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [destination, type, zone]);

  function getColor(currentState: HoveredState): string {
    if (currentState === 'validMove') {
        return 'bg-blue-300';
    } else if (currentState === 'invalidMove') {
        return 'bg-red-300';
    }
    return "bg-transparent";
}

  const dropZoneSize = type === "CARD" ? "h-2 mx-5" : "w-5 my-5 h-full"

  return <div ref={ref} className={`${dropZoneSize} ${getColor(state)}`}></div>;
}
