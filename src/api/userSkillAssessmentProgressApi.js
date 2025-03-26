import api from "../config/axiosconfig";

export const addQuestionToUserSkillAssessmentProgress = async (data) => {
    try {
        const response = await api.post(
            `/userSkillAssessmentProgress/`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};