import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface componentProps{
    zone: number,
    table: number,
}

export function DropZone({ zone, table }: componentProps) {
  /* Drag & Drop Logic */
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ zone, table }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [table, zone]);

  const dropZoneStyle = isDraggedOver ? "bg-blue-300" : "bg-transparent";

  return <div ref={ref} className={`h-2 mx-5 ${dropZoneStyle}`}></div>;
}
