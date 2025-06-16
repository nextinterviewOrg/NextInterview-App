import React, { useEffect, useState } from "react";
import { Select, Button, Form } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;

import {
  getModuleCode,
  getSubTopicCode,
  getTopicCode,
} from "../../../../api/addNewModuleApi";
import {
  uploadQuestionBankFile,
  uploadSkillAssessmentFile,
  uploadTryItYourselfFile,
} from "../../../../api/FileProcessingApi";
import {
  Container,
  Title,
  StyledForm,
  StyledSelect,
  SubmitButton,
  ModuleUploadWrapper,
} from "./ModuleFileUpload.styles";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
import { Input, notification } from "antd";
import ViewCodes from "../../components/Learningmodulescomponents/FileUpload/ViewCodes/ViewCodes";
import FileUpload from "../../components/Learningmodulescomponents/FileUpload/FileUpload/FileUpload";

const ModuleFileUpload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [subTopicOptions, setSubTopicOptions] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiCaller = async () => {
      const data = await getModuleCode();
      setModuleOptions(data.data);
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const apiCaller = async () => {
      if (!selectedModuleId) return;
      const data = await getTopicCode(selectedModuleId);
      setTopicOptions(data.data);
    };
    apiCaller();
  }, [selectedModuleId]);

  useEffect(() => {
    const apiCaller = async () => {
      if (!selectedTopicId || !selectedModuleId) return;
      const data = await getSubTopicCode(selectedModuleId, selectedTopicId);
      setSubTopicOptions(data.data);
    };
    apiCaller();
  }, [selectedTopicId]);

  const handleFileChange = (e) => {
    console.log("dsdwwsa")
    const files = Array.from(e.target.files);
    const csvFiles = files.filter((file) => file.type === "text/csv");
    setFileList(csvFiles);
    setFileName(csvFiles[0].name);
  };

  const handleSubmit = async (values) => {
    if (!selectedOption) {

      notification.error({
        message: "please select an type of file",  // Title of the notification
        description: "Failed to upload file.",  // Error message description
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    if (fileList.length <= 0) {
      notification.error({
        message: "Please upload a file",  // Title of the notification
        description: "Failed to upload file.",  // Error message description
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    const submissionData = {
      module_code: values.moduleCode,
      topic_code: values.topicCode,
      subtopic_code: values.subTopicCode,
      csv: fileList[0],
    };
    console.log(submissionData);
    try {
      switch (selectedOption) {
        case "1":
          const dataTIY = await uploadTryItYourselfFile(submissionData);
          break;
        case "2":
          const dataQB = await uploadQuestionBankFile(submissionData);
          break;
        case "3":
          const dataSA = await uploadSkillAssessmentFile(submissionData);
          break;
        default:

          break;
      }
      navigate("/admin/learning");
    } catch (e) {
      console.log(e);
    }
  };

  const handleModuleChange = (value) => {
    setSelectedModuleId(value);
    setSelectedTopicId(null);
    setSelectedSubtopicId(null);
    form.resetFields(["topicCode", "subTopicCode"]);
  };

  const handleTopicChange = (value) => {
    setSelectedTopicId(value);
    setSelectedSubtopicId(null);
    form.resetFields(["subTopicCode"]);
  };

  return (
    <ModuleUploadWrapper>
      <Container>
        <Tabs defaultActiveKey="2" centered>
          <TabPane tab="View Codes" key="1">
            <ViewCodes />
          </TabPane>

          <TabPane tab="File Upload" key="2">
            <FileUpload />
          </TabPane>

          <TabPane tab="Skill Assessment Upload" key="3">
            {/* <StyledForm form={form} onFinish={handleSubmit} layout="vertical"> */}
              <StyledForm form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  className="dropdown-box"
                  name="moduleCode"
                  rules={[
                    { required: true, message: "Please select a module code!" },
                  ]}
                >
                  <StyledSelect
                    placeholder="Select Module Code"
                    onChange={handleModuleChange}
                  >
                    {moduleOptions.map((option) => (
                      <Option key={option.module_code} value={option.module_code}>
                        {option.module_code + " -- " + option.module_name}
                      </Option>
                    ))}
                  </StyledSelect>
                </Form.Item>

                <Form.Item
                  className="dropdown-box"
                  name="topicCode"
                  rules={[{ required: true, message: "Please select a topic code!" }]}
                >
                  <StyledSelect
                    placeholder="Select Topic Code"
                    value={selectedTopicId} // Bind value to selectedTopicId
                    onChange={handleTopicChange} // Call handler to reset subtopics
                  >
                    {topicOptions.map((option) => (
                      <Option key={option.topic_code} value={option.topic_code}>
                        {option.topic_code + " -- " + option.topic_name}
                      </Option>
                    ))}
                  </StyledSelect>
                </Form.Item>

                <Form.Item name="subTopicCode" className="dropdown-box">
                  <StyledSelect
                    placeholder="Select Subtopic Code"
                    value={selectedSubtopicId}
                    onChange={(value) => {
                      setSelectedSubtopicId(value);
                    }}
                  >
                    {subTopicOptions.map((option) => (
                      <Option key={option.subTopic_code} value={option.subTopic_code}>
                        {option.subTopic_code + " -- " + option.subTopic_name}
                      </Option>
                    ))}
                  </StyledSelect>
                </Form.Item>

                <Form.Item name="assignmentType" className="dropdown-box">
                  <StyledSelect
                    placeholder="Select File Type"
                    onChange={(value) => setSelectedOption(value)}
                  >
                    {/* <Option value="1">Try It Yourself</Option>
              <Option value="2">Question Bank</Option> */}
                    <Option value="3">Skill Assessment</Option>
                  </StyledSelect>
                </Form.Item>

                {/* <Form.Item name="upload" className="dropdown-box2">
            <input
              type="file"
              accept=".csv"
              multiple
              onChange={handleFileChange }
              style={{ display: "none" }}
            />
            <div className="upload-btn-container">
              <div className="upload-button-text">
                Upload File
                <br></br>
                <span className="upload-file-name"> {fileName}</span>
                {fileList.length > 0 && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => {
                      setFileName(""), setFileList([]);
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
          </Form.Item> */}
                <Form.Item className="dropdown-box2">
                  <input
                    id="csvUploadInput"
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileChange(e)}
                    style={{ display: "none" }}
                  />
                  <div className="upload-btn-container">
                    <div className="upload-button-text">
                      Upload File
                      <br />
                      <span className="upload-file-name">
                        {fileList.length > 0 ? fileList[0].name : "No file selected"}
                      </span>
                      {fileList.length > 0 && (
                        <button
                          type="button"
                          className="clear-button"
                          onClick={() => {
                            setFileName("");
                            setFileList([]);
                            document.getElementById("csvUploadInput").value = null; // Clear input value
                          }}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <Button
                      className="upload-button"
                      onClick={() => document.getElementById("csvUploadInput").click()}
                    >
                      <MdOutlineFileUpload /> {fileList.length > 0 ? "Replace" : "Upload"}
                    </Button>
                  </div>
                </Form.Item>


                <Form.Item className="submit-button-box">
                  <SubmitButton className="submit-button" htmlType="submit">
                    Submit
                  </SubmitButton>
                </Form.Item>
              </StyledForm>
            {/* </StyledForm> */}
          </TabPane>
        </Tabs>
        {/* <Title>Learning Modules</Title> */}

      </Container>
    </ModuleUploadWrapper>
  );
};

export default ModuleFileUpload;
