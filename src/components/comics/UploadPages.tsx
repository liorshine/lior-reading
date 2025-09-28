"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface UploadPagesProps {
  chapter: { id: number; title: string };
  onBack: () => void;
}

export default function UploadPages({ chapter, onBack }: UploadPagesProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.name === active.id);
      const newIndex = files.findIndex((f) => f.name === over.id);
      setFiles((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    await fetch(`/api/v1/upload-pages/${chapter.id}`, { method: "POST", body: formData });
    alert("Upload thành công!");
  };

  return (
    <div className="p-4">
      <Button onClick={onBack} className="mb-4">← Quay lại</Button>
      <h2 className="text-xl font-bold mb-4">{chapter.title} - Upload Pages</h2>

      <div {...getRootProps()} className="border-2 border-dashed rounded p-6 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        <p>Kéo thả ảnh vào đây hoặc bấm để chọn file</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={files.map((f) => f.name)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {files.map((file) => (
              <SortableItem key={file.name} id={file.name} file={file} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </Button>
    </div>
  );
}

function SortableItem({ id, file }: { id: string; file: File }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="overflow-hidden">
      <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-48 object-cover" />
    </Card>
  );
}
