import React, { useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ActionsContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  CreateButton,
  Backdrop,
  ModalBox,
  ModalTitle,
  Select,
  Input,
  ModalButtons,
  Button
} from "./UserAcess.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import noData from "../../../../assets/nodataanimation.gif";
 
const initialData = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  name: "DIGI9",
  role: "Admin",
  mobileNumber: "9090909090",
  email: "digi9@gmail.com",
}));
 
const ITEMS_PER_PAGE = 10;
 
export default function UserAcess() {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobileNumber: "",
    email: "",
  });
 
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );
 
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);
 
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    if (type === "edit" && user) {
      setFormData({
        name: user.name,
        role: user.role,
        mobileNumber: user.mobileNumber,
        email: user.email,
      });
    } else {
      setFormData({ name: "", role: "", mobileNumber: "", email: "" });
    }
    setIsModalOpen(true);
   
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
 
  const handleAddUser = () => {
    if (!areFieldsValid()) return;
 
    const newUser = {
      id: data.length + 1,
      ...formData,
    };
    setData([...data, newUser]);
    closeModal();
  };
 
 
  const handleEditUser = () => {
    if (!areFieldsValid()) return;
 
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedUser.id ? { ...item, ...formData } : item
      )
    );
    closeModal();
  };
 
 
  const [formErrors, setFormErrors] = useState({
    name: "",
    role: "",
    mobileNumber: "",
    email: "",
  });
 
  const areFieldsValid = () => {
    const errors = {
      name: "",
      role: "",
      mobileNumber: "",
      email: "",
    };
    let isValid = true;
 
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
 
    if (!formData.role) {
      errors.role = "Role is required";
      isValid = false;
    }
 
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      errors.mobileNumber = "Valid 10-digit mobile number is required";
      isValid = false;
    }
 
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
 
    setFormErrors(errors);
    return isValid;
  };
 
 
  return (
    <>
      <Container>
        <HeaderRow>
          <Title>User Access</Title>
          <CreateButton onClick={() => openModal("add")}>Add Admin</CreateButton>
        </HeaderRow>
 
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchWrapper>
 
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Mobile Number</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.mobileNumber}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <ActionsContainer>
                        <BiEditAlt
                          title="Edit"
                          size={20}
                          onClick={() => openModal("edit", item)}
                        />
                        <RiDeleteBin6Line
                          title="Delete"
                          size={20}
                          color="#FB4F4F"
                          onClick={() => {
                            setDeleteId(item.id);
                            setSelectedUser(item);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </ActionsContainer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                    <img src={noData} alt="No Data" style={{ padding: "10%" }} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </Container>
 
      {isModalOpen && (
        <Backdrop onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{modalType === "add" ? "Add User" : "Edit User"}</ModalTitle>
            <Input
  placeholder="Name"
  value={formData.name}
  onChange={(e) => {
    const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({ ...formData, name: onlyLetters });
    setFormErrors({ ...formErrors, name: "" });
  }}
/>
{formErrors.name && <span style={{ color: "red", fontSize: "14px" }}>{formErrors.name}</span>}
 
<Select
  value={formData.role}
  onChange={(e) => {
    setFormData({ ...formData, role: e.target.value });
    setFormErrors({ ...formErrors, role: "" });
  }}
>
  <option value="">Select Role</option>
  <option value="Admin">Admin</option>
  <option value="User">User</option>
</Select>
{formErrors.role && <span style={{ color: "red", fontSize: "14px" }}>{formErrors.role}</span>}
 
<Input
  placeholder="Mobile Number"
  value={formData.mobileNumber}
  onChange={(e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobileNumber: digitsOnly });
    setFormErrors({ ...formErrors, mobileNumber: "" });
  }}
/>
{formErrors.mobileNumber && <span style={{ color: "red", fontSize: "14px" }}>{formErrors.mobileNumber}</span>}
 
<Input
  type="email"
  placeholder="Email"
  value={formData.email}
  onChange={(e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setFormErrors({ ...formErrors, email: "" });
  }}
/>
{formErrors.email && <span style={{ color: "red", fontSize: "14px" }}>{formErrors.email}</span>}
 
 
            <ModalButtons>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="submit" onClick={modalType === "add" ? handleAddUser : handleEditUser}>
                {modalType === "add" ? "Add" : "Save"}
              </Button>
            </ModalButtons>
          </ModalBox>
        </Backdrop>
      )}
 
      {isDeleteModalOpen && (
        <Backdrop onClick={() => setIsDeleteModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <p className="delete-modal-text">Are you sure you want to delete this user?</p>
            <ModalButtons>
              <Button
                variant="delete"
                onClick={() => {
                  setData((prev) => prev.filter((item) => item.id !== deleteId));
                  setIsDeleteModalOpen(false);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>
              <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            </ModalButtons>
          </ModalBox>
        </Backdrop>
      )}
    </>
  );
}
 