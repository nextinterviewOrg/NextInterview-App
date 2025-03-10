import api from "../config/axiosconfig";

export const getJobs = async () => {
  try {
    const response = await api.get("/jobResponse");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getJobById = async (jobId) => {
  try {
    const response = await api.get(`/jobResponse/${jobId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
