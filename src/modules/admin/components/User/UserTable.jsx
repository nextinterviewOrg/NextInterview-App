import React, { useState, useEffect } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import { FaBell, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaEye } from "react-icons/fa";

const TableContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 60px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const ScrollableTableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; // Enables smooth scrolling on mobile
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Th = styled.th`
  text-weight: normal;
  text-align: left;
  padding: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.lightgreen};
  color: ${({ theme }) => theme.colors.textgray};
  border: 1px solid #ebfced;
`;

const Tr = styled.tr`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.lightgreen : theme.colors.light};
  cursor: pointer;
  border: 1px solid #ebfced;
`;

const Td = styled.td`
  padding: 5px 5px 5px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderblue};
  text-align: left;
  border: 1px solid #ebfced;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.bluetext};
  border-radius: 4px;
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.light};
    position: relative;

    &::after {
      content: "✔";
      font-size: 12px;
      color: ${({ theme }) => theme.colors.light};
      display: block;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightbrown};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const Email = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textgray};
`;

const ActiveHours = styled.div`
  color: ${({ theme, color }) => theme.colors[color]};
`;

const NoUsersMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textgray};
  padding: 20px;
`;

const UserTable = ({ users, selectedRows, onRowSelectionChange }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    // Simulate loading data (replace with actual data fetching logic)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the time delay as per your actual data fetch time
  }, [users]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // if (users.length === 0) {
  //   return (
  //     <TableContainer>
  //       <NoUsersMessage>No users found</NoUsersMessage>
  //     </TableContainer>
  //   );
  // }

  return (
    <div>
      <TableContainer>
        {loading ? (
          <ShimmerTable row={8} col={7} />
        ) : (
          <ScrollableTableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th></Th>
                  <Th>Name</Th>
                  <Th>Topics Completed</Th>
                  <Th>Avg. Active Hours</Th>
                  <Th>Last Active</Th>
                  <Th></Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <Tr
                    key={index}
                    isSelected={selectedRows.includes(user.clerkId)}
                    onClick={() => onRowSelectionChange(user.clerkId)}
                  >
                    <Td>
                      <Checkbox
                        checked={selectedRows.includes(user.clerkId)}
                        onChange={(e) => e.stopPropagation()}
                      />
                    </Td>
                    <Td>
                      <UserCell>
                        <Avatar>
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                            }}
                            src={user.profilePic}
                            alt={user.name}
                          />
                        </Avatar>
                        <UserInfo>
                          <Name>{user.name}</Name>
                          <Email>{user.email}</Email>
                        </UserInfo>
                      </UserCell>
                    </Td>
                    <Td>{user.topicsCompleted}</Td>
                    <Td>
                      <ActiveHours
                        color={user.activeHours.includes("18h") ? "success" : "warning"}
                      >
                        {user.activeHours}
                      </ActiveHours>
                    </Td>
                    <Td>{user.lastActive}</Td>
                    <Td>{user.bellIcon ? <FaBell /> : <FaBan color="#dc3545" />}</Td>
                    <Td>
                      <Link
                        to={`/admin/userProfile`}
                        state={{ clerkId: user.clerkId }}
                        style={{ textDecoration: "none" }}
                      >
                        <FaEye />
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </ScrollableTableWrapper>
        )}
      </TableContainer>

      {/* Pagination Controls */}
      <div className="pagination" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginRight: "20px", marginLeft:"60px", }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding:"10px", backgroundColor:"#68c184", borderRadius:"5px", border:"none", color:"white" }}
        >
          Prev
        </button>
        <span>{` ${currentPage}  of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding:"10px", backgroundColor:"#68c184", borderRadius:"5px", border:"none", color:"white" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;