import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import { FaUpload, FaEdit } from "react-icons/fa";
import theme from "../../../../../theme/Theme";
import {
  Container,
  Title,
  FormWrapper,
  ImageUploadContainer,
  UploadIcon,
  UploadText,
  RightSideWrapper,
  FormGroup,
  Label,
  Input,
  UploadButton,
  ButtonRow,
  ButtonGroup,
  Pagination,
  NavButton,
  TextAreaContainer,
  TextArea,
  PreviewImage,
  PreviewVideo,
  ReplaceButton,
  ErrorMessage,
} from "./Editupload.styles";
import {
  uploadFileToFirebase,
  uploadVideoToFirebase,
} from "../../../../../utils/uploadFileToFirebase";
import { getModuleById } from "../../../../../api/addNewModuleApi"; // Assuming the getModuleById API is available
import { updateModuleById } from "../../../../../api/addNewModuleApi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa"; // Import the update function

const Editupload = () => {
  const [moduleData, setModuleData] = useState({
    moduleName: "",
    description: "",
    approxTime: "",
    imageURL: "",
    interviewSampleURL: "",
    courseOverview: "",
    whatUsersLearn: [],
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [moduleImage, setModuleImage] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // To fetch module data passed via navigation

  const [sampleVideo, setSampleVideo] = useState(null); // for video preview
  const [imageError, setImageError] = useState("");
  const [moduleNameError, setModuleNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [approxTimeError, setApproxTimeError] = useState("");
  const [videoUrlError, setVideoUrlError] = useState("");
  const [courseOverviewError, setCourseOverviewError] = useState("");
  const [whatUsersLearnError, setWhatUsersLearnError] = useState("");
  const [moduleDataId, setModuleDataId] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  useEffect(() => {
    const moduleId = location.state?.moduleId;
    setModuleDataId(moduleId);
    if (moduleId) {
      fetchModuleData(moduleId);
    }
   
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome to show the confirmation alert
    };
   
    window.addEventListener("beforeunload", handleBeforeUnload);
   
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);

  const fetchModuleData = async (id) => {
    try {
      const data = await getModuleById(id); // Assuming this function fetches the data

      // Map the fetched data to state
      setModuleData({
        moduleName: data.data.moduleName || "",
        description: data.data.description || "",
        approxTime: Number(data.data.approxTimeTaken) || "",
        imageURL: data.data.imageURL || "",
        interviewSampleURL: data.data.interviewSampleURL || "",
        courseOverview: data.data.courseOverview || "",
        whatUsersLearn: data.data.userLearntData
          ? data.data.userLearntData.map((item) => item.learntData)
          : [],
      });
      setImageUrl(data.data.imageURL);
      setVideoUrl(data.data.interviewSampleURL);
    } catch (error) {
      console.log("Error fetching module data:", error);
    }
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setButtonDisabled(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setModuleImage(reader.result);
      };
      reader.readAsDataURL(file);

      const Url = await uploadFileToFirebase(file, "moduleImage");
      setModuleData((prevData) => ({ ...prevData, imageURL: Url }));
      setImageUrl(Url);
      setButtonDisabled(false);
      setImageError("");
    } else {
      setModuleImage(null);
      setImageUrl(null);
      setImageError("Please select a valid image file.");
    }
  };

  const handleReplaceImage = () => {
    imageInputRef.current.click();
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setButtonDisabled(true);
      const videoURL = URL.createObjectURL(file);
      setSampleVideo(videoURL); // This was missing, now it sets the video preview

      const url = await uploadVideoToFirebase(file, "moduleVideo");
      setModuleData((prevData) => ({ ...prevData, interviewSampleURL: url }));
      setVideoUrl(url);
      setButtonDisabled(false);
      setVideoUrlError("");
    } else {
      setSampleVideo(null);
      setVideoUrl(null);
      setVideoUrlError("Please select a valid video file.");
    }
  };

  const handleReplaceVideo = () => {
    videoInputRef.current.click();
  };

  const handleNext = async () => {
    try {
      // Reset errors
      setImageError("");
      setModuleNameError("");
      setDescriptionError("");
      setApproxTimeError("");
      setVideoUrlError("");
      setCourseOverviewError("");
      setWhatUsersLearnError("");

      let formIsValid = true;

      const moduleName = moduleData?.moduleName || "";
      const description = moduleData?.description || "";
      const approxTime = moduleData?.approxTime || "";
      const courseOverview = moduleData?.courseOverview || "";
      const whatUsersLearn = moduleData?.whatUsersLearn || [];

      // Validate Image
      if (!moduleImage) {
        setImageError("Please upload a module image.");
        formIsValid = false;
      }
      // Validate Module Name
      // if (!moduleName.trim()) {
      //   setModuleNameError("Please fill the module name.");
      //   formIsValid = false;
      //

      if (!moduleName) {
        setModuleNameError("Please fill the module name.");
        formIsValid = false;
      }
      // Validate Description
      if (!description) {
        setDescriptionError("Please enter a short description.");
        formIsValid = false;
      }
      // Validate Approx Time
      if (!approxTime) {
        setApproxTimeError("Please enter the approximate time taken.");
        formIsValid = false;
      }
      if (!videoUrl) {
        setVideoUrlError("Please upload a video sample.");
        formIsValid = false;
      }
      // Validate Course Overview
      if (!courseOverview) {
        setCourseOverviewError("Please provide a course overview.");
        formIsValid = false;
      }
      // Validate 'What Users Learn'
      if (
        whatUsersLearn.length === 0 ||
        whatUsersLearn.every((item) => !item.trim())
      ) {
        setWhatUsersLearnError("Please provide at least one learning point.");
        formIsValid = false;
      }

      // if (!formIsValid) return;

      // If valid, gather data & call update API
      const submissionData = {
        imageURL: imageUrl,
        moduleName: moduleName,
        description: description,
        approxTimeTaken: approxTime,
        interviewSampleURL: videoUrl,
        courseOverview: courseOverview,
        userLearntData: whatUsersLearn.map((item) => ({ learntData: item })),
      };

      // Call updateModuleById API
      try {
        const updatedModule = await updateModuleById(
          moduleDataId,
          submissionData
        ); // Use the ID from moduleData
        navigate(`/admin/editaddmodule/${moduleDataId}`, {
          state: { data: updatedModule, moduleId: moduleDataId },
        });
      } catch (error) {
        console.error("Error updating module:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>Edit Module Details</Title>
      <FormWrapper>
        <FormGroup>
          <Label htmlFor="moduleImage">Module Image</Label>
          <ImageUploadContainer onClick={handleImageClick}>
            {moduleData.imageURL ? (
              <PreviewImage src={moduleData.imageURL} alt="Module" />
            ) : (
              <UploadIcon>
                <RiImageAddLine size={48} />
              </UploadIcon>
            )}
          </ImageUploadContainer>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {moduleData.imageURL && (
            <ReplaceButton onClick={handleReplaceImage}>
              <FaEdit /> Replace Image
            </ReplaceButton>
          )}
          {imageError && <ErrorMessage>{imageError}</ErrorMessage>}
        </FormGroup>

        <RightSideWrapper>
          <FormGroup>
            <Label htmlFor="moduleName">Module Name</Label>
            <Input
              id="moduleName"
              type="text"
              maxLength={100}
              placeholder="Enter module name..."
              value={moduleData.moduleName || ""}
              onChange={(e) =>
                setModuleData({ ...moduleData, moduleName: e.target.value })
              }
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {moduleNameError && <ErrorMessage>{moduleNameError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              rows={2}
              maxLength={5000}
              placeholder="Enter a short description..."
              value={moduleData.description || ""}
              onChange={(e) =>
                setModuleData({ ...moduleData, description: e.target.value })
              }
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {descriptionError && (
              <ErrorMessage>{descriptionError}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="approxTime">Approximate Time Taken</Label>
            <Input
              id="approxTime"
              type="text"
              placeholder="e.g. 2 hours"
              value={moduleData.approxTime || ""}
              onChange={(e) =>
                setModuleData({ ...moduleData, approxTime: e.target.value })
              }
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {approxTimeError && <ErrorMessage>{approxTimeError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="sampleInterview">Upload Sample Interview</Label>
            <UploadButton onClick={() => videoInputRef.current.click()}>
              <FaUpload /> Upload
            </UploadButton>
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoChange}
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {moduleData.interviewSampleURL && (
              <PreviewVideo controls src={moduleData.interviewSampleURL} />
            )}
            {moduleData.interviewSampleURL && (
              <ReplaceButton onClick={handleReplaceVideo}>
                <FaEdit /> Replace Video
              </ReplaceButton>
            )}
            {videoUrlError && <ErrorMessage>{videoUrlError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="courseOverview">Course Overview</Label>
            <TextArea
              id="courseOverview"
              rows={2}
              placeholder="Enter a course overview..."
              value={moduleData.courseOverview || ""}
              onChange={(e) =>
                setModuleData({ ...moduleData, courseOverview: e.target.value })
              }
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {courseOverviewError && (
              <ErrorMessage>{courseOverviewError}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="whatUsersLearn">What Users Learn?</Label>
            <TextArea
              id="whatUsersLearn"
              rows={3}
              placeholder="Add points here..."
              value={
                moduleData.whatUsersLearn
                  ? moduleData.whatUsersLearn?.map((point) => `•${point}`).join("\n")
                  : ""
              }
 
              onChange={(e) =>
                setModuleData({
                  ...moduleData,
                  whatUsersLearn: e.target.value.split("\n")
                  .map((line) => line.replace(/^•?\s*/, "")),
                })
              }
              onBlur={() => setHasUnsavedChanges(true)}
            />
            {whatUsersLearnError && (
              <ErrorMessage>{whatUsersLearnError}</ErrorMessage>
            )}
          </FormGroup>
        </RightSideWrapper>
      </FormWrapper>

      <ButtonRow>
        <ButtonGroup>
          <Pagination>1 / 2</Pagination>
          <NavButton
            variant="primary"
            onClick={handleNext}
            disabled={buttonDisabled}
          >
            <FaArrowRight size={16} />Save and Next
          </NavButton>
        </ButtonGroup>
      </ButtonRow>
    </Container>
  );
};

export default Editupload;
