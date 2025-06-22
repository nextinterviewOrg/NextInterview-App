import styled from "styled-components";

export const UserDropOffsWrapper = styled.div`

/* UserDropOffs.css */
.dropOffsContainer {
  background-color: #fff;
 border-radius: 8px;
border: 1px solid #F5F5F5;
  padding: 1rem;
  max-width: 50%;
  max-height: 100%;
  margin: 1rem auto;
  margin-left: 20px;
  font-family: "Helvetica", sans-serif;
  display: flex;
  flex-direction: column;
  align-content: center;

  @media (max-width: 768px) {
    max-width: 90%;
    margin-left: 0px;
  }
}

.chartTitle {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

`