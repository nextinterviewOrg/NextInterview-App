import api from "../config/axiosconfig";

export const addNewModule = async (data) => {
  try {
    const response = await api.post("/addNewModule/", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getModule = async (data) => {
  try {
    const response = await api.get("/addNewModule/", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteModule = async (id) => {
  try {
    
    const response = await api.delete(`/addNewModule/${id}`);
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getModuleById = async (id) => {
  try {
    const response = await api.get(`/addNewModule/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateModuleById = async (id, data) => {
  try {
    const response = await api.put(`/addNewModule/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const softModuleDelete = async (id) => {
  try {
    const response = await api.delete(`/addNewModule/softDelete/${id}`);
    console.log("asdfghjkl;'",response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getModuleCode = async () => {
  try {
    const response = await api.get(`/addNewModule/get/moduleCode`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopicCode = async (module_code) => {
  try {
    const response = await api.get(
      `/addNewModule/get/module/topic/${module_code}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubTopicCode = async (module_code,topic_code) => {
    try {
        const response = await api.get(`/addNewModule/get/module/topic/subtopic/${module_code}/${topic_code}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getLastTopicByModuleCode = async (data) => {
    try {
        const response = await api.post(`/addNewModule/getModuleLastTopic`,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getLastSubTopicByTopicCode = async (data) => {
    try {
        const response = await api.post(`/addNewModule/getModuleTopicLastSubtopic`,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getModuleByModuleCode = async (moduleCode) => {
    try {
        const response = await api.get(`/addNewModule/getModule/${moduleCode}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getTopicCodeAndNameByModuleCode = async (moduleId) => {
    try {
        const response = await api.get(`/addNewModule/moduleTopics/${moduleId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
   