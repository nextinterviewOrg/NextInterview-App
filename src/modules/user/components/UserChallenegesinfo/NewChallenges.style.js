import styled from "styled-components";

export const Card = styled.div`
  width: 90%;
  margin-left: 70px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f5f5f5;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
  font-family: "Arial", sans-serif;

  .hrtag {
    border: 1px solid #f5f5f5;
    width: 100%;
    margin: 20px;
  }

  @media (max-width: 1024px) {
    width: 100%;
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
`;

export const Title = styled.h2`
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
    @media (max-width: 768px) {
      font-size: 16px;
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

  &:hover {
    background: #00796b;
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