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
  Input,
  ModalButtons,
  Button
} from "./UserAcess.styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import noData from "../../../../assets/nodataanimation.gif";
import { createAdmin, deleteUser, getAdmins } from '../../../../api/userApi';
 
const ITEMS_PER_PAGE = 10;
 
export default function UserAcess() {
  const [data, setData] = useState([]);
  const [currentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
 
  const filteredData = data.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchText.toLowerCase()))
  );
 
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);
 
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const openModal = () => {
    setFormData({ name: "", email: "", password: "" });
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  const fetchAdmins = React.useCallback(async () => {
    setFetching(true);
    try {
      const res = await getAdmins();
      if (res && res.success && Array.isArray(res.data)) {
        setData(res.data.map(admin => ({
          id: admin._id || admin.id,
          userId: admin._id,
          name: admin.user_name,
          email: admin.user_email,
        })));
      } else {
        setData([]);
      }
    } catch {
      setData([]);
    } finally {
      setFetching(false);
    }
  }, []);
 
  React.useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);
 
  const handleAddUser = async () => {
    if (!areFieldsValid()) return;
    // Check for duplicate email
    const emailExists = data.some(
      (admin) => admin.email && admin.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (emailExists) {
      setFormErrors((prev) => ({ ...prev, email: 'This email is already registered as an admin.' }));
      return;
    }
    setLoading(true);
    try {
      const res = await createAdmin({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      if (res && res.success) {
        closeModal();
        window.location.reload();
      } else {
        alert(res?.message || 'Failed to create admin');
      }
    } catch (error) {
      alert('Error creating admin: ' + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };
 
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const areFieldsValid = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
    };
    let isValid = true;
 
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
 
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
 
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character (!@#$%^&*)";
      isValid = false;
    }
 
    setFormErrors(errors);
    return isValid;
  };
 
  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const user = data.find((item) => item.id === deleteId);
      if (user && user.userId) {
        const res = await deleteUser(user.userId);
        if (res && res.success) {
          setIsDeleteModalOpen(false);
          setDeleteId(null);
          window.location.reload();
        } else {
          alert(res?.message || 'Failed to delete user');
        }
      } else {
        alert('Could not find user ID for deletion.');
      }
    } catch (error) {
      alert('Error deleting user: ' + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <Container>
        <HeaderRow>
          <Title>User Access</Title>
          <CreateButton onClick={openModal}>Add Admin</CreateButton>
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
                <TableHeader>Email</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetching ? (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <ActionsContainer>
                        <RiDeleteBin6Line
                          title="Delete"
                          size={20}
                          color="#FB4F4F"
                          onClick={() => {
                            setDeleteId(item.id);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </ActionsContainer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
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
            <ModalTitle>Add User</ModalTitle>
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
 
            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setFormErrors({ ...formErrors, password: "" });
                }}
                style={{ paddingRight: '32px' }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            {formErrors.password && <span style={{ color: "red", fontSize: "14px" }}>{formErrors.password}</span>}
 
            <ModalButtons>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="submit" onClick={handleAddUser}>
                Add
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
                onClick={handleDeleteUser}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
              <Button onClick={() => setIsDeleteModalOpen(false)} disabled={loading}>Cancel</Button>
            </ModalButtons>
          </ModalBox>
        </Backdrop>
      )}
    </>
  );
}
 