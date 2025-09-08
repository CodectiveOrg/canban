import { type PropsWithChildren, type ReactNode, useState } from "react";

import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import ListItem from "@/components/ListItem/ListItem.tsx";

import type { DraggableData } from "@/types/draggable-data.ts";

type Props = PropsWithChildren;

export default function DndProvider({ children }: Props): ReactNode {
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeData, setActiveData] = useState<DraggableData | null>(null);

  const handleDragStart = (e: DragStartEvent): void => {
    setActiveData(e.active.data.current as DraggableData);
  };

  const handleDragEnd = (): void => {
    setActiveData(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData &&
          (activeData.isList ? null : (
            <ListItem
              presentational={true}
              listIndex={activeData.listIndex}
              itemIndex={activeData.itemIndex}
              item={activeData.item}
            />
          ))}
      </DragOverlay>
    </DndContext>
  );
}
