import styled from "styled-components";

export const UserChallengesWrapper = styled.div`    

  .divider {
    border: 1px solid #F5F5F5;
    margin-top: 50px;
  }

  .empty-tab {
    text-align: center;
    font-style: italic;
    color: gray;
    margin-top: 30px;
  }
`;

export const Challengescontainer = styled.div`
  margin-left: 60px;

  @media (max-width: 1024px) {
    margin-left: 40px;
}

@media (max-width: 768px) {
    margin-left: 20px;
}

@media (max-width: 480px) {
    margin-left: 10px;
}
`;

export const Tabbuttons = styled.div`
  display: flex;
    gap: 10px;
    margin-bottom: 10px;

     button {
      padding: 8px 16px;
      border: none;
      background-color: #eee;
      cursor: pointer;
      border-radius: 4px;
      font-weight: 500;

      &.active {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
      }
    }
`;