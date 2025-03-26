import styled from "styled-components";
export const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };
  
  export const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    width: "500px",
    maxHeight: "90vh",
    borderRadius: "8px",
    overflowY: "auto",
    position: "relative",
  };
  
  export const formStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  
  export const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };
  
  export const cancelButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  };
  
  export const successErrorStyle = {
    padding: "10px",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    borderRadius: "5px",
    marginBottom: "15px",
  };
  
  export const errorStyle = {
    padding: "10px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "5px",
    marginBottom: "15px",
  };
  

  export const Text = styled.p`
    color: ${({ theme }) => theme.colors.text};
    margin-top: ${({ theme }) => theme.spacing(1)};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    overflow: hidden;
  `;
  