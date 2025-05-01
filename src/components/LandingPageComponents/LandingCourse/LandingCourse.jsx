// // Component: DataInterviewTopics.jsx
// import React from "react";
// import {
//   Wrapper,
//   Heading,
//   Subheading,
//   CategoryFilters,
//   FilterButton,
//   CardGrid,
//   TopicCard,
//   CardImage,
//   CardContent,
//   CardTitle,
//   CardDescription,
//   CardFooter,
//   Tag,
//   StartButton
// } from "../LandingCourse/LandingCourse.style";
// import LandingHeader from "../LandingHeader";
// import { getModule } from "../../../../api/addNewModuleApi";

// const topics = [
//   {
//     title: "SQL – Basics to Advanced",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Data Science",
//     image: "/images/sql.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Applied machine learning",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Data Science",
//     image: "/images/ml.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Applied Statistics and probability",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Product Data Science",
//     image: "/images/stats.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Python Data structures",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Coding",
//     image: "/images/python-structures.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Python for data analysis",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Data Analyst",
//     image: "/images/python-analysis.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Guesstimates",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Product Data Science",
//     image: "/images/guesstimates.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   },
//   {
//     title: "Product data science",
//     description: "This learning path will teach you how to analyze data to gain insights, make smarter decisions.",
//     category: "Product Data Science",
//     image: "/images/product.jpg",
//     subTopics: 5,
//     duration: "Less than 2 hrs"
//   }
// ];

// const categories = ["All", "Data science", "Data analyst", "Product data science", "Coding"];

// const LandingCourse = () => {
//   const [selectedCategory, setSelectedCategory] = React.useState("All");

//   const filteredTopics = selectedCategory === "All"
//     ? topics
//     : topics.filter((t) => t.category === selectedCategory);

//   return (
//     <>
//      <LandingHeader />
//     <Wrapper>
       
//       <Heading>All Relevant Topics To Crack Your Next Data Interview</Heading>
//       <Subheading>
//         In 2025, acing data science interviews means mastering a wide array of subjects—statistical analysis, machine learning
//       </Subheading>
//       {/* <CategoryFilters>
//         {categories.map((cat) => (
//           <FilterButton
//             key={cat}
//             active={selectedCategory === cat}
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </FilterButton>
//         ))}
//       </CategoryFilters> */}
//       <CardGrid>
//         {filteredTopics.map((topic, index) => (
//           <TopicCard key={index}>
//             <CardImage src={topic.image} alt={topic.title} />
//             <CardContent>
//               {/* <Tag>{topic.category}</Tag> */}
//               <CardTitle>{topic.title}</CardTitle>
//               <CardDescription>{topic.description}</CardDescription>
//               <CardFooter>
//                 <span>{topic.subTopics} Topics</span>
//                 <span>{topic.duration}</span>
//               </CardFooter>
//               <StartButton>Start</StartButton>
//             </CardContent>
//           </TopicCard>
//         ))}
//       </CardGrid>
//     </Wrapper>
//     </>
//   );
// };

// export default LandingCourse;

import React, { useEffect, useState } from 'react'
import { UserLearningWrapper, Subheading } from '../LandingCourse/LandingCourse.style'
import { CiGrid41 } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getModule } from '../../../api/addNewModuleApi';
import api from '../../../config/axiosconfig';
import LandingHeader from '../LandingHeader/LandingHeader';
import LandingFooter from '../LandingFooter/LandingFooter';

export default function LandingCourse() {
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const[courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const apiCaller = async () => {
            try {
                const response = await getModule();
                
                console.log(response);
                const data= response.data.map((item) => {
                    return(
                        {
                            _id: item._id,
                            title: item.moduleName,
                            description: item.description,
                            topics: item.topicData.length,
                            duration: item.approxTimeTaken,
                            image: item.imageURL
                        }
                    )
                })
                setCourses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        apiCaller();
    }, [])

    // Filter courses based on search query
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <><LandingHeader />
        <UserLearningWrapper>
            <div className="courses-container">
                <div className="head-container">
                <div className="header-content">
                <div className="header">
                    <h1 className='header-title'>All Relevant Topics To Crack Your Next Data Interview</h1>
                  
                    {/* <div className="header-actions">
                        <input
                            type="text"
                            placeholder={` Search`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div> */}
                </div>
                <Subheading>
         In 2025, acing data science interviews means mastering a wide array of subjects—statistical analysis, machine learning
    </Subheading>

                </div>
                <div className="search-container">
                    <button className='search-button' onClick={() => { navigate(`/signup`) }}>
                        start practicing now
                    </button>
                </div>
                </div>

                

                {/* Course Cards Layout */}
                <div className="course-cards grid-view">
                    {filteredCourses.map((course, index) => (
                        <div key={index} className="course-card">
                            <img src={course.image} alt={course.title} className="course-image" />
                            <div className="course-details">
                                <h3 className='course-title'>{course.title}</h3>
                                <p className='course-description'>{course.description.slice(0,100)}...</p>
                                <div className="course-info">
                                    <span style={{marginRight:"40px"}}>{course.topics} topic</span> 
                                    <span>Less than {course.duration} hrs</span>
                                </div>
                            </div>

                            <div className="coursecard-bt-container">
                                <button className="start-btn" onClick={() => { navigate(`/signup`) }}>Start</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLearningWrapper>
        <LandingFooter />
        </>
    )
}

