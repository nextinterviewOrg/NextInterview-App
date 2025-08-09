import api from "../config/axiosconfig";


export const getMainQuestion = async (module_code, topic_code, subtopic_code, question_type, level, question_category) => {
    try {
        const params = {};
        //question_category can have value of 'tiy' or 'questionBank'

        if (module_code) {
            params.module_code = module_code;
        }
        if (topic_code) {
            params.topic_code = topic_code;
        }
        if (subtopic_code) {
            params.subtopic_code = subtopic_code;
        }
        if (question_type) {
            params.question_type = question_type;
        }
        if (level) {
            params.level = level;
        }
        if (question_category) {
            params.question_category = question_category;
        }

        const response = await api.get('/mainQuestionBank/get/questionByfilter', { params });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getmainQuestionById = async (id) => {
    try {
        const response = await api.get(`/mainQuestionBank/get/questionByID/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getMainQuestionByModule = async (module_code, question_category) => {
    try {
        // question_category can have value of 'tiy' or 'questionBank'
        const response = await api.get(`/mainQuestionBank/get/module/${module_code}?question_category=${question_category}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const softDeleteMainQuestion = async (id) => {
    try {
        const response = await api.delete(`/mainQuestionBank/softDelete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editMainQuestion = async (id, data) => {
    try {
        const response = await api.put(`/mainQuestionBank/edit/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllTIYQuestions = async () => {
    try {
        const response = await api.get(`/mainQuestionBank/get/tiyQuestions`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllQBQuestions = async () => {
    try {
        const response = await api.get(`/mainQuestionBank/get/QBQuestions`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const uploadAllQuestionsToMainQuestions = async (file) => {
    try {
        const response = await api.post(`/mainQuestionBank/uploadFile`,file,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addMainQBCodingQuestion=async(data)=>{
    try {
        const response = await api.post(`/mainQuestionBank/addcodingquestion`,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllMainQBCodingQuestions  = async () => {
    try {
        const response = await api.get(`/mainQuestionBank/get/AllCodingQuestions`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllMainTIYQBCodingQuestions  = async () => {
    try {
        const response = await api.get(`/mainQuestionBank/get/AllCodingQuestions/tiy`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllMainbqQBCodingQuestions  = async () => {
    try {
        const response = await api.get(`/mainQuestionBank/get/AllCodingQuestions/qb`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editMainQBCodingQuestion = async (id, data) => {
    try {
        const response = await api.put(`/mainQuestionBank/updatecodingquestion/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllMainTIYQBCodingQuestionsByModule  = async (module_code) => {
    try {
        const response = await api.get(`/mainQuestionBank/get/AllCodingQuestions/tiy/${module_code}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllMainQbQBCodingQuestionsByModule  = async (module_code) => {
    try {
        const response = await api.get(`/mainQuestionBank/get/AllCodingQuestions/qb/${module_code}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllMainQuestionBankQuestionWithFilter  = async (module_code,topic_code,question_category,userId) => {
    try {
        const response = await api.get(`/mainQuestionBank/get/questionByfilter/userResponse/${userId}?module_code=${module_code}&topic_code=${topic_code}&question_category=${question_category}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const softDeleteQuestion = async (id) => {
    try{
        const response = await api.delete(`/mainQuestionBank/softDelete/${id}`);
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
};

export const nextTiyQuestion = async (id) => {
    try {
        const response = await api.post(`/mainQuestionBank/nextTiyQuestion`,{questionId:id});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getTiyHarderQuestion = async (id) => {
    try {
        const response = await api.post(`/mainQuestionBank/tiyHarderQuestion`,{questionId:id,isTIYQuestion:true,isQBQuestion:false});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};