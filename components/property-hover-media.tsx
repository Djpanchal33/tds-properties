"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Property } from "@/lib/types";

export default function PropertyHoverMedia({ property, className = "" }: { property: Property; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(property.videoUrl);

  const start = async () => {
    if (!canPlay || !videoRef.current) return;
    setPlaying(true);
    try { await videoRef.current.play(); } catch { setPlaying(false); }
  };
  const stop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlaying(false);
  };

  return <div className={`relative h-full w-full overflow-hidden ${className}`} onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop}>
    <img src={property.images[0]} alt={property.title} className={`h-full w-full object-cover transition duration-700 ${playing ? "scale-105 opacity-0" : "group-hover:scale-105"}`} />
    {canPlay && <>
      <video ref={videoRef} muted loop playsInline preload="metadata" poster={property.images[0]} className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${playing ? "scale-105 opacity-100" : "opacity-0"}`} aria-label={`${property.title} property video`}>
        <source src={property.videoUrl} />
      </video>
      {!playing && <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-navy/85 px-3 py-1.5 text-[.65rem] font-bold uppercase tracking-wider text-cream"><Play size={13} fill="currentColor" /> Video on hover</span>}
    </>}
  </div>;
}
