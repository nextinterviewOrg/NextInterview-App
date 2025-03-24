import React, { useEffect, useState } from "react";
import {
  Container,
  ImageWrapper,
  Image,
  Card,
  Title,
} from "./QuicklyRevise.styles";
import { getModule } from "../../../../../api/addNewModuleApi";
import { ShimmerPostItem } from "react-shimmer-effects";
import { Link } from "react-router-dom";

const QuicklyRevise = () => {
  const [modules, setModules] = useState([]); // Store modules
  const [loading, setLoading] = useState(true); // Global loading for API call
  const [imageLoaded, setImageLoaded] = useState({}); // Track image load state for each module

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await getModule();
        if (response.success && Array.isArray(response.data)) {
          setModules(response.data);
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
  }, []);

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
        <p>No modules found.</p>
      )}
    </Container>
  );
};

export default QuicklyRevise;
