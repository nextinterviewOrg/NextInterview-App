import api from "../config/axiosconfig";


export const uploadSkillAssessmentFile = async (data) => {
    try {
        const response = await api.post("/upload/upload-csv-skillassessment", data, {
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
// export const uploadQuestionBankFile = async (data) => {
//     try {
//         const response = await api.post("/upload/upload-csv-questionbank", data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         }
//         );
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
export const uploadQuestionBankFile = async (data) => {
    try {
        const response = await api.post("/upload/upload-csv-questionbank", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        // Enhanced error logging
        console.error('Upload Error Details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            config: error.config
        });
        
        let errorMessage = 'Failed to upload file';
        if (error.response) {
            // Try to get meaningful error from server
            errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `Server responded with ${error.response.status}`;
        } else if (error.request) {
            errorMessage = 'No response received from server';
        }
        
        throw new Error(errorMessage);
    }
}
export const uploadchallengesFile = async (data) => {
    try {
        const response = await api.post("/uploadchallengesFile/", data, {
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
export const uploadTryItYourselfFile = async (data) => {
    try {
        const response = await api.post("/upload/upload-csv-tiy", data, {
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