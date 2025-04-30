import api from "../config/axiosconfig";


export const getModuleFeedback = async (moduleId) => {
    try {
        const response = await api.get(`/moduleFeedback/get/${moduleId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addModuleFeedback = async (data) => {
    try {
        const response = await api.post("/moduleFeedback", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const checkUserFeedBackExists = async (data) => {
    try {
        const response = await api.post("/moduleFeedback/checkfeedback/exists", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}