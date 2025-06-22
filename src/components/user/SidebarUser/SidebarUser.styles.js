import styled from "styled-components";

export const SideBarwrapper = styled.div`
  background-color: ${(props) => props.theme.colors.sidebarBgColor};
  width: ${(props) => (props.isExpanded ? "250px" : "80px")};
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  overflow-y: auto;

  z-index: 999;

  @media (max-width: 768px) {
   width: ${(props) => (props.isSidebarOpen ? "250px" : "0")};
    position: fixed;
    z-index: 1000;
    transition: width 0.3s ease-in-out;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    img {
      width: ${(props) => (props.isExpanded ? "80%" : "80%")};
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

    .menu {
  flex: 1 1 auto;          /* take all free vertical space */      /* scroll if items exceed viewport height */
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
  }.mock-card {
    background: linear-gradient(to bottom, #2290ac, #68c184);
    border-radius: 16px;
    padding: 10px;
    text-align: center;
    width: 200px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    // position: absolute;
    top: 65%;
    color: white;
    font-family: Arial, sans-serif;
    display: grid;
    align-items: center;
    justify-content: center;
    left: 10px;     /* participate in normal flow */
   margin-top: 40px; 
  }
 
  .mock-card-icon {
    background: linear-gradient(to bottom, #2290ac, #68c184);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -40px auto 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 5px solid white;
    font-size: 40px;
  }
 
  .mock-card-icon.collapsed{
  background: linear-gradient(to bottom, #2290ac, #68c184);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
   position: absolute;
  top: 60%;
  left: 10px;
}
 
  .mock-card-icon img {
    width: 40px;
    height: 40px;
  }
 
  .mock-card-title {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
 
  .mock-card-description {
    font-size: 14px;
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.9);
  }
 
  .mock-card-button {
    background: white;
    color: #68c184;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
    transition: background 0.3s ease;
  }
 
  .mock-card-button:hover {
    background: #ccc;
  }

    .arrow-toggle {
    position: absolute;
    right: 10px;               /* sits slightly outside the bar */
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: background 0.2s;
    z-index: 1001;
  }

  .arrow-toggle:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    .arrow-toggle { display: none; }   /* hide on mobile; use hamburger */
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
