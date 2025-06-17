import React, { useState, useEffect } from "react";
import {
  PaymentContainer,
  PaymentHeader,
  CreatePaymentButton,
  TableWrapper,
  StyledTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  Title,
  SubTitle,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  TextArea,
  ActionsContainer,
  ModalMainHead,
    ModalOverlayDelete,
  ModalContentDelete,
    ModalTitleDelete,
    CancelButton,
    DeletePaymentButton,
    ToggleWrapper, Switch
} from "./AdminSubcriptionPlan.styles";
import { RiDeleteBin6Line } from "react-icons/ri";
import noData from "../../../../assets/nodataanimation.gif";
import { createPlan, getAllPlansWithStatus, deletePlan, UpdateToggleStatus, getAllPlans } from "../../../../api/subscriptionApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminSubscriptionPlan = () => {
  const [fetching, setFetching] = useState(true);
  const [plans, setPlans] = useState([]);
  const [viewPlan, setViewPlan] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    interval: "monthly",
    amount: "",
    features: ""
  });
  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  console.log(plans);


const handleToggle = async (planId) => {
  const toggledPlan = plans.find((pl) => pl._id === planId);
  const newStatus = !toggledPlan?.isActive;        // ← use isActive

  try {
    // 1. Optimistic UI update
    setPlans((prev) =>
      prev.map((pl) =>
        pl._id === planId ? { ...pl, isActive: newStatus } : pl
      )
    );

    // 2. Persist to the server
    await UpdateToggleStatus(planId);

    // 3. Feedback
    toast.success(
      `Plan ${newStatus ? "activated" : "deactivated"} successfully`
    );
  } catch (err) {
    console.error(err);
    toast.error("Status update failed");

    // Roll back on error
    setPlans((prev) =>
      prev.map((pl) =>
        pl._id === planId ? { ...pl, isActive: !newStatus } : pl
      )
    );
  }
};






  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const list = await getAllPlansWithStatus();
        setPlans(list);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchPlans();
  }, []);

  const resetNewPlan = () =>
    setNewPlan({ name: "", description: "", interval: "monthly", amount: "", features: "" });

const handleCreateSave = async () => {
  setIsCreate(true);
  if (!newPlan.name.trim() || !newPlan.amount.trim() || !newPlan.description.trim()) return;

  const amountNum = Number(newPlan.amount.trim());
  if (!Number.isFinite(amountNum) || amountNum <= 0) {
    alert("Amount must be a valid positive number");
    return;
  }

  const planData = {
    name: newPlan.name.trim(),
    description: newPlan.description.trim(),
    interval: newPlan.interval,
    amount: amountNum, // Convert to paise
    features: newPlan.features
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0)
  };

  console.log("Sending plan data:", planData);

  try {
    const res = await createPlan(planData);
    console.log("Create plan response:", res);
    const updatedPlans = await getAllPlans();
    setPlans(updatedPlans);
    resetNewPlan();
    setIsCreateOpen(false);
    setTimeout(() => toast.success("Plan created successfully"), 1000);
  } catch (err) {
    console.error("Failed to create plan:", err);
    alert("Plan creation failed. See console for details.");
  } finally {
    setIsCreate(false);
  }
};

const openDeleteModal = (plan) => {   
  setDeletePlanId(plan);    // keep the plan handy for the API call
  setIsDeleteModalOpen(true); // but hide its features modal via the guard below
};

const handleDeleteClick = async () => {
    setIsDelete(true);
  if (!deletePlanId) return;
  try {
    await deletePlan(deletePlanId.razorpay_plan_id);
    setPlans(await getAllPlans());
    setTimeout(() => toast.success("Plan deleted successfully"), 6000);
  } catch (err) {
    console.error("Failed to delete plan:", err);
    toast.error("Plan deletion failed. See console for details.");
  } finally {
    setIsDeleteModalOpen(false);
    setViewPlan(null);
    setIsDelete(false);
  }
};



  return (
    <PaymentContainer>
      <PaymentHeader>
        <Title>Subscription Plans</Title>
        <CreatePaymentButton onClick={() => setIsCreateOpen(true)}>
          Create New Plan
        </CreatePaymentButton>
      </PaymentHeader>

      <SubTitle>Existing Subscription Plans</SubTitle>

      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
                <TableHeader>razorpay plan id</TableHeader>
              <TableHeader>Plan Name</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Features</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {fetching ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                  Loading…
                </TableCell>
              </TableRow>
            ) : plans.length ? (
              plans.map(p => (
                <TableRow key={p._id}>
                    <TableCell>{p.razorpay_plan_id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>₹{p.amount}</TableCell>
                  <TableCell>{p.interval}</TableCell>
                  <TableCell>
                    <a href="#" onClick={() => setViewPlan(p)} className="link-view">view</a>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                       {/* <RiDeleteBin6Line className="link" onClick={() => openDeleteModal(p)} /> */}

<ToggleWrapper
  onClick={() => handleToggle(p._id)}
  active={p.isActive}
  title={p.isActive ? "Deactivate" : "Activate"}
>
  <Switch active={p.isActive} />
</ToggleWrapper>
                    </ActionsContainer>
                 </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                  <img src={noData} alt="No data" style={{ width: 200 }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {viewPlan  &&  (
        <ModalOverlay onClick={() => setViewPlan(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{viewPlan.name} – Features</ModalTitle>
              <ModalClose onClick={() => setViewPlan(null)}>×</ModalClose>
            </ModalHeader>

            <ModalBody>
<ul style={{
  padding: 0,
  margin: 0,

  listStyle: 'none',
}}>
  {viewPlan.features.map((f, i) => (
    <li
      key={i}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 0',
        paddingBottom: "20px",
        borderBottom: i !== viewPlan.features.length - 1 ? '1px solid #eee' : 'none'
      }}
    >
      <span style={{ color: '#333', fontSize: '15px' }}>{f}</span>
    </li>
  ))}
</ul>

            </ModalBody>

            <ModalFooter>
              <CreatePaymentButton onClick={() => setViewPlan(null)}>
                Close
              </CreatePaymentButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {isCreateOpen && (
        <ModalOverlay onClick={() => setIsCreateOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Create New Plan</ModalTitle>
              <ModalClose onClick={() => setIsCreateOpen(false)}>×</ModalClose>
            </ModalHeader>

            <ModalBody>
              <label>Plan Name</label>
              <Input
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              />

              <label style={{ marginTop: 12 }}>Description</label>
              <TextArea
                rows="2"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              />

              <label style={{ marginTop: 12 }}>Amount</label>
              <Input
                type="number"
                value={newPlan.amount}
                onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
              />

              <label style={{ marginTop: 12 }}>Interval</label>
              <Select
                value={newPlan.interval}
                onChange={(e) => setNewPlan({ ...newPlan, interval: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </Select>

              <label style={{ marginTop: 12 }}>Features (comma‑separated)</label>
              <TextArea
                rows="3"
                placeholder="e.g. 10 Tests, Basic Analytics"
                value={newPlan.features}
                onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
              />
            </ModalBody>

            <ModalFooter>
              <CreatePaymentButton onClick={handleCreateSave}>
                {isCreate ? "Saving..." : "Save"}
              </CreatePaymentButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

    {isDeleteModalOpen && (
      <ModalOverlayDelete>
        <ModalContentDelete>
          <ModalMainHead>
            <ModalTitleDelete>Delete Plan</ModalTitleDelete>
            <ModalClose onClick={() => setIsDeleteModalOpen(false)}>×</ModalClose>
          </ModalMainHead>

          <ModalHeader>
            <ModalTitle>Are you sure you want to delete?</ModalTitle>
          </ModalHeader>

          <ModalFooter>
            <DeletePaymentButton onClick={handleDeleteClick}>
              {isDelete ? "Deleting..." : "Delete"}
            </DeletePaymentButton>
            <CancelButton onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </CancelButton>
          </ModalFooter>
        </ModalContentDelete>
      </ModalOverlayDelete>
    )}

    <ToastContainer 
      position="top-center"
      />
    </PaymentContainer>
  );
};

export default AdminSubscriptionPlan;