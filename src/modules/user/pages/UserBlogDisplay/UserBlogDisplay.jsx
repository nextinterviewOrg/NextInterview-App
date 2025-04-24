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
import "../../../admin/pages/Blog/Blog.scss";
import { ShimmerCategoryItem, ShimmerPostItem, ShimmerThumbnail } from "react-shimmer-effects";

const UserBlogDisplay = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingOtherBlogs, setLoadingOtherBlogs] = useState(true);

  // Fetch the main blog by its id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch all blogs and filter out the current blog; then, limit to 4
  useEffect(() => {
    const fetchOtherBlogs = async () => {
      try {
        setLoadingOtherBlogs(true);
        const response = await getAllBlogs();
        const blogsArray = Array.isArray(response.data) ? response.data : [];
        const filteredBlogs = blogsArray
          .filter((blogItem) => blogItem._id !== id)
          .slice(0, 4);
        setOtherBlogs(filteredBlogs);
      } catch (err) {
        console.error("Error fetching other blogs:", err);
      } finally {
        setLoadingOtherBlogs(false);
      }
    };
    fetchOtherBlogs();
  }, [id]);

  const parseJSONContent = (content) => {
    if (!content) return "";
    try {
      if (typeof content === "string" && (content.trim().startsWith("{") || content.trim().startsWith("["))) {
        const parsedContent = JSON.parse(content);
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

  return (
    <Container>
      {loading ? (
        <div style={{ width: "100%" }}>
          <ShimmerThumbnail height={400} rounded />
          <ShimmerPostItem card title cta contentCount={5} />
        </div>
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
              {loadingOtherBlogs ? (
                Array(4).fill().map((_, index) => (
                  <article className="card__article" key={`shimmer-${index}`}>
                    <ShimmerThumbnail height={200} className="card__img" />
                    <div className="card__data">
                      <ShimmerPostItem title text cta={false} />
                    </div>
                  </article>
                ))
              ) : (
                otherBlogs.map((otherBlog) => (
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
                          __html: parseJSONContent(otherBlog.blog_description).slice(0, 35),
                        }}
                      ></span>
                      <Link 
                        to={`/user/blogs/${otherBlog?._id}`}
                        className="card__button"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default UserBlogDisplay;