import api from "../config/axiosconfig";


export const getAiAssistantbyModuleId = async (moduleId) => {
    try {
        const response = await api.get(`/aiAssistant/getByModuleId/${moduleId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAiAssistantByassistantId = async (assistantId) => {
    try {
        const response = await api.get(`/aiMockInterview/getMockInterviewAssistants/${assistantId}`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const createMockInterviewThread = async (userId) => {
    const data = {
        userId: userId||"67c738189bf087ae998395ea",
    };
    try {
        const response = await api.post(`/aiMockInterview/createThread`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendUserMessage = async (data) => {
    try {
        const response = await api.post(`/aiMockInterview/createMessage`, data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const runmockinterviewThread = async (data) => {
    try {
        const response = await api.post(`/aiMockInterview/runThread`, data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getMockInterviewResponse = async (data) => {
    try {
        const response = await api.post(`/aiMockInterview/checkThreadStatus`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const speechToText = async (data) => {
    try {
        const response = await api.post(`/aiMockInterview/speechToText`,data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const textToSpeech = async (data) => {
    try {
        const response = await api.post(`/aiMockInterview/textToSpeech`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 
export const endInterview= async (data)=>{
    try {
        const response = await api.post(`/aiMockInterview/EndInterview`,data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getInterviewFavourites = async () => {
    try {
        const response = await api.get(`/addNewModule/get/InterviewFavorites`); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}