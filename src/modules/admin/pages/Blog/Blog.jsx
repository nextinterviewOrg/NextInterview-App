import React, { useEffect, useState } from "react";
import {
    getAllBlogs,
    createBlog,
    deleteBlogById,
    updateBlogById,
} from "../../../../api/blogApi";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import { message } from "antd";
import {
    TinyMCEapiKey,
    TinyMCEplugins,
    TinyMCEToolbar,
} from "../../../../config/TinyMceConfig";
import DeleteModule from "../../../admin/components/DeleteModule/DeleteModule"; // <-- Adjust the import path if needed
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Controls delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Track which blog we are deleting
    const [deleteBlogId, setDeleteBlogId] = useState(null);

    // For editing
    const [isEditMode, setIsEditMode] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

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
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            try {
                const imageURL = await uploadFileToFirebase(file, "flashcard");
                setImage(imageURL);
                message.success("Image uploaded successfully!");
            } catch (error) {
                console.error("Error uploading image:", error);
                message.error("Failed to upload image.");
            }
        } else {
            message.error("Please upload a valid image file.");
        }
    };

    // Create blog
    const handleCreateBlog = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await createBlog({ title, content, image });
            resetForm();
            setIsModalOpen(false);
            // Re-fetch or re-pull blogs
            const response = await getAllBlogs();
            if (Array.isArray(response.data)) {
                setBlogs(response.data);
            }
        } catch (error) {
            console.error("Error creating blog:", error.message);
            setError(error.message);
        }
        setLoading(false);
    };

    // Update blog
    const handleUpdateBlog = async (blogId) => {
        try {
            setLoading(true);
            const updatedBlog = await updateBlogById(blogId, {
                title,
                content,
                image,
            });

            // Update local state to reflect changes
            setBlogs((prevBlogs) =>
                prevBlogs.map((b) => (b._id === blogId ? updatedBlog : b))
            );

            setIsModalOpen(false);
            message.success("Blog updated successfully!");
            resetForm();
        } catch (error) {
            console.error("Error updating blog:", error.message);
            setError(error.message);
        }
        setLoading(false);
    };

    // Delete blog
    const handleDeleteBlog = async () => {
        if (!deleteBlogId) return;
        try {
            setLoading(true);
            await deleteBlogById(deleteBlogId);
            setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== deleteBlogId));
            message.success("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error.message);
            setError(error.message);
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteBlogId(null);
            setLoading(false);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
        setIsEditMode(false);
        setEditBlogId(null);
    };

    // When user clicks "Delete" icon on a card
    const handleDeleteClick = (blogId) => {
        setDeleteBlogId(blogId);
        setIsDeleteModalOpen(true);
    };

    // When user clicks "Edit" icon on a card
    const handleEditClick = (blog) => {
        // Populate modal fields with existing blog data
        setTitle(blog.blog_title);
        setContent(blog.blog_description);
        setImage(blog.blog_image);
        setImagePreview(blog.blog_image || null);
        setEditBlogId(blog._id);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    // Single form submit handler for both create & edit
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (isEditMode && editBlogId) {
            // If in edit mode, update
            handleUpdateBlog(editBlogId);
        } else {
            // Else create
            handleCreateBlog(e);
        }
    };

    // Inline styles for the modal overlay and content
    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    };

    const modalContentStyle = {
        position: "relative",
        backgroundColor: "#fff",
        padding: "20px",
        width: "500px",
        maxWidth: "95%",
        borderRadius: "8px",
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ textAlign: "right" }}>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#2390ac",
                    }}
                >
                    Create Blog
                </button>
            </div>

            {success && <p>{success}</p>}
            {error && <p>{error}</p>}

            {/* Modal for Creating/Editing Blog */}
            {isModalOpen && (
                <div
                    style={modalOverlayStyle}
                    onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                    }}
                >
                    <div
                        style={modalContentStyle}
                        onClick={(e) => e.stopPropagation()} // stops click from closing modal
                    >
                        <CloseOutlined
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                fontSize: "18px",
                                color: "#db590d",
                                cursor: "pointer",
                            }}
                        />
                        <h2>{isEditMode ? "Edit Blog" : "Create Blog"}</h2>

                        {/* The same form is used for both create and edit */}
                        <form onSubmit={handleSubmitForm}>
                            <label
                                style={{
                                    fontWeight: "600",
                                    fontFamily: "DM Sans",
                                }}
                            >
                                Title:
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{
                                        display: "block",
                                        marginRight: "20px",
                                        width: "95%",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                />
                            </label>
                            <label
                                style={{
                                    fontWeight: "600",
                                    fontFamily: "DM Sans",
                                }}
                            >
                                Content:
                                <Editor
                                    apiKey={TinyMCEapiKey}
                                    init={{
                                        plugins: TinyMCEplugins,
                                        toolbar: TinyMCEToolbar,
                                        branding: false,
                                    }}
                                    value={content || ""}
                                    onEditorChange={(newValue) => setContent(newValue)}
                                />
                            </label>
                            <label
                                style={{
                                    display: "block",
                                    margin: "10px 0",
                                    fontWeight: "600",
                                    fontFamily: "DM Sans",
                                }}
                            >
                                Image:
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    style={{
                                        display: "block",
                                        margin: "10px 0",
                                    }}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: "100%",
                                            height: "100px",
                                            marginTop: "10px",
                                        }}
                                    />
                                )}
                            </label>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginRight: "10px",
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    backgroundColor: "#2390ac",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                            >
                                {loading
                                    ? isEditMode
                                        ? "Updating..."
                                        : "Creating..."
                                    : isEditMode
                                        ? "Update"
                                        : "Create"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    backgroundColor: "#2390ac",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {isDeleteModalOpen && (
                <DeleteModule
                    onDelete={handleDeleteBlog}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}

            <h2 style={{ marginLeft: "60px" }}>Blog List</h2>
            {/* Use the CSS classes from the BlogCard.scss for each card */}
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
                                <EditOutlined
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                                        color: "#2390ac",
                                    }}
                                    onClick={() => handleEditClick(blog)}
                                />

                                {/* Delete Icon */}
                                <DeleteOutlined
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                                        color: "red",
                                    }}
                                    onClick={() => handleDeleteClick(blog._id)}
                                />
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

                                <Link to={`/admin/real-world-scenario/${blog?._id}`} className="card__button">
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
