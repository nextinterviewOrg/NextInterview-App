import api from "../config/axiosconfig";


export const addFeedback =async (data) => {
    try {
      const response =await api.post(`/sampleInterviewFeedback`, data);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllFeedback =async () => {
    try {
      const response =await api.get(`/sampleInterviewFeedback/get`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getFeedbackById =async (id) => {
    try {
      const response =await api.get(`/sampleInterviewFeedback/get/${id}`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const checkStatus =async (data) => {
    try {
      const response =await api.post(`/sampleInterviewFeedback/checkfeedback/exists`,data);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}