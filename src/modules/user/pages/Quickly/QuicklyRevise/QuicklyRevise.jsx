import React, { useEffect, useState } from "react";
import {
  Container,
  ImageWrapper,
  Image,
  Card,
  Title,
} from "./QuicklyRevise.styles";
import { getModule, getModuleById } from "../../../../../api/addNewModuleApi";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";
import { getcompletedModuleByUser, getUserProgress } from "../../../../../api/userProgressApi";
import Lottie from "lottie-react";
import dataNot from "../../../../../../src/assets/Lottie/5nvMVE1u7L.json";

const QuicklyRevise = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
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
          const module = await getModuleById(id);
          return module.data;
        }));
        console.log("allModules", allModules);
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

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <Container>
      {loading ? (
        // ShimmerThumbnail loading state
        [...Array(6)].map((_, index) => (
          <Card key={index} style={{ padding: 0 }}>
            <ShimmerThumbnail
              height={200}
              width="100%"
              rounded
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "200px",
                borderRadius: "8px 8px 0 0"
              }}
            />
            <div style={{ padding: "16px" }}>
              <ShimmerThumbnail
                height={24}
                width="80%"
                style={{
                  marginBottom: "8px",
                  borderRadius: "4px"
                }}
              />
              <ShimmerThumbnail
                height={16}
                width="60%"
                style={{
                  borderRadius: "4px"
                }}
              />
            </div>
          </Card>
        ))
      ) : modules.length > 0 ? (
        modules.map((module) => (
          <Link
            to={`/user/reviseModule/${module._id}`}
            style={{ textDecoration: "none" }}
            key={module._id}
          >
            <Card>
              <ImageWrapper>
                {!imageLoaded[module._id] && (
                  <ShimmerThumbnail
                    height={200}
                    width="100%"
                    rounded
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px"
                    }}
                  />
                )}
                <Image
                  src={module.imageURL || "https://via.placeholder.com/300"}
                  alt={module.moduleName}
                  onLoad={() => handleImageLoad(module._id)}
                  style={{
                    display: imageLoaded[module._id] ? "block" : "none",
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
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
            style={{
              // width: "100%", height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "50vh",      // full viewport height
              margin: 0,            // ensure no default margins
              padding: 0,
            }}
          />
        </>
      )}
    </Container>
  );
};

export default QuicklyRevise;