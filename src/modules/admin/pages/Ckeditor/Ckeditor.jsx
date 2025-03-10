import React, { useState } from "react";
import CKEditorDemo from "../../components/CKEditorDemo/CKEditorDemo";

export default function Ckeditor() {
  const [editorContent, setEditorContent] = useState("");
  return (
    <>
      <CKEditorDemo
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
    </>
  );
}
