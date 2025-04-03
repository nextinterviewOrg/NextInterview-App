import styled from "styled-components";

export const SideBarwrapper = styled.div`
  background-color: ${(props) => props.theme.colors.sidebarBgColor};
  width: ${(props) => (props.isExpanded ? "250px" : "80px")};
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;

  @media (max-width: 768px) {
   width: ${(props) => (props.isSidebarOpen ? "250px" : "0")};
    position: fixed;
    height: 100vh;
    z-index: 1000;
    transition: width 0.3s ease-in-out;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    img {
      width: ${(props) => (props.isExpanded ? "80%" : "50%")};
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    padding: 0; 
    margin: 0;
    list-style: none;
    align-items: flex-start;
    gap: 10px;
    border: none;
  }

  .menu-item {
    width: 100%;
  }

  .menu-link {
    display: grid;
    grid-template-columns: ${(props) =>
      props.isExpanded ? "1fr 4fr" : "1fr"};
    align-items: center;
    padding: 0 10px;
    color: ${(props) => props.theme.colors.sidebarTextColor || "grey"};
    text-decoration: none;
    margin: 0 15px;
    height: 35px;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) =>
        props.theme.colors.sidebarHoverBgColor || "#e0e0e0"};
    }

    .menu-link-icon {
      margin-right: ${(props) => (props.isExpanded ? "10px" : "0px")};
      font-size: 20px;
    }

    &.active {
      color: white;
      background-color: #2290ac;
      font-weight: bold;
      border: none;
      outline: none;
      border-radius: 5px;
    }

    .menu-link-text {
      display: ${(props) => (props.isExpanded ? "inline-block" : "none")};
      font-size: 14px;
    }
  }

  /* Hamburger icon for mobile view */
  .hamburger-icon {
    display: none;
    cursor: pointer;
    padding: 20px;
    font-size: 30px;
    color: ${(props) => props.theme.colors.text};

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

export const ContentWrapper = styled.div`
  margin-left: ${(props) => (props.isExpanded ? "250px" : "80px")};
  padding: 20px;
  width: calc(100% - ${(props) => (props.isExpanded ? "250px" : "80px")});
  transition: margin-left 0.3s ease, width 0.3s ease;

  @media (max-width: 768px) {
  margin-left: 0px;
  padding: 20px;
  width: 100%;
`;
