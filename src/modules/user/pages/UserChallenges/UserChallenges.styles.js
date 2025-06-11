import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  // max-width: 1750px;
  margin-left: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    margin-left: 0px;
    padding: 0 10px;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #1e293b; 
  font-weight: 600;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;
  border-top: 1px solid #eee;
  gap: 1rem;
  margin-top: 0rem;

  @media (max-width: 1024px) {
    gap: 0.25rem;
  }
`;


export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #64748b;
  flex-shrink: 0;
  margin-right: 0.75rem;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.55rem;
  flex-shrink: 0;

  color: ${({ status, type }) =>
    status === 'Completed' ? '#10b981' :
    type === 'mcq' ? '#3b82f6' :         
    type === 'code' ? '#8b5cf6' :        
    '#64748b'};   
    background-color: #f3f4f6;
    padding: 0.5rem;
    border-radius: 50%;   
    margin-top: 1rem;    
    
    @media (max-width: 1024px) {
      font-size: 1.25rem;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-top: 2rem;
    }
`;



export const CardDesc = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const CardStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 0.25rem;
  min-width: 150px;
  text-align: right;

  @media (max-width: 1024px) {
    gap: 0rem;
  }
`;


export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #1e293b; 
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;


export const Status = styled.span`
  background: #ffe6e6;
  color: #d32f2f;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Date = styled.span`
  font-size: 0.75rem;
  color: #999;
    padding: 0.25rem 0.5rem;
`;

export const CardLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

export const Label = styled.span`
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
  color: ${({ difficulty }) =>
    difficulty === 'easy' ? '#1e4620' :
    difficulty === 'medium' ? '#7c2d12' :
    difficulty === 'hard' ? '#7f1d1d' :
    '#1e293b'};

  background-color: ${({ difficulty }) =>
    difficulty === 'easy' ? '#d1fae5' :     // light green
    difficulty === 'medium' ? '#ffedd5' :   // light orange
    difficulty === 'hard' ? '#fee2e2' :     // light red
    '#e2e8f0'};                             // default gray
`;



























// import styled from 'styled-components';

// export const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: #fff;
//   border-bottom: 1px solid #eee;
//   padding: 1.25rem 1rem;
//   position: relative;
//   max-width: 1700px;
//   width: 100%;
//   margin-left: 50px;
//   border-radius: 8px;
// `;

// export const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// export const Tags = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// export const Tag = styled.span`
//   font-size: 0.7rem;
//   padding: 0.2rem 0.5rem;
//   border-radius: 6px;
//   font-weight: 500;
//   color: #333;
//   background-color: ${({ type }) =>
//     type === 'difficulty'
//       ? '#fff5cc'
//       : type === 'category'
//       ? '#e6f4ea'
//       : '#eee'};
// `;

// export const Title = styled.h3`
//   font-size: 1rem;
//   font-weight: 600;
//   margin: 0.75rem 0 0.25rem;
// `;

// export const Description = styled.p`
//   font-size: 0.85rem;
//   color: #666;
//   margin: 0;
// `;

// export const StatusDate = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
// `;

// export const Status = styled.span`
//   background: #ffe6e6;
//   color: #d32f2f;
//   font-size: 0.75rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 6px;
//   font-weight: 600;
// `;

// export const DateText = styled.span`
//   font-size: 0.75rem;
//   color: #999;
// `;

// export const Icon = styled.div`
//   position: absolute;
//   top: 1.25rem;
//   left: 0.5rem;
//   background: #f4f4f4;
//   padding: 0.4rem;
//   border-radius: 50%;
// `;

// export const Challenges = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;
























// import styled from "styled-components";

// export const UserChallengesWrapper = styled.div`    

//   .divider {
//     border: 1px solid #F5F5F5;
//     margin-top: 50px;
//   }

//   .empty-tab {
//     text-align: center;
//     font-style: italic;
//     color: gray;
//     margin-top: 30px;
//   }
// `;

// export const Challengescontainer = styled.div`
//   margin-left: 60px;

//   @media (max-width: 1024px) {
//     margin-left: 40px;
// }

// @media (max-width: 768px) {
//     margin-left: 20px;
// }

// @media (max-width: 480px) {
//     margin-left: 10px;
// }
// `;

// export const Tabbuttons = styled.div`
//   display: flex;
//     gap: 10px;
//     margin-bottom: 10px;

//      button {
//       padding: 8px 16px;
//       border: none;
//       background-color: #eee;
//       cursor: pointer;
//       border-radius: 4px;
//       font-weight: 500;

//       &.active {
//         background-color: ${({ theme }) => theme.colors.secondary};
//         color: white;
//       }
//     }
// `;