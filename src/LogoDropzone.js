import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function LogoDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    // Simulate server call
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        console.log("File uploaded!");
      })
      .catch((err) => {
        console.error("Upload error:", err);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #aaa",
        padding: "2rem",
        textAlign: "center",
        marginTop: "1rem",
      }}
    >
      <input {...getInputProps()} data-testid="file-input" />
      {isDragActive ? (
        <p>Drop the logo here ...</p>
      ) : (
        <p>Drag and drop your logo here, or click to select</p>
      )}
    </div>
  );
}

export default LogoDropzone;
