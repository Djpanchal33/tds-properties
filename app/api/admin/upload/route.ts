import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN is missing. Create or connect a Vercel Blob store, then add its read-write token to this project." }, { status: 503 });
  }
  try {
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("tds/")) throw new Error("Invalid upload path.");
        const isVideo = /\.(mp4|webm)$/i.test(pathname);
        return {
          addRandomSuffix: true,
          maximumSizeInBytes: isVideo ? 100_000_000 : 8_000_000,
          allowedContentTypes: isVideo ? ["video/mp4", "video/webm"] : ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
        };
      },
      onUploadCompleted: async () => {
        // The public URL is returned directly to the browser by the Blob client.
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Blob upload error";
    console.error("Blob upload setup failed:", message);
    return NextResponse.json({ error: `Video upload could not start: ${message}` }, { status: 500 });
  }
}
