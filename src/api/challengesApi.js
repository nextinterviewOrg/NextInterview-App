import api from "../config/axiosconfig";


export const addChallenge = async (data) => {
  try {
    const response = await api.post(`/userChallenges/`, data);

    
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

export const getTodaysUserChallenges = async (userId,question_type) => {
  try {
    //question_type can have value of ["mcq", "single-line", "multi-line", "approach","coding","case-study"],
    const response = await api.get(`/userChallenges/today/${userId}?question_type=${question_type}`);
    
    if (!response.data) {
      throw new Error("No data received from server");
    }
    
    return response.data;
  } catch (error) {
    console.error("API Error in getTodaysUserChallenges:", error);
    
    // Enhance the error message with server response if available
    const enhancedError = new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch today's challenges"
    );
    
    enhancedError.response = error.response;
    throw enhancedError;
  }
};

export const getAllChallengesWithUserResults =async (userId,question_type) => {
    try {
      //question_type can have value of ["mcq", "single-line", "multi-line", "approach","coding","case-study"],
      console.log("question_type",question_type);
      console.log("userId",userId);
      const response =await api.get(`/userChallenges/all-with-results/${userId}?question_type=${question_type}`);
      return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const submitUserChallengeProgress = async (data) => {
  try {
    const response = await api.post(`/userChallengesProgress/response`, data);
    return response.data;
  } catch (error) {
    console.error("🔴 Submission failed:", error.response?.data || error.message);
    throw error; // Re-throw so the calling function can handle it too
  }
};

export const getChallengesProgress =async (userId) => {
  try {
    const response =await api.get(`userChallengesProgress/check-response/${questionId}/${userId}`);
    return response.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
}