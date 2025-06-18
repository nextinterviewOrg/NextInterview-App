import api from "../config/axiosconfig";

export const getInterviewTopics = async () => {
    try {
        const response = await api.get("/interviewTopics/getTopics");
        return response.data;
    } catch (e) {
        console.log("error", e);
    }

};