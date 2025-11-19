import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from 'lucide-react';

export default function SortableItem({ id, children }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-full bg-white rounded border mb-4"
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="w-full flex items-center cursor-grab  p-2 bg-gray-100 border-b"
            >
                <GripVertical />
                <span className="text-xs text-gray-500">Drag</span>
            </div>

            {/* Content area - clickable, editable */}
            <div className="w-full p-4">
                {children}
            </div>
        </div>
    );
}
