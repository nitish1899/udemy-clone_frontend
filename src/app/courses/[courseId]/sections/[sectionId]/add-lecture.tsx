"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

export default function AddLecture({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const router = useRouter();

  // Load FFmpeg when the component mounts
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.loaded) {
        await ffmpeg.load();
        setIsFFmpegLoaded(true);
      }
    };
    loadFFmpeg();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const compressVideo = async (file: File) => {
    if (!isFFmpegLoaded) {
      console.error("FFmpeg is not loaded yet.");
      return file;
    }

    try {
      await ffmpeg.writeFile("input.mp4", await fetchFile(file));
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vcodec",
        "libx264",
        "output.mp4",
      ]);
      const compressedData = await ffmpeg.readFile("output.mp4");

      return new Blob([compressedData], { type: "video/mp4" });
    } catch (error) {
      console.error("Video compression failed:", error);
      return file; // Return original file if compression fails
    }
  };

  const handleUpload = async () => {
    if (!video) return;
    setIsUploading(true);

    try {
      const compressedVideo = await compressVideo(video);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", compressedVideo, "lecture.mp4");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${params.courseId}/sections/${params.sectionId}/lectures`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );
      router.push(`/courses/${params.courseId}`);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Lecture</h1>

      <Label>Lecture Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      <Label className="mt-4">Description</Label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />

      <Label className="mt-4">Upload Video</Label>
      <Input type="file" accept="video/*" onChange={handleFileChange} />

      {previewURL && (
        <video className="mt-4" controls width="100%" src={previewURL} />
      )}

      {isUploading && <Progress value={uploadProgress} className="mt-4" />}

      <Button onClick={handleUpload} disabled={isUploading} className="mt-4">
        {isUploading ? "Uploading..." : "Add Lecture"}
      </Button>
    </div>
  );
}
