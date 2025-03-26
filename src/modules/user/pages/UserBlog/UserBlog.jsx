import React, { useEffect, useState } from "react";
import {
    getAllBlogs,
} from "../../../../api/blogApi";
import { Editor } from "@tinymce/tinymce-react";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import { message } from "antd";
import {
    TinyMCEapiKey,
    TinyMCEplugins,
    TinyMCEToolbar,
} from "../../../../config/TinyMceConfig";
import "../../../admin/pages/Blog/Blog.scss"; // Import the SCSS file here
import { Link } from "react-router-dom";

const BlogForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    // Controls create/edit modal
   

    // Fetch blogs on component mount
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

    // Handle image upload
   

    return (
        <div style={{ padding: "20px" }}>
            


            <h2 style={{ marginLeft: "60px" }}>Blog List</h2>
            <div className="container">
                <div className="card__container">
                    {blogs.map((blog) => (
                        <article
                            key={blog?._id || Math.random()}
                            className="card__article"
                            style={{
                                borderRadius: "24px",
                                position: "relative",
                            }}
                        >
                            {/* Icon Container in top-right corner of the image */}
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
                                {/* Edit Icon */}
                             
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
                    ))}
                </div>
            </div>
        </div>
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


export default BlogForm;
