"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function FFmpegLoader() {
  useEffect(() => {
    console.log("FFmpeg script loaded!");
  }, []);

  return <Script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.10.0" />;
}
