import styled from "styled-components"; 


export const UserSampleInterviewWrapper = styled.div`
  margin: 0 20px 10px 60px;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  .video-page {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #f0f4f8;
  }

  .video-container {
    width: 100%;
    max-width: 1350px;
    aspect-ratio: 16 / 9;
    background: linear-gradient(45deg, #9c85f1, #79b6f1);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .video-player {
    width: 100%;
    height: 100%;
    // object-fit: cover;
    border-radius: 15px;
  }


/* Modal Styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
 
  border-radius: 10px;
  width: 100%;
  max-width: 700px;
 max-height: fit-content;  
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}


.model-title-container{
display: flex;
padding: 24px 28px;
align-items: center;
gap: 24px;
align-self: stretch;
background-color:#F0F8F1;
 border-top-right-radius: 15px;
 border-top-left-radius: 15px;
}

.model-title {
font-family: "DM Sans";
font-size: 17px;
font-style: normal;
font-weight: 600;
color:${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
}
  .model-form{
  display:flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  padding:28px 0;

  }

  .form-group-container {
      // max-width: 500px;
  display:flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;}

.form-group {
border-radius: 8px;
border: 1px solid ${({ theme }) => theme.colors.black};
  margin-bottom: 15px;
  padding:20px;

}
  .modal-form-radio-btns{
  display:flex;
  gap:24px;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
//   margin-top: 10px;
  }

modal-form-group-label {
font-family: "DM Sans";
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 20px;
color:${({ theme }) => theme.colors.textgray};
  display: block;
  margin-bottom: 8px;
}
.modal-form-group-value{
font-family: "DM Sans";
font-size: 13px;
font-style: normal;
font-weight: 500;
line-height: 20px;
color:${({ theme }) => theme.colors.textgray};
  display: block;
  margin-bottom: 8px;
  margin-top: 13px;
  resize: none;
}
input[type="radio"] {
  margin-right: 10px;
}
.form-group2{
border-radius: 8px;
border: 1px solid ${({ theme }) => theme.colors.black};
  margin-bottom: 15px;
  display:flex;
  flex-direction: column;
//   align-items: center;
  justify-content: flex-start;
  padding:20px 40px 20px 40px;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
}

.modal-actions {
  display: flex;
  justify-content:flex-end;
  gap: 10px;
}

.modal-skip-btn {
  padding: 10px 15px;
  width: 104px;
height: 34px;
border-radius: 30px!important;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  font-family: "DM Sans";
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-submit-btn {
  padding: 10px 15px;
  width: 104px;
height: 34px;
border-radius: 30px!important;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  font-family: "DM Sans";
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:hover {
  background-color: ${({ theme }) => theme.colors.info};
  color: white;
}

button:focus {
  outline: none;
}

/* Close Button */
.close {
  position: absolute;
  top: 0px;
  right: 8px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
}


`