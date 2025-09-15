import { type PropsWithChildren, type ReactNode, useState } from "react";

import { useParams } from "react-router";

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import List from "@/components/List/List.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import { detectCollision } from "@/providers/DndProvider/utils/collision-detection.ts";

import { useKanbanStore } from "@/stores/kanban-store.ts";

import type { DraggableData } from "@/types/draggable-data.ts";

type Props = PropsWithChildren;

export default function DndProvider({ children }: Props): ReactNode {
  const { boardId } = useParams();

  const moveList = useKanbanStore((state) => state.moveList);
  const moveItem = useKanbanStore((state) => state.moveItem);
  const moveItemBetweenLists = useKanbanStore(
    (state) => state.moveItemBetweenLists,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeData, setActiveData] = useState<DraggableData | null>(null);

  const handleDragStart = (e: DragStartEvent): void => {
    setActiveData(e.active.data.current as DraggableData);
  };

  const handleDragOver = (e: DragOverEvent): void => {
    if (!e.over || e.active.data.current!.isList) {
      return;
    }

    moveItemBetweenLists(
      boardId,
      e.active.data.current!.listIndex,
      e.active.data.current!.itemIndex,
      e.over.data.current!.listIndex,
      e.over.data.current!.itemIndex,
    );
  };

  const handleDragEnd = (e: DragEndEvent): void => {
    setActiveData(null);

    if (!e.over) {
      return;
    }

    if (e.active.data.current!.isList) {
      moveList(
        boardId,
        e.active.data.current!.listIndex,
        e.over.data.current!.listIndex,
      );
    } else {
      moveItem(
        boardId,
        e.active.data.current!.listIndex,
        e.active.data.current!.itemIndex,
        e.over.data.current!.itemIndex,
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={detectCollision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData &&
          (activeData.isList ? (
            <List
              presentational
              listIndex={activeData.listIndex}
              list={activeData.list}
            />
          ) : (
            <ListItem
              presentational
              listIndex={activeData.listIndex}
              itemIndex={activeData.itemIndex}
              item={activeData.item}
            />
          ))}
      </DragOverlay>
    </DndContext>
  );
}
