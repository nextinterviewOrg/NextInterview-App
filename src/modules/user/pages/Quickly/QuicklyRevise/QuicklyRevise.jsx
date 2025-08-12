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
import {  getcompletedModuleByUser  } from "../../../../../api/userProgressApi";
import { getAllModuleswithQuickRevise} from "../../../../../api/addNewModuleApi";
import Lottie from "lottie-react";
import dataNot from "../../../../../../src/assets/Lottie/5nvMVE1u7L.json";

const QuicklyRevise = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const { user } = useUser();
  const [error, setError] = useState(null); 

   useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userData = await getUserByClerkId(user.id);
        
        // Get data in parallel
        const [quickReviseModules, userProgress] = await Promise.all([
          getAllModuleswithQuickRevise(userData.data.user._id),
          getcompletedModuleByUser(userData.data.user._id)
        ]);
        
        console.log("Quick Revise Modules:", quickReviseModules.data);
        console.log("User Progress:", userProgress.data);
        
        // Create Set for faster lookup - use moduleId from userProgress
        const completedModuleIds = new Set(
          userProgress.data.map(module => module.moduleId)
        );
        
        // Filter modules that have quick revise AND are completed
        const completedQuickReviseModules = quickReviseModules.data
          .filter(module => completedModuleIds.has(module._id)); // Changed to module._id
        
        console.log("Completed Quick Revise Modules:", completedQuickReviseModules);

        if (completedQuickReviseModules.length === 0) {
          setError("You can access Quick Revision after completing modules");
          setModules([]);
          return;
        }

        // Since quickReviseModules already contains all needed data, we can use it directly
        setModules(completedQuickReviseModules);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
        setError("Failed to load modules. Please try again later.");
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
      ) : error ? (
        <span style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", width:"90vw", height: "30vh", display:"flex", justifyContent:"center", alignItems:"center" }}>{error}</span>
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
          {/* <Lottie
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
          /> */}

          <span style={{  fontSize: "20px", fontWeight: "bold", textAlign: "center" ,width:"90vw", height: "30vh", display: "flex", justifyContent: "center", alignItems: "center"}}>&apos;You can access Quick Revision after completing the modules&apos;</span>
        </>
      )}
    </Container>
  );
};

export default QuicklyRevise;