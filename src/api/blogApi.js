import api from "../config/axiosconfig";

export const createBlog = async (blog) => {
    try {
        console.log("Blog:",blog);
        const response = await api.post('/blog/createBlog', blog);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllBlogs = () => {
    try {
        const response = api.get('/blog/getAllBlogs');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteBlogById = (id) => {
    try {
        const response = api.delete(`/blog/deleteBlog/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateBlogById = (id, blog) => {
    try {
        const response = api.put(`/blog/updateBlog/${id}`, blog);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getBlogById = (id) => {
    try {
        const response = api.get(`/blog/getBlogById/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}