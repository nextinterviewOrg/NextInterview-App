import React, { useEffect, useState } from "react";
import {
  Container,
  ImageWrapper,
  Image,
  Card,
  Title,
} from "./QuicklyRevise.styles";
import { getModule, getModuleById } from "../../../../../api/addNewModuleApi";
import { ShimmerPostItem } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { getcompletedModuleByUser, getUserProgress } from "../../../../../api/userProgressApi";
import Lottie from "lottie-react";
import  dataNot from "../../../../../../src/assets/Lottie/5nvMVE1u7L.json"

const QuicklyRevise = () => {
  const [modules, setModules] = useState([]); // Store modules
  const [loading, setLoading] = useState(true); // Global loading for API call
  const [imageLoaded, setImageLoaded] = useState({}); // Track image load state for each module
  const { user } = useUser();
  useEffect(() => {
    const fetchModules = async () => {
      try {
        console.log("user", user);
        const userData = await getUserByClerkId(user.id);
        const userProgress = await getcompletedModuleByUser(userData.data.user._id);
        console.log("userProgress", userProgress);
        const completedModules = userProgress.data.map((item) => item.moduleId);
        let allModules = await Promise.all(completedModules.map(async (id) => {
          const module = await getModuleById(id)
          return module.data;
        }))
        console.log("allModules", allModules);
        // const response = await getModule();
        // if (response.success && Array.isArray(response.data)) {
        if (Array.isArray(allModules)) {
          setModules(allModules);
        } else {
          throw new Error("Invalid API response format.");
        }
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [user]);

  // Handle image load for each module
  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({
      ...prev,
      [id]: true, // Set true when image is loaded
    }));
  };

  return (
    <Container>
      {loading ? (
        <>
          {/* ShimmerPostItem with 3 columns */}
          {[...Array(6)].map((_, index) => (
            <ShimmerPostItem
              key={index}
              card
              title
              cta
              imageHeight={200}
              contentCenter
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "300px",
              }}
            />
          ))}
        </>
      ) : modules.length > 0 ? (
        modules.map((module) => (
          <Link
            to={`/user/revise/${module._id}`}
            style={{ textDecoration: "none" }}
            key={module._id}
          >
            <Card>
              <ImageWrapper>
                {!imageLoaded[module._id] && (
                  <ShimmerPostItem
                    card
                    imageHeight={200}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <Image
                  src={module.imageURL || "https://via.placeholder.com/300"}
                  alt={module.moduleName}
                  onLoad={() => handleImageLoad(module._id)}
                  style={{
                    display: imageLoaded[module._id] ? "block" : "none",
                  }}
                />
              </ImageWrapper>

              <Title>{module.moduleName}</Title>
            </Card>
          </Link>
        ))
      ) : (
        <>
          <Lottie
            className="Lottie"
            animationData={dataNot}
            loop={true}
            style={{ width: "40%", height: "20%" }}
          />
          {/* <p>No modules found.</p> */}
        </>
      )}
    </Container>
  );
};

export default QuicklyRevise;
