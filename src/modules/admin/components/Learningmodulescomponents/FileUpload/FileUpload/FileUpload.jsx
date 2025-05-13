import React, { useState } from "react";
import { Form, Button, notification } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  Container,
  ModuleUploadWrapper,
  StyledForm,
} from "../../../../pages/ModuleFileUpload/ModuleFileUpload.styles";

const FileUpload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("dummy"); // Placeholder to avoid error

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

    notification.success({
      message: "Success",
      description: "File ready to be uploaded.",
    });

    // Upload logic goes here
    console.log("Submitting file:", fileList[0]);
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
                  document.querySelector('input[type="file"]').click()
                }
              >
                <MdOutlineFileUpload />{" "}
                {fileList.length > 0 ? "Replace" : "Upload"}{" "}
              </Button>
            </div>
          </Form.Item>
          <Form.Item className="submit-button-box">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </StyledForm>
      </Container>
    </ModuleUploadWrapper>
  );
};

export default FileUpload;
