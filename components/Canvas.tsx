import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useReadmeStore } from '../store/useReadmeStore';
import { SortableItem } from './SortableItem';
import { renderSection } from './SectionRenderers';

export const Canvas: React.FC = () => {
  const { sections, reorderSections, globalUsername } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((item) => item.id === active.id);
      const newIndex = sections.findIndex((item) => item.id === over.id);
      reorderSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="h-full bg-slate-950 p-4 md:p-8 overflow-y-auto custom-scroll relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <div className="max-w-3xl mx-auto min-h-[500px]">
        {sections.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl text-slate-600">
            <p className="text-lg">Canvas is empty</p>
            <p className="text-sm text-center px-4 mt-2">
              <span className="hidden md:inline">Select a widget from the left to start</span>
              <span className="md:hidden">Tap the "Add" tab below to start</span>
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableItem key={section.id} id={section.id}>
                  {renderSection(section, globalUsername)}
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};