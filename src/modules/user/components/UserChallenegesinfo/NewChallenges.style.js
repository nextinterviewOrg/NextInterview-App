import styled from "styled-components";

export const BackButton = styled.button`
  border: none;
  color: #2290ac;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #f0f8f1;
  width: 100%;
  padding: 10px;
    padding-left: 50px;
     font-family: "DM Sans";

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding-left: 10px;
  }
`;

export const Card = styled.div`
  // width: 90%;
  margin-left: 50px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f5f5f5;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
  font-family: "DM Sans";

  .hrtag {
    border: 1px solid #f5f5f5;
    width: 100%;
    margin: 20px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 88%;
    margin-left: 0px;
  } 
`;

export const BackIcon = styled.div`
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  margin-bottom: 10px;
 
  @media (max-width: 1024px) {
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 0px;
  }
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const Tag = styled.div`
  font-size: 14px;
  color: #2290ac;
  margin-bottom: 10px;
  background-color: #f0f8f1;
  width: 12%;
  padding: 10px;
  text-align: center;
  border-radius: 6px;

  @media (max-width: 1024px) {
    font-size: 14px;
    width: 20%;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    width: 25%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    width: 50%;
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
  background-color: #f0f8f1;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
    @media (max-width: 768px) {
      font-size: 16px;
    }

    .language{
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    }
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

export const TopicsList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
`;

export const TopicItem = styled.li`
  font-size: 16px;
  color: #333;
  padding: 10px 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const Button = styled.button`
  background: #2290ac;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 20px;

  &:hover {
    background: #2290ac90;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 10px;
    font-size: 14px;
    color: #777;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 0;
    position: relative;
    border-radius: 50%;
    border: 3px solid #fff;
    top: 10px;

    &:first-child {
      left: 0;
    }
  }
`;

export const SolutionBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  border-radius: 6px;
  font-size: 15px;
  display: flex;
  flex-direction: column;

  p {
    margin: 8px 0 0 0;

    @media (max-width: 768px) {
      margin: 4px 0 0 0;
    }
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const SolutionText = styled.span`
  color: #2290ac;
  padding: 5px;
  font-size: 18px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SolutionAnswer = styled.span`
  background-color: #f0f8f1;
  padding: 20px;
  border-radius: 6px;
  font-size: 16px;
  word-break: break-word;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const HelpIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  margin-top: 10px;
  font-size: 16px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;  


export const Tags = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

// export const Tag = styled.span`
//   background-color: ${(props) => props.theme.colors.backgray};
//   color: ${(props) => props.theme.colors.borderblue};
//   padding: ${(props) => props.theme.spacing(0.2)}
//     ${(props) => props.theme.spacing(1)};
//   border-radius: 4px;
//   font-size: 11px;
//   @media (max-width: 768px) {
//     font-size: 9px;
//   }
// `;

export const OptionWrapper = styled.div`
  padding: 0.25rem 0rem;
  // border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  // background-color: #f9f9f9;

  // &:hover {
  //   background-color: #eef;
  // }

  &.selected {
    border-color: #00796b;
    // background-color: #e0f7fa;
  }
`;

export const TextArea = styled.textarea`
  width: 98%;
  min-height: 120px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  resize: none;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    // border-color: #00796b;
    // background-color: #f0fdfd;
  }
`;

export const TextInput = styled.input`
  width: 98%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    // border-color: #00796b;
    // background-color: #f0fdfd;
  }
`;

export const QusnType = styled.h2`
display: flex;
flex-direction: row;
justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
  background-color: #EDF1F3;
  padding: 6px;
  border-radius: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const QusnText = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  // margin-bottom: 1rem;
  padding: 6px;
`;

export const QusnDifficulty = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  // margin-bottom: 1rem;
   background-color: ${({ difficulty }) =>
    difficulty === 'Easy'
      ? '#d1fae5'      
      : difficulty === 'Medium'
      ? '#fff3cd'     
      : difficulty === 'Hard'
      ? '#f8d7da'     
      : '#e2e3e5'};   
padding: 6px;
border-radius: 5px;
`;