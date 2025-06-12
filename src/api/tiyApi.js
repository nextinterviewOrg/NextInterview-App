  import api from "../config/axiosconfig";    


export const gettiy = async (module_code, topic_code, subtopic_code, question_type,level) => {
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
  
      const response = await api.get('/tiy/get', { params });
  
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const gettiyById = async (id) => {
    try {
      const response = await api.get(`/tiy/get/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const gettiyByModule = async (module_code) => {
    try {
      const response = await api.get(`/tiy/get/module/${module_code}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const softDeleteTiy = async (id) => {
    try {
      const response = await api.delete(`/tiy/softDelete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const editTiy = async (id, data) => {
    try {
      const response = await api.put(`/tiy/edit/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const gettiyquestions = async (module_code,topic_code,userId) => {
    try {
      const response = await api.get(`/mainQuestionBank/get/questionByfilter/userResponse/${userId}?module_code=${module_code}&topic_code=${topic_code}&question_category=tiy`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };