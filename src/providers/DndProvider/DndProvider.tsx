import type { PropsWithChildren, ReactNode } from "react";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type Props = PropsWithChildren;

export default function DndProvider({ children }: Props): ReactNode {
  const sensors = useSensors(useSensor(PointerSensor));

  return <DndContext sensors={sensors}>{children}</DndContext>;
}
