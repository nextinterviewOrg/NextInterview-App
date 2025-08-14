import styled from "styled-components";
import TimePicker from "react-time-picker";
export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center; /* Center vertically with spacing */
  justify-content: center; /* Center horizontally */
  z-index: 1000;
  padding: 40px 0; /* Add gap from top and bottom */

  @media (max-width: 768px) {
    padding: 20px 0; /* Adjust padding for smaller screens */
    scroll-behavior: auto;
  }

  @media (max-width: 480px) {
    padding: 10px 0; /* Adjust padding for smaller screens */
    scroll-behavior: auto;
  }

  @media(max-width: 900px) {
    padding: 20px 0; /* Adjust padding for smaller screens */
    }
    
`;
 
export const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  position: relative;
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: space-between; /* Ensure spacing for footer (buttons) */
  align-items: stretch; /* Stretch elements to fill width */
  overflow: hidden; /* Prevent content overflow */
`;
 
 
export const ModalHeader = styled.h2`
  font-size: 1.2rem;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
`;
 
export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
 
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const FormGroup = styled.div`
display: flex;
flex-direction: column; /* Stack label, input, and error message vertically */
margin-bottom: 20px;

label {
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textgray};
  border-radius: 5px;
  font-size: 0.8rem;
  margin-bottom: 5px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
}

.error {
  color: red;
  font-size: 0.75rem;
  margin-top: 2px;
}
`;

 
 
 
export const Label = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
 
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.success};
`;
 
export const RadioOption = styled.div`
  display: flex;
  align-items: center;
 
 
  color: ${({ theme }) => theme.colors.success};
 
`;
 
export const RadioLabel = styled.label`
  margin-left: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
export const Input = styled.input`
  width: 100%;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  height: 20px; /* Add a fixed height */
  @media (max-width: 768px) {
    height: 18px; /* Adjust the height for smaller screens */
    font-size: 0.8rem;
    width: 90%;
  }
`;
 
export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  height: 40px; /* Add a fixed height */

  @media (max-width: 768px) {
    height: 30px; /* Adjust the height for smaller screens */
    font-size: 0.8rem;
    width: 90%;
  }
`;
 
export const Select = styled.select`
  width: 100%;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  height: 40px; /* Add a fixed height */

  @media (max-width: 768px) {
  height: 40px; /* Adjust the height for smaller screens */
  font-size: 0.8rem;
  width: 95%;
  }
`;
 
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
 
 
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 5px;
  // cursor: pointer;
 
  /* font-family: ${({ theme }) => theme.fonts.body}; */
 
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
    @media (max-width: 768px) {
    font-size: 0.8rem;
    justify-content: center;
    flex-direction: column;
    margin: auto;
  }
`;
 
export const TimePickerStyled = styled(TimePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textgray};
  border-radius: 5px;
  font-size: 0.8rem;
  margin-top: 8px;
 
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  @media (max-width: 768px) {
    height: 40px; /* Adjust the height for smaller screens */
    font-size: 0.8rem;
    width: 95%;
  }
`;
 