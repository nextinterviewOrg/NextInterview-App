import api from "../config/axiosconfig";


export const checkUserAnswerStatusQuestion = async (data) => {
    try {
        /*
               // request body
               {
                   moduleId: "680886c7f824886540db238d",
                   userId: "68104bbf0e8f15d8b199583d",
                   questionBankId: "67b9954dfd5023119cb12541"
               }
               */
        const response = await api.get(`/mainQuestionBankProgress/checkQuestionAnswered`,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addQuestionToQuestionProgress = async (data) => {
    try {
        /*
                // request body
                {
                    moduleId: "680886c7f824886540db238d",
                    userId: "68104bbf0e8f15d8b199583d",
                    questionBankId: "67b9954dfd5023119cb12541",
                    answer: "",
                    question_type: "mcq",
                    choosen_option: "option_a"
                }
                */
        const response = await api.post(`/mainQuestionBankProgress`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};