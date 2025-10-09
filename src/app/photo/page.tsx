"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MousePointer2,
  Brush,
  Eraser,
  Square,
  Type,
  PaintBucket,
  Pipette,
  Undo2,
  Redo2,
  Save,
  Image as ImageIcon,
  Layers as LayersIcon,
  ZoomIn,
  ZoomOut,
  Trash2,
  Eye,
  EyeOff,
  Download,
  FolderPlus,
  Settings,
} from "lucide-react";

// One-file Photoshop-like editor (page.tsx)
// Requirements: Next.js app router, TailwindCSS, lucide-react installed
// Drop into app/<path>/page.tsx (or adapt export for pages/)

type Layer = {
  id: string;
  name: string;
  type: "raster" | "image" | "text";
  visible: boolean;
  opacity: number;
  blend: string; // currently only 'normal'
  // raster/image
  canvas?: HTMLCanvasElement | null; // offscreen canvas reference
  img?: HTMLImageElement | null;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  // text
  text?: string;
  fontSize?: number;
  color?: string;
};

export default function PhotoshopMockupPage() {
  const viewRef = useRef<HTMLDivElement | null>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null); // composited view for export/preview

  const [tool, setTool] = useState<"brush" | "eraser" | "rect" | "move" | "fill" | "text" | "picker">("brush");
  const [color, setColor] = useState<string>("#111827");
  const [size, setSize] = useState<number>(12);
  const [opacity, setOpacity] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isPanning = useRef(false);
  const lastPan = useRef<{ x: number; y: number } | null>(null);

  const [layers, setLayers] = useState<Layer[]>(() => [
    { id: "base", name: "Background", type: "raster", visible: true, opacity: 1, blend: "normal", canvas: null },
  ]);
  const [activeLayerId, setActiveLayerId] = useState<string>("base");

  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const MAX_UNDO = 50;

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // initialize offscreen canvases when mounting
  useEffect(() => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const DPR = window.devicePixelRatio || 1;
    const w = Math.max(1200, Math.floor(rect.width || 1200));
    const h = Math.max(700, Math.floor(rect.height || 700));
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    // create offscreen canvas for any layer that lacks one
    setLayers((prev) => prev.map((l) => {
      if (!l.canvas && l.type === "raster") {
        const c = document.createElement("canvas");
        c.width = w * DPR;
        c.height = h * DPR;
        c.style.width = w + "px";
        c.style.height = h + "px";
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.scale(DPR, DPR);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
        }
        return { ...l, canvas: c };
      }
      return l;
    }));

    // push initial state
    setTimeout(() => pushUndo(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper: get layer by id
  const getLayer = useCallback((id: string) => layers.find((l) => l.id === id), [layers]);

  // push undo: store dataURLs of all layer canvases (simple approach)
  const pushUndo = useCallback(() => {
    try {
      const snapshot = JSON.stringify(layers.map((l) => ({ id: l.id, name: l.name, type: l.type, visible: l.visible, opacity: l.opacity })));
      // store composite image as dataURL (cheap)
      const main = mainCanvasRef.current;
      if (!main) return;
      const data = main.toDataURL("image/png");
      undoStack.current.push(data + "|" + snapshot);
      if (undoStack.current.length > MAX_UNDO) undoStack.current.shift();
      redoStack.current = [];
    } catch (e) {
      console.warn("pushUndo failed", e);
    }
  }, [layers]);

  const doUndo = useCallback(() => {
    if (undoStack.current.length <= 1) return;
    const last = undoStack.current.pop();
    if (!last) return;
    redoStack.current.push(last);
    const prev = undoStack.current[undoStack.current.length - 1];
    if (!prev) return;
    const [data] = prev.split("|");
    const img = new Image();
    img.onload = () => {
      const ctx = mainCanvasRef.current?.getContext("2d");
      if (!ctx || !mainCanvasRef.current) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
      ctx.drawImage(img, 0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
    };
    img.src = data;
  }, []);

  const doRedo = useCallback(() => {
    const item = redoStack.current.pop();
    if (!item) return;
    const [data] = item.split("|");
    const img = new Image();
    img.onload = () => {
      const ctx = mainCanvasRef.current?.getContext("2d");
      if (!ctx || !mainCanvasRef.current) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
      ctx.drawImage(img, 0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
      undoStack.current.push(item);
    };
    img.src = data;
  }, []);

  // composite layers onto main canvas (for preview/export)
  const compositeAll = useCallback(() => {
    const main = mainCanvasRef.current;
    if (!main) return;
    const ctx = main.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, main.width, main.height);

    const DPR = window.devicePixelRatio || 1;
    const w = main.width;
    const h = main.height;

    layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.globalAlpha = layer.opacity;
      if (layer.type === "raster" && layer.canvas) {
        ctx.drawImage(layer.canvas, 0, 0, w, h);
      } else if (layer.type === "image" && layer.img) {
        const x = (layer.x || 0) * DPR;
        const y = (layer.y || 0) * DPR;
        const ww = (layer.w || (layer.img.width / DPR)) * DPR;
        const hh = (layer.h || (layer.img.height / DPR)) * DPR;
        ctx.drawImage(layer.img, x, y, ww, hh);
      } else if (layer.type === "text") {
        ctx.save();
        ctx.scale(DPR, DPR);
        ctx.globalAlpha = layer.opacity;
        ctx.fillStyle = layer.color || "#000";
        ctx.font = `${layer.fontSize || 28}px sans-serif`;
        ctx.fillText(layer.text || "", layer.x || 0, (layer.y || 0) + (layer.fontSize || 28));
        ctx.restore();
      }
    });
    ctx.globalAlpha = 1;
  }, [layers]);

  // Whenever layers change, re-composite
  useEffect(() => {
    compositeAll();
  }, [layers, compositeAll]);

  // pointer events handling on the visible overlay
  const handlePointerDown = (e: React.PointerEvent) => {
    const main = mainCanvasRef.current;
    if (!main || !viewRef.current) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    const rect = main.getBoundingClientRect();
    const DPR = window.devicePixelRatio || 1;
    const x = Math.round(((e.clientX - rect.left) - offset.x) / zoom);
    const y = Math.round(((e.clientY - rect.top) - offset.y) / zoom);

    if (tool === "move") {
      isPanning.current = true;
      lastPan.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (tool === "text") {
      const id = "text_" + Date.now();
      const l: Layer = { id, name: "Text", type: "text", visible: true, opacity: 1, blend: "normal", text: "Double-click to edit", fontSize: 28, color, x, y };
      setLayers((prev) => [...prev, l]);
      setActiveLayerId(id);
      pushUndo();
      return;
    }

    if (tool === "fill") {
      // Fill active raster layer with color
      const layer = getLayer(activeLayerId);
      if (!layer) return;
      if (layer.type === "raster") {
        const c = layer.canvas!;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.restore();
        setLayers((prev) => prev.map((p) => p.id === layer.id ? { ...p } : p));
        pushUndo();
      }
      return;
    }

    // brush or eraser start
    const layer = getLayer(activeLayerId);
    if (!layer) return;
    if (layer.type !== "raster") return;

    setIsDrawing(true);
    lastPoint.current = { x, y };

    // draw a point
    const c = layer.canvas!;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    ctx.globalAlpha = opacity;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.01, y + 0.01);
    ctx.stroke();
    ctx.restore();

    setLayers((prev) => prev.map((p) => p.id === layer.id ? { ...p } : p));
    pushUndo();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const main = mainCanvasRef.current;
    if (!main) return;
    const rect = main.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) - offset.x) / zoom);
    const y = Math.round(((e.clientY - rect.top) - offset.y) / zoom);

    if (isPanning.current && lastPan.current) {
      const dx = e.clientX - lastPan.current.x;
      const dy = e.clientY - lastPan.current.y;
      lastPan.current = { x: e.clientX, y: e.clientY };
      setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
      return;
    }

    if (!isDrawing || !lastPoint.current) return;
    const layer = getLayer(activeLayerId);
    if (!layer || layer.type !== "raster" || !layer.canvas) return;
    const ctx = layer.canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    ctx.globalAlpha = opacity;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();

    lastPoint.current = { x, y };
    setLayers((prev) => prev.map((p) => p.id === layer.id ? { ...p } : p));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (isPanning.current) {
      isPanning.current = false;
      lastPan.current = null;
      return;
    }
    if (isDrawing) {
      setIsDrawing(false);
      lastPoint.current = null;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.altKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setZoom((z) => Math.max(0.2, Math.min(4, +(z + delta).toFixed(2))));
    } else if (e.shiftKey) {
      setOffset((o) => ({ x: o.x - e.deltaY, y: o.y }));
    }
  };

  // add image file as new layer
  const handleFile = (file?: File) => {
    const f = file || (inputFileRef.current?.files?.[0] ?? null);
    if (!f) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      const id = "img_" + Date.now();
      const DPR = window.devicePixelRatio || 1;
      const canvas = mainCanvasRef.current!;
      const naturalW = img.width / DPR;
      const naturalH = img.height / DPR;
      const layer: Layer = {
        id,
        name: f.name,
        type: "image",
        visible: true,
        opacity: 1,
        blend: "normal",
        img,
        x: 50,
        y: 50,
        w: naturalW,
        h: naturalH,
      };
      setLayers((prev) => [...prev, layer]);
      setActiveLayerId(id);
      pushUndo();
    };
    img.src = url;
  };

  // export: composite at full pixel size and download
  const handleExport = () => {
    const main = mainCanvasRef.current;
    if (!main) return;
    const DPR = window.devicePixelRatio || 1;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = main.width;
    exportCanvas.height = main.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;
    // draw each layer
    layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.globalAlpha = layer.opacity;
      if (layer.type === "raster" && layer.canvas) {
        ctx.drawImage(layer.canvas, 0, 0, exportCanvas.width, exportCanvas.height);
      } else if (layer.type === "image" && layer.img) {
        const x = (layer.x || 0) * DPR;
        const y = (layer.y || 0) * DPR;
        const ww = (layer.w || (layer.img.width / DPR)) * DPR;
        const hh = (layer.h || (layer.img.height / DPR)) * DPR;
        ctx.drawImage(layer.img, x, y, ww, hh);
      } else if (layer.type === "text") {
        ctx.save();
        ctx.scale(DPR, DPR);
        ctx.globalAlpha = layer.opacity;
        ctx.fillStyle = layer.color || "#000";
        ctx.font = `${layer.fontSize || 28}px sans-serif`;
        ctx.fillText(layer.text || "", layer.x || 0, (layer.y || 0) + (layer.fontSize || 28));
        ctx.restore();
      }
    });
    ctx.globalAlpha = 1;
    const link = document.createElement("a");
    link.download = "mockup_export.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const addEmptyLayer = (name = "Layer") => {
    const id = "layer_" + Date.now();
    const DPR = window.devicePixelRatio || 1;
    const main = mainCanvasRef.current!;
    const c = document.createElement("canvas");
    c.width = main.width;
    c.height = main.height;
    c.style.width = main.style.width;
    c.style.height = main.style.height;
    const ctx = c.getContext("2d");
    if (ctx) ctx.scale(DPR, DPR);
    const layer: Layer = { id, name, type: "raster", visible: true, opacity: 1, blend: "normal", canvas: c };
    setLayers((prev) => [...prev, layer]);
    setActiveLayerId(id);
    pushUndo();
  };

  const deleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (activeLayerId === id) setActiveLayerId(layers[0]?.id ?? "");
    pushUndo();
  };

  const toggleLayerVisibility = (id: string) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const renameLayer = (id: string, name: string) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, name } : l));
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === "z") { e.shiftKey ? doRedo() : doUndo(); }
        if (e.key.toLowerCase() === "y") doRedo();
        if (e.key.toLowerCase() === "s") { e.preventDefault(); handleExport(); }
      }
      if (e.key === "b") setTool("brush");
      if (e.key === "e") setTool("eraser");
      if (e.key === "m") setTool("move");
      if (e.key === "t") setTool("text");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doRedo, doUndo]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 text-sm">
      {/* Top bar */}
      <header className="flex items-center gap-2 bg-white border-b p-2 shadow-sm">
        <button onClick={doUndo} className="p-2 hover:bg-gray-100 rounded" title="Undo (Ctrl+Z)"><Undo2 /></button>
        <button onClick={doRedo} className="p-2 hover:bg-gray-100 rounded" title="Redo (Ctrl+Y)"><Redo2 /></button>
        <button onClick={() => { addEmptyLayer('Layer'); }} className="p-2 hover:bg-gray-100 rounded" title="New Layer"><FolderPlus /></button>
        <button onClick={() => inputFileRef.current?.click()} className="p-2 hover:bg-gray-100 rounded" title="Import image"><ImageIcon /></button>
        <input ref={inputFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile()} />
        <button onClick={handleExport} className="p-2 hover:bg-gray-100 rounded" title="Export"><Download /></button>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 border rounded">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="range" min={1} max={200} value={size} onChange={(e) => setSize(+e.target.value)} className="w-28" />
            <input type="range" min={0.05} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-24" />
          </div>
          <button onClick={() => setZoom((z) => Math.min(4, +(z + 0.1).toFixed(2)))} className="p-2 hover:bg-gray-100 rounded" title="Zoom In"><ZoomIn /></button>
          <button onClick={() => setZoom((z) => Math.max(0.2, +(z - 0.1).toFixed(2)))} className="p-2 hover:bg-gray-100 rounded" title="Zoom Out"><ZoomOut /></button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left tools */}
        <aside className="w-20 p-3 bg-white border-r flex flex-col gap-3">
          <button className={`p-2 rounded ${tool === "move" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("move")} title="Move (M)"><MousePointer2 /></button>
          <button className={`p-2 rounded ${tool === "brush" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("brush")} title="Brush (B)"><Brush /></button>
          <button className={`p-2 rounded ${tool === "eraser" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("eraser")} title="Eraser (E)"><Eraser /></button>
          <button className={`p-2 rounded ${tool === "rect" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("rect")} title="Rectangle"><Square /></button>
          <button className={`p-2 rounded ${tool === "text" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("text")} title="Text (T)"><Type /></button>
          <button className={`p-2 rounded ${tool === "fill" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("fill")} title="Fill"><PaintBucket /></button>
          <button className={`p-2 rounded ${tool === "picker" ? "bg-sky-100" : "hover:bg-gray-100"}`} onClick={() => setTool("picker")} title="Eyedropper"><Pipette /></button>
          <div className="mt-auto space-y-2">
            <button className="w-full p-2 rounded bg-green-500 text-white" onClick={() => inputFileRef.current?.click()} title="Import image"><ImageIcon /></button>
            <button className="w-full p-2 rounded bg-blue-600 text-white" onClick={handleExport} title="Export"><Download /></button>
          </div>
        </aside>

        {/* Canvas area */}
        <main className="flex-1 relative bg-gray-200 flex items-center justify-center overflow-auto" onWheel={handleWheel}>
          <div
            ref={viewRef}
            className="relative"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: "0 0" }}
          >
            {/* composited main canvas for preview - invisible input surface */}
            <canvas ref={mainCanvasRef} className="block border shadow bg-white" style={{ minWidth: 1200, minHeight: 700 }} />

            {/* Transparent overlay for pointer capture */}
            <div
              style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />

            {/* Render individual layer DOM overlays (text & image transform handles) */}
            {layers.map((layer) => {
              if (!layer.visible) return null;
              if (layer.type === "text") {
                return (
                  <div
                    key={layer.id}
                    style={{ position: "absolute", left: (layer.x || 0), top: (layer.y || 0), transform: `scale(${zoom})`, transformOrigin: "top left" }}
                  >
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => renameLayer(layer.id, (e.target as HTMLElement).innerText)}
                      style={{ fontSize: (layer.fontSize ?? 28) + "px", color: layer.color ?? "#000" }}
                      onDoubleClick={() => setActiveLayerId(layer.id)}
                    >
                      {layer.text}
                    </div>
                  </div>
                );
              }
              if (layer.type === "image" && layer.img) {
                return (
                  <img
                    key={layer.id}
                    src={layer.img.src}
                    alt={layer.name}
                    style={{ position: "absolute", left: layer.x, top: layer.y, width: layer.w, height: layer.h, transform: `scale(${zoom})`, transformOrigin: "top left", pointerEvents: "none" }}
                    draggable={false}
                  />
                );
              }
              return null;
            })}
          </div>
        </main>

        {/* Right: Layers panel */}
        <aside className="w-64 bg-white border-l flex flex-col">
          <div className="flex items-center justify-between p-2 border-b bg-gray-50">
            <span className="font-medium flex items-center gap-1"><LayersIcon size={16} /> Layers</span>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-gray-100 rounded" title="New Layer" onClick={() => addEmptyLayer()}><FolderPlus size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded" title="Import" onClick={() => inputFileRef.current?.click()}><ImageIcon size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {layers.slice().reverse().map((layer) => (
              <div key={layer.id} className={`flex items-center justify-between px-2 py-1 text-xs cursor-pointer ${activeLayerId === layer.id ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2" onClick={() => setActiveLayerId(layer.id)}>
                  <button className="p-1" onClick={() => toggleLayerVisibility(layer.id)}>
                    {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <div>
                    <input value={layer.name} onChange={(e) => renameLayer(layer.id, e.target.value)} className="text-sm border p-1 rounded w-32" />
                    <div className="flex gap-1 mt-1 items-center">
                      <label className="text-xs">Opacity</label>
                      <input type="range" min={0} max={1} step={0.05} value={layer.opacity} onChange={(e) => setLayers((prev) => prev.map((l) => l.id === layer.id ? { ...l, opacity: +e.target.value } : l))} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded" onClick={() => deleteLayer(layer.id)} title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-2 flex items-center gap-2 text-xs">
            <button className="flex-1 flex items-center gap-1 p-1 border rounded hover:bg-gray-50" onClick={() => pushUndo()}><Save size={14} /> Snapshot</button>
            <button className="flex-1 flex items-center gap-1 p-1 border rounded hover:bg-gray-50" onClick={() => { undoStack.current = []; redoStack.current = []; pushUndo(); }}><Settings size={14} /> Reset</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
