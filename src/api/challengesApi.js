import api from "../config/axiosconfig";


export const addChallenge = async (data) => {
  try {
    const response = await api.post(`/userChallenges/`, data);
    console.log("[API] Response:", JSON.stringify(response.data, null, 2));
    console.log("[API] Sending:", JSON.stringify(data, null, 2));

    
    if (response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data?.message || "Unknown server error");
    }
  } catch (error) {
    console.error("[API] Error details:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    throw error;
  }
}

export const getChallenges =async () => {
    try {
      const response =await api.get(`/userChallenges/`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getChallengeById =async (id) => {
    try {
      const response =await api.get(`/userChallenges/${id}`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const editChallenge =async (id,data) => {
    try {
      const response =await api.put(`/userChallenges/${id}`,data);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

export const getTodaysUserChallenges =async (userId) => {
    try {
      const response =await api.get(`/userChallenges/today/${userId}`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllChallengesWithUserResults =async (userId) => {
    try {
      const response =await api.get(`/userChallenges/all-with-results/${userId}`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}