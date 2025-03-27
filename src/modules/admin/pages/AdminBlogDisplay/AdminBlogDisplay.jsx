import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogById, getAllBlogs } from "../../../../api/blogApi";
import {
  ImageContainer,
  Container,
  Image,
  Title,
  Content,
} from "../../../admin/pages/AdminBlogDisplay/AdminBlogDisplay.styles";
// Import your SCSS file for the card animations
import "../Blog/Blog.scss"; // Adjust the path as needed

const AdminBlogDisplay = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the main blog by its id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response.data);
        
      } catch (err) {
        setError(err);
      }finally{
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch all blogs and filter out the current blog; then, limit to 4
  useEffect(() => {
    const fetchOtherBlogs = async () => {
      try {
        const response = await getAllBlogs();
        const blogsArray = Array.isArray(response.data) ? response.data : [];
        const filteredBlogs = blogsArray
          .filter((blogItem) => blogItem._id !== id)
          .slice(0, 4);
        setOtherBlogs(filteredBlogs);
      } catch (err) {
        console.error("Error fetching other blogs:", err);
      }
    };
    fetchOtherBlogs();
  }, [id]);
const shimmerItems = Array(4).fill(null);
  return (
    <Container>
      <div>
       {loading ? (
         shimmerItems.map((_, index) => (
           <ShimmerCategoryItem key={index} line={5} gap={10} />
         ))
       ) : (
          <>
            <ImageContainer>
              <Image src={blog.blog_image} alt={blog.blog_title} />
            </ImageContainer>
            <Title>{blog.blog_title}</Title>
            <Content>
              <div dangerouslySetInnerHTML={{ __html: blog.blog_description }} />
            </Content>

            {/* Other Blogs Section */}
            <div className="container">
              <h2 style={{ marginBottom: "2rem" }}>Other Blogs</h2>
              <div className="card__container">
                {otherBlogs.map((otherBlog) => (
                  <article className="card__article" key={otherBlog._id}>
                    <img
                      src={otherBlog.blog_image || "/placeholder.jpg"}
                      alt={otherBlog.blog_title}
                      className="card__img"
                    />
                    <div className="card__data">
                      <h3 className="card__title">{otherBlog.blog_title}</h3>
                      <span
                                    className="card__description"
                                    dangerouslySetInnerHTML={{
                                        __html: parseJSONContent(blog.blog_description).slice(0, 35),
                                    }}
                                ></span>

                      <Link to={`/admin/real-world-scenario/${otherBlog?._id}`}
                        className="card__button"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

const parseJSONContent = (content) => {
    if (!content) return ""; // return an empty string if content is undefined or null
    try {
        if (typeof content === "string" && (content.trim().startsWith("{") || content.trim().startsWith("["))) {
            const parsedContent = JSON.parse(content);
            // If parsed content is not a string, convert it to a string
            return typeof parsedContent === "string"
                ? parsedContent
                : JSON.stringify(parsedContent);
        }
        return content;
    } catch (error) {
        console.error("Error parsing JSON content:", error);
        return "";
    }
};


export default AdminBlogDisplay;
