import React, { useState } from "react";
import { Form, Button, notification } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  Container,
  ModuleUploadWrapper,
  StyledForm,
} from "../../../../pages/ModuleFileUpload/ModuleFileUpload.styles";
import { uploadQuestionBankFile } from "../../../../../../api/FileProcessingApi"; // Adjust the import path as needed

const FileUpload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("dummy");
  const [isUploading, setIsUploading] = useState(false); // Add loading state

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const csvFiles = files.filter((file) => file.type === "text/csv");
    setFileList(csvFiles);
    if (csvFiles.length > 0) {
      setFileName(csvFiles[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (values) => {
    if (!selectedOption) {
        notification.error({
            message: "Please select a type of file",
            description: "Failed to upload file.",
            placement: "topRight",
            duration: 3,
        });
        return;
    }

    if (fileList.length <= 0) {
        notification.error({
            message: "Please upload a file",
            description: "Failed to upload file.",
            placement: "topRight",
            duration: 3,
        });
        return;
    }

    setIsUploading(true);

    try {
        const formData = new FormData();
        formData.append("file", fileList[0]);
        
        // Add any required additional fields
        // formData.append("type", "questionbank"); // Example
        
        // Log what we're sending
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await uploadQuestionBankFile(formData);
        
        notification.success({
            message: "Upload Successful",
            description: "File has been uploaded successfully.",
            placement: "topRight",
            duration: 5,
        });
        
        setFileName("");
        setFileList([]);
        form.resetFields();
    } catch (error) {
        console.error("Detailed upload error:", error);
        notification.error({
            message: "Upload Failed",
            description: error.message || "Failed to upload file. Please check the file format and try again.",
            placement: "topRight",
            duration: 5,
        });
    } finally {
        setIsUploading(false);
    }
};

  return (
    <ModuleUploadWrapper>
      <Container>
        <StyledForm form={form} onFinish={handleSubmit}>
          <Form.Item name="upload" className="dropdown-box2">
            <input
              type="file"
              accept=".csv"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload-input"
            />
            <div className="upload-btn-container">
              <div className="upload-button-text">
                Upload File
                <br />
                <span className="upload-file-name"> {fileName}</span>
                {fileList.length > 0 && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => {
                      setFileName("");
                      setFileList([]);
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <Button
                className="upload-button"
                onClick={() =>
                  document.getElementById('file-upload-input').click()
                }
                disabled={isUploading}
              >
                <MdOutlineFileUpload />{" "}
                {fileList.length > 0 ? "Replace" : "Upload"}{" "}
              </Button>
            </div>
          </Form.Item>
          <Form.Item className="submit-button-box">
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isUploading}
              disabled={isUploading || fileList.length === 0}
            >
              Submit
            </Button>
          </Form.Item>
        </StyledForm>
      </Container>
    </ModuleUploadWrapper>
  );
};

export default FileUpload;