import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useReadmeStore } from '../store/useReadmeStore';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const { selectedSectionId, selectSection, setMobileTab } = useReadmeStore();
  const isSelected = selectedSectionId === id;

  const handleClick = () => {
    selectSection(id);
    setMobileTab('settings');
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`
        group relative mb-4 rounded-xl border-2 bg-slate-900/50 p-4 pt-10 md:p-6 transition-all cursor-pointer
        ${isSelected ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-800 hover:border-slate-600'}
        ${isDragging ? 'shadow-2xl opacity-50' : 'opacity-100'}
      `}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute top-2 right-2 md:top-1/2 md:-left-3 md:-translate-y-1/2 p-2 md:p-1.5 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 rounded shadow-md z-10"
      >
        <GripVertical size={18} className="md:w-4 md:h-4" />
      </div>

      {/* Content */}
      <div className="pointer-events-none">
        {children}
      </div>
    </div>
  );
};