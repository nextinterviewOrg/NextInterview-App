import api from "../config/axiosconfig";

export const getQuestionBank = async (
  module_code,
  topic_code,
  subtopic_code,
  question_type,
  level
) => {
  try {
    const params = {};

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

    const response = await api.get("/questionBank/get", { params });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getQuestionBankByModule = async (module_code) => {
  try {
    const response = await api.get(`/questionBank/get/module/${module_code}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const softDeleteQuestionBank = async (id) => {
  try {
    const response = await api.delete(`/questionBank/softDelete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editQuestionBank = async (id, data) => {
  try {
    const response = await api.put(`/questionBank/edit/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getQuestionByCategoryIdandUserId = async (category_id, user_id) => {
  try {
    const response = await api.get(`/mainQuestionBank/get/qbQuestionBycategory/${category_id}/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAllQuestionsUsingUserId = async (user_id) => {
  try {
    const response = await api.get(`/mainQuestionBank/get/QBQuestions/withUserResponse/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getQuestionBankById = async (id) => {
  try {
    const response = await api.get(`/mainQuestionBank/get/questionByID/${id}`);
    console.log("Response from getQuestionBankById:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markUserSubmission = async (data)=>{
try{
  const response = await api.post(`/mainQuestionBankProgress`,data);
  return response.data;
}catch(error){
  console.log(error);
  throw error;
}
}

export const tryHarderQuestionBank = async (data)=>{
  try{
    const response = await api.post(`/mainQuestionBank/tryHarderQuestion`,data);
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
  }