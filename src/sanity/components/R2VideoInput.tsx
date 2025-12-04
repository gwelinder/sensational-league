"use client";

import { useCallback, useState, useRef } from "react";
import { set, unset, StringInputProps } from "sanity";
import { Card, Stack, Text, Button, Flex, Spinner, Box } from "@sanity/ui";
import { UploadIcon, TrashIcon, PlayIcon } from "@sanity/icons";

// Upload directly to the Worker (which has R2 binding)
const WORKER_UPLOAD_URL = "https://sensational-hero-video.generaite.workers.dev/captains/";

interface UploadResponse {
  success: boolean;
  publicUrl: string;
  key: string;
  error?: string;
}

export function R2VideoInput(props: StringInputProps) {
  const { onChange, value, elementProps } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file");
        return;
      }

      // Max 100MB
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be under 100MB");
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      try {
        // Get API key from env
        const apiKey = process.env.NEXT_PUBLIC_UPLOAD_API_KEY || "";

        if (!apiKey) {
          throw new Error("Upload API key not configured. Set NEXT_PUBLIC_UPLOAD_API_KEY in environment.");
        }

        // Upload directly to Worker
        const xhr = new XMLHttpRequest();

        const response = await new Promise<UploadResponse>((resolve, reject) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(percent);
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
              } catch {
                reject(new Error("Invalid response from server"));
              }
            } else {
              try {
                const err = JSON.parse(xhr.responseText);
                reject(new Error(err.error || `Upload failed with status ${xhr.status}`));
              } catch {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            }
          });

          xhr.addEventListener("error", () => {
            reject(new Error("Upload failed - network error"));
          });

          // POST to worker with file in body
          xhr.open("POST", WORKER_UPLOAD_URL);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.setRequestHeader("X-API-Key", apiKey);
          xhr.send(file);
        });

        if (!response.success) {
          throw new Error(response.error || "Upload failed");
        }

        // Save the public URL to the field
        onChange(set(response.publicUrl));
        setUploadProgress(100);
      } catch (err) {
        console.error("Upload error:", err);
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClear = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Stack space={3}>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {value ? (
        // Show current video
        <Card padding={3} radius={2} shadow={1} tone="positive">
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <PlayIcon />
              <Text size={1} weight="semibold">
                Video uploaded to R2
              </Text>
            </Flex>

            <Box
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                background: "#000",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <video
                src={value}
                controls
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Text size={1} muted style={{ wordBreak: "break-all" }}>
              {value}
            </Text>

            <Flex gap={2}>
              <Button
                tone="default"
                icon={UploadIcon}
                text="Replace"
                onClick={handleBrowseClick}
                disabled={isUploading}
              />
              <Button
                tone="critical"
                icon={TrashIcon}
                text="Remove"
                onClick={handleClear}
                disabled={isUploading}
              />
            </Flex>
          </Stack>
        </Card>
      ) : (
        // Upload zone
        <Card
          padding={5}
          radius={2}
          shadow={1}
          tone={isDragging ? "primary" : "default"}
          style={{
            border: isDragging ? "2px dashed var(--card-focus-ring-color)" : "2px dashed var(--card-border-color)",
            cursor: isUploading ? "wait" : "pointer",
            textAlign: "center",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={isUploading ? undefined : handleBrowseClick}
        >
          <Stack space={3}>
            {isUploading ? (
              <>
                <Flex justify="center">
                  <Spinner />
                </Flex>
                <Text size={1} align="center">
                  Uploading to R2... {uploadProgress}%
                </Text>
                <Box
                  style={{
                    height: "4px",
                    background: "var(--card-border-color)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    style={{
                      height: "100%",
                      width: `${uploadProgress}%`,
                      background: "var(--card-focus-ring-color)",
                      transition: "width 0.2s",
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Flex justify="center">
                  <UploadIcon style={{ fontSize: "2rem" }} />
                </Flex>
                <Text size={2} weight="semibold" align="center">
                  Upload video to R2
                </Text>
                <Text size={1} muted align="center">
                  Drag & drop or click to browse
                </Text>
                <Text size={0} muted align="center">
                  MP4 recommended, max 100MB
                </Text>
              </>
            )}
          </Stack>
        </Card>
      )}

      {error && (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      {/* Hidden native input for fallback/manual URL entry */}
      <details style={{ marginTop: "8px" }}>
        <summary style={{ cursor: "pointer", fontSize: "12px", color: "var(--card-muted-fg-color)" }}>
          Or paste URL manually
        </summary>
        <Box marginTop={2}>
          <input
            {...elementProps}
            type="url"
            value={value || ""}
            onChange={(e) => {
              const newValue = e.target.value;
              onChange(newValue ? set(newValue) : unset());
            }}
            placeholder="https://..."
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--card-border-color)",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </Box>
      </details>
    </Stack>
  );
}
