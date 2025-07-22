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
  // color: #64748b;
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
  font-size: 2rem;
  flex-shrink: 0;

color: ${({ status, type }) =>
  status === 'attempted' || status === 'completed' ? '#10b981' : 
  type === 'coding' ? '#57209B' :
  '#3b82f6'};

  background-color: ${({ type }) =>
    type === 'coding' ? '#F8EEFF' :             
    '#375DFB0D'};                              

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
  // min-width: 0;
  width:60%;
`;

export const CardStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 0.25rem;
  min-width: 150px;
  text-align: center;

  @media (max-width: 1024px) {
    gap: 0rem;
  }
`;


export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #1e293b; 
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 0.875rem;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 80%;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;
      word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    @media (max-width: 480px) {
    font-size: 0.875rem;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 80px;
  }
`;


export const Status = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;

  background-color: ${({ status }) =>
    status === 'Completed' || status === 'attempted'
      ? '#d1fae5' // light green
      : status === 'viewed'
      ? '#fef9c3' // light yellow
      : '#ffe6e6'}; // red for pending or unknown

  color: ${({ status }) =>
    status === 'Completed' || status === 'attempted'
      ? '#1e4620' // dark green
      : status === 'viewed'
      ? '#854f16' // dark yellow
      : '#d32f2f'}; // dark red
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

