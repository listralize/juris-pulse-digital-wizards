declare module 'react-beautiful-dnd' {
  export interface DropResult {
    destination?: {
      droppableId: string;
      index: number;
    } | null;
    source: {
      droppableId: string;
      index: number;
    };
    draggableId: string;
    type: string;
    reason: string;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: any, snapshot: any) => React.ReactElement;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: any, snapshot: any) => React.ReactElement;
  }

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
}