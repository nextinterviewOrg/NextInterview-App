import styled from 'styled-components';

export const Container = styled.div`
  // padding: 24px;
  margin: 0;
  width: 98%;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 0px;

  @media (max-width: 1360px) {
  gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#333' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2290ac90;
  }

  @media (max-width: 1360px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const FilterIcon = styled.span`
  margin-right: 8px;
  background-color: #2290ac;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1360px) {
    padding: 8px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 14px;
  }
`; 

export const ApplyFilter = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: ${({ variant }) => (variant === 'clear' ? 'none' : '1px solid #2290ac')};
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'clear' ? 'transparent' : '#2290ac')};
  color: ${({ variant }) => (variant === 'clear' ? '#2290ac' : '#fff')};
  font-weight: ${({ variant }) => (variant === 'clear' ? '500' : '600')};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'clear' ? 'rgba(90, 136, 148, 0.1)' : '#1a7c94'};
  }

  @media (max-width: 1360px) {
    padding: 6px 16px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
  }
`;


export const QuestionCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  // box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  @media (max-width: 1360px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 4px;
  }
`;

export const Icon = styled.div`
  font-size: 24px;
  margin-right: 16px;
  margin-top: 4px;
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1360px) {
    font-size: 20px;
    width: 32px;
    height: 32px;
    margin-top: 6px;
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

export const Tag = styled.span`
  background-color: ${({ difficulty }) => {
    if (difficulty === 'Easy') return '#d4edda';
    if (difficulty === 'Medium') return '#fff3cd';
    if (difficulty === 'Hard') return '#f8d7da';
    return '#e2e3e5';
  }};
  color: #333;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;

  @media (max-width: 1360px) {
    font-size: 10px;
    padding: 2px 4px;
  }
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #333;

  @media (max-width: 1360px) {
    font-size: 13px;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 24px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 16px;
  z-index: 100;
  width: 280px;

  @media (max-width: 1360px) {
    top: 85px;
    right: 16px;
    width: 250px;
    padding: 12px;
  }

  @media (max-width: 768px) {
    top: 90px;
    right: 8px;
    padding: 8px;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 8px;

  @media (max-width: 1360px) {
    padding: 4px 8px;
  }
`;

export const CloseFilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const FilterSection = styled.div`
  margin-top: 16px;
`;

export const SubText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;

  @media (max-width: 1360px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 4px 0;
  font-size: 14px;
  cursor: pointer;

  input {
    margin-right: 8px;
  }

  @media (max-width: 1360px) {
    font-size: 12px;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

















// import styled from "styled-components";

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing(2)};
//   padding: ${({ theme }) => theme.spacing(3)};
// //   background-color: ${({ theme }) => theme.colors.lightblue};
//   border-radius: 8px;
//   margin-left: 40px;

//   @media (max-width: 1024px) {
//     margin-left: 40px;
//   }
// `;

// export const QuestionCard = styled.div`
//   background: ${({ theme }) => theme.colors.light};
//   padding: ${({ theme }) => theme.spacing(2)};
//   border-radius: 8px;
// //   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
//   border: 1px solid ${({ theme }) => theme.colors.backgray};
// `;

// export const QuestionText = styled.h2`
//   font-size: 18px;
//   font-family: ${({ theme }) => theme.fonts.body};
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: ${({ theme }) => theme.spacing(1)};
//   font-weight: normal;
// `;

// export const MetaInfo = styled.div`
//   font-size: 14px;
//   color: ${({ theme }) => theme.colors.textgray};
//   font-family: ${({ theme }) => theme.fonts.body};
// //   display: flex;
// //   flex-direction: row;

// @media (max-width: 768px) {
//   font-size: 12px;
//   display: flex;
//   flex-direction: row;
//   // text-align: center;
//   gap: 4px;
//   width: 100%;
// }
// `;



// export const Topic = styled.span`
//   font-weight:600;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-right: 8px;
//   border:1px solid ${({ theme }) => theme.colors.backgray};
//   padding: 4px;
//   border-radius: 12px;
//   line-height: 20px;
// `;

// export const Difficulty = styled.span`
//   padding: 4px 8px;
//   border-radius: 4px;
// font-weight:600;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-right: 8px;

//   border:1px solid ${({ theme }) => theme.colors.backgray};
//   padding: 4px;
//   border-radius: 12px;
//   line-height: 20px;
// `;

// export const Type = styled.span`
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.graytext};
//   margin-right: 8px;
//   border:1px solid ${({ theme }) => theme.colors.backgray};
//   padding: 4px;
//   border-radius: 12px;
//   line-height: 20px;
// `;

// export const Companies = styled.span`
//   font-size: 14px;
//   margin-top: 4px;
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-weight:600;
//   border:1px solid ${({ theme }) => theme.colors.backgray};
//   padding: 4px;
//   border-radius: 12px;
//   line-height: 20px;
// `;

// export const Status = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.success};
//   margin-top: 10px;
//   background: ${({ theme }) => theme.colors.lightgreen};
//   padding: 4px 8px;
//   height: 20px;
//   justify-content: center;
  
//   border-radius: 8px;
//   display: inline-block;
// `;


// export const Tag = styled.div`
//   display: flex;
// //   align-items: center;
//   gap: 6px;
//   background: ${({ theme, removable }) =>
//     removable ? theme.colors.sidebarHoverBgColor : theme.colors.light};
//   color: ${({ theme }) => theme.colors.text};
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-size: 14px;
//   font-weight: 500;
//   border: ${({ theme, removable }) =>
//     removable ? "none" : `1px solid ${theme.colors.borderblue}`};
// `;

// export const CloseButton = styled.span`
//   font-size: 16px;
//   cursor: pointer;
//   color: ${({ theme }) => theme.colors.white};
//   background: ${({ theme }) => theme.colors.textgray};
//   border-radius: 50%;
//   width: 18px;
//   height: 18px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const DropdownContainer = styled.div`
//   position: absolute;
//   top: 140px;
//   right: 10px;
//   width: 300px;
//   background: ${({ theme }) => theme.colors.light};
//   border: 1px solid ${({ theme }) => theme.colors.backgray};
//   border-radius: 8px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 15px;
//   z-index: 10;

//   /* Scrollable Content */
//   max-height: 400px; /* Adjust height as needed */
//   overflow-y: auto;
//   scrollbar-width: thin;
//   scrollbar-color: ${({ theme }) => theme.colors.textgray} ${({ theme }) => theme.colors.lightblue};

//   /* For Webkit Browsers (Chrome, Safari) */
//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: ${({ theme }) => theme.colors.textgray};
//     border-radius: 6px;
//   }

//   &::-webkit-scrollbar-track {
//     background: ${({ theme }) => theme.colors.lightblue};
//   }
// `;


// export const FilterSection = styled.div`
//   margin-bottom: 15px;
//   background: ${({ theme }) => theme.colors.lightblue};
//   padding: 2px;

  
// `;

// export const CheckboxLabel = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-size: 16px;
//   font-style: normal;
// font-weight: 400;
// line-height: normal;
// font-family: ${({ theme }) => theme.fonts.body};
//   color: ${({ theme }) => theme.colors.text};

// `;

// export const ApplyButton = styled.button`
//   background: ${({ theme }) => theme.colors.secondary};
//   color: ${({ theme }) => theme.colors.white};
//   padding: 8px 12px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export const ClearButton = styled.button`

//   color: ${({ theme }) => theme.colors.secondary};
//   padding: 8px 12px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: transparent;
// `;

// export const MoreFilters = styled.div`
//   font-size: 14px;
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.text};
//   cursor: pointer;
//   padding: 6px 10px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// //   justify-content: center;
// `;

// export const FilterHeader = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.backgray};
// `;

// export const CloseFilterButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 18px;
//   color: ${({ theme }) => theme.colors.textgray};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 5px;
//   border-radius: 50%;
//   transition: background 0.2s ease-in-out;

//   &:hover {
//     background: ${({ theme }) => theme.colors.backgray};
//   }
// `;

// export const SubText = styled.span`
//   font-size: 14px;
//   font-weight: 500;
//   line-height: normal;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-top: 4px;
// `;

// export const SearchInput = styled.input`
//   flex: 1;
//   padding: 8px;
//   border: 1px solid ${({ theme }) => theme.colors.backgray};
//   border-radius: 5px;
//   font-size: 14px;
//   outline: none;
// `;




