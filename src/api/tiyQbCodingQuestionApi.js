import api from "../config/axiosconfig";

export const addTiyQbCodingQuestion = async (data) => {
    try {
        const response = await api.post("/tiyQbQuestion", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllTiyQbCodingQuestions = async () => {
    try {
        const response = await api.get("/tiyQbQuestion");
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllTIYCodingQuestions= async () => {
    try {
        const response = await api.get("/tiyQbQuestion/get/tiy");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllQBCodingQuestions= async () => {
    try {
        const response = await api.get("/tiyQbQuestion/get/qb");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getTiyQbCodingQuestionById = async (id) => {
    try {
        const response = await api.get(`/tiyQbQuestion/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTiyQbCodingQuestion = async (id, data) => {
    try {
        const response = await api.put(`/tiyQbQuestion/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const softDeleteTiyQbCodingQuestion = async (id) => {
    try {
        const response = await api.delete(`/tiyQbQuestion/soft-delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getTiyQbQuestionWithFilter = async (module_code, topic_code, level, question_category) => {
    try {
        let queryString = '';
        const queryParams = [];

        // Build query string based on provided parameters
        if (module_code) {
            queryParams.push(`module_code=${encodeURIComponent(module_code)}`);
        }
        if (topic_code) {
            queryParams.push(`topic_code=${encodeURIComponent(topic_code)}`);
        }
        if (level) {
            queryParams.push(`level=${encodeURIComponent(level)}`);
        }
        if (question_category) {
            queryParams.push(`question_category=${encodeURIComponent(question_category)}`);
        }


        // Join all parameters with '&' if there are any
        if (queryParams.length > 0) {
            queryString = `?${queryParams.join('&')}`;
        }

        const response = await api.get(`/tiyQbQuestion/get/questionFilter/${queryString}`);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getTiyQbQuestionWithFilterWithResults = async (module_code, topic_code, level, question_category, userId) => {
    try {
        let queryString = '';
        const queryParams = [];

        // Build query string based on provided parameters
        if (module_code) {
            queryParams.push(`module_code=${encodeURIComponent(module_code)}`);
        }
        if (topic_code) {
            queryParams.push(`topic_code=${encodeURIComponent(topic_code)}`);
        }
        if (level) {
            queryParams.push(`level=${encodeURIComponent(level)}`);
        }
        if (question_category) {
            queryParams.push(`question_category=${encodeURIComponent(question_category)}`);
        }


        // Join all parameters with '&' if there are any
        if (queryParams.length > 0) {
            queryString = `?${queryParams.join('&')}`;
        }

        const response = await api.get(`/tiyQbQuestion/get/questionFilterResult/${userId}${queryString}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};
export const getTIYQBQuestionwithResult= async (questionID,userId) => {
    try {
        const response = await api.post(`/tiyQbQuestion/questionWithResponse`,{questionId: questionID, userId: userId});
        return response.data;
    } catch (error) {
        throw error;
    }
}