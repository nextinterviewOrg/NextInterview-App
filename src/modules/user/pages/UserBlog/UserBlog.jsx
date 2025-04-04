import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../api/blogApi";
import { Editor } from "@tinymce/tinymce-react";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import { message } from "antd";
import { TinyMCEapiKey, TinyMCEplugins, TinyMCEToolbar } from "../../../../config/TinyMceConfig";
import "../../../admin/pages/Blog/Blog.scss";
import { Link } from "react-router-dom";
import { ShimmerThumbnail } from "react-shimmer-effects";

const BlogForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getAllBlogs();
                if (Array.isArray(response.data)) {
                    setBlogs(response.data);
                } else {
                    setError("Unexpected response format.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError(error.message);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ marginLeft: "60px" }}>Blog List</h2>

            <div className="container">
                <div className="card__container">
                    {loading ? (
                        // Show 8 shimmer effects in a grid layout
                        <>
                            {[...Array(8)].map((_, index) => (
                                <article 
                                    key={index} 
                                    className="card__article shimmer-article"
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <ShimmerThumbnail 
                                        height={250}
                                        width={300}
                                        rounded
                                        style={{
                                            borderRadius: "24px",
                                            width: "300px",
                                            height: "250px"
                                        }}
                                    />
                                    <div className="shimmer-data">
                                        <ShimmerThumbnail 
                                            height={24}
                                            width="80%"
                                            style={{ 
                                                margin: "10px 0",
                                                borderRadius: "4px"
                                            }}
                                        />
                                        <ShimmerThumbnail 
                                            height={16}
                                            width="90%"
                                            style={{ 
                                                margin: "5px 0",
                                                borderRadius: "4px"
                                            }}
                                        />
                                        <ShimmerThumbnail 
                                            height={16}
                                            width="60%"
                                            style={{ 
                                                margin: "5px 0 15px",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                </article>
                            ))}
                        </>
                    ) : (
                        blogs.map((blog) => (
                            <article
                                key={blog?._id || Math.random()}
                                className="card__article"
                                style={{
                                    borderRadius: "24px",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        display: "flex",
                                        gap: "8px",
                                        color: "#fff",
                                    }}
                                >
                                </div>

                                <img
                                    src={blog.blog_image || "/placeholder.jpg"}
                                    alt={blog?.blog_title || "Blog Image"}
                                    className="card__img"
                                />
                                <div className="card__data">
                                    <h3 className="card__title">{blog?.blog_title}</h3>
                                    <span
                                        className="card__description"
                                        dangerouslySetInnerHTML={{
                                            __html: parseJSONContent(blog.blog_description).slice(0, 35),
                                        }}
                                    ></span>

                                    <Link to={`/user/real-world-scenario/${blog?._id}`} className="card__button">
                                        Read More
                                    </Link>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

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

export default BlogForm;