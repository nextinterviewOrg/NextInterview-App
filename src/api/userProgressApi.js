import api from "../config/axiosconfig";

export const startModule = async (userId, moduleCode, moduleID) => {
    const data = {
        userId: userId,
        moduleCode: moduleCode,
        moduleID: moduleID
    };
    try {
        const response = await api.post(`/userProgress/startModule`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const startTopic = async (userId,topicCode,topicId, moduleCode, moduleID) => {
    const data = {
        userId: userId,
        moduleCode: moduleCode,
        topicCode: topicCode,
        topicId: topicId,
        // moduleID: moduleID,
    };
    try {
        const response = await api.post(`/userProgress/startTopic`, data); 
        console.log("sadfghjkljhgfdsfghjkhgfdsafghj",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const startSubTopic = async (userId, moduleCode, topicCode,topicId,moduleID, subtopicCode, subtopicId) => {
    const data = {
        userId: userId,
        moduleCode: moduleCode,
        topicCode: topicCode,
        topicId: topicId,
        moduleID: moduleID,
        subtopicCode: subtopicCode,
        subtopicId: subtopicId
    };
    try {
        const response = await api.post(`/userProgress/startSubTopic`, data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const completeModule = async (userId, moduleCode) => {
    const data = {
        userId,
        moduleCode
    };
    try {
        const response = await api.post(`/userProgress/completeModule`, data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const completeTopic = async (userId, moduleCode, topicCode) => {
    const data = {
        userId,
        moduleCode,
        topicCode
    };
    try {
        const response = await api.post(`/userProgress/completeTopic`, data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const completeSubTopic = async (userId, moduleCode, topicCode, subtopicCode) => {
    const data = {
        userId,
        moduleCode,
        topicCode,
        subtopicCode
    };
    try {
        const response = await api.post(`/userProgress/completeSubTopic`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserProgress = async (userId) => {
    try {
        const response = await api.get(`/userProgress/getProgress/${userId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserProgressStats = async (userId) => {
    try {
        const response = await api.get(`/userProgress/getProgressStats/${userId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getUserProgressByModule = async (data) => {
    try {
        const response = await api.post(`/userProgress/getprogressByUserModule/`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getUserProgressByTopic = async (data) => {
    try {
        const response = await api.post(`/userProgress/getprogressByUserTopic/`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getUserProgressBySubTopic = async (data) => {
    try {
        const response = await api.post(`/userProgress/getprogressByUserSubtopic/`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getcompletedModuleByUser = async (userId) => {
    try {
        const response = await api.get(`/userProgress/get/moduleCompleted/${userId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSubtopicCompletionStatus = async (userId, moduleCode, topicCode) => {
    try {
        const response = await api.get(
            `/userProgress/progress/${userId}/subtopics/${moduleCode}/${topicCode}`
        );
        return response.data;
    } catch (error) {
        console.log("Subtopic completion check error:", error);
        throw error;
    }
};

export const getAllTopicsCompletionStatus = async (userId, moduleCode) => {
    try {
        const response = await api.get(
            `/userProgress/progress/${userId}/topics/${moduleCode}`
        );
        return response.data;
    } catch (error) {
        console.log("Topics completion check error:", error);
        throw error;
    }
};
export const getcompletedOngoingModuleByUser = async (userId) => {
    try {
        const response = await api.get(`/userProgress/get/moduleOngoingCompleted/${userId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getcompletedOngoingModuleTopicByUser = async (userId, moduleCode) => {
    try {
        const response = await api.get(`/userProgress/get/ongoingComletedTopic/${userId}/${moduleCode}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getcompletedOngoingModuleSubTopicByUser = async (userId, moduleCode) => {
    try {
        const response = await api.get(`/userProgress/get/ongoingComletedSubtopic/${userId}/${moduleCode}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};