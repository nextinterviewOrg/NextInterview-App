import api from "../config/axiosconfig";


export const checkUserAnswerStatusQuestionTIYQB = async (data) => {
    try {
        /*
               // request body
               {
                   moduleId: "680886c7f824886540db238d",
                   userId: "68104bbf0e8f15d8b199583d",
                   questionBankId: "67b9954dfd5023119cb12541"
               }
               */
              console.log("Checking status",data);
        const response = await api.post(`/tiyQbCodingProgress/checkQuestionAnswered`,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addQuestionToQuestionProgressTIYQB = async (data) => {
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
               console.log("Storing data api",data);
        const response = await api.post(`/tiyQbCodingProgress`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};