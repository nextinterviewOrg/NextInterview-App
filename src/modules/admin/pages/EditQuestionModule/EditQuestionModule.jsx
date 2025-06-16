import React, { useEffect, useState } from 'react';
import {
    Container, TopBar, SearchInput, ModuleWrapper, Tabs, Tab, Table,
  TableHeader, TableBody, TableRow, Cell, TCell, ActionIcons, SearchWrapper,
  ConfirmationModal, ModalContent, CloseButton, ModalTitle, ModalButtons,
  TableWrapper, TableWrapperCategory, TableCategory, TableHeaderCategory,
  TableBodyCategory, TableRowCategory, CellCategory, Overlay, CreateModal,
  CreateModalHeader, CreateModalTitle, CreateModalClose, CreateModalBody,
  CreateModalFooter, Label, Input, BtnPrimary, BtnSecondary,
  ActionButtons, AddButton, RemoveButton,ModalTextTitle, ModelTextHeader, 
  DeleteCloseButton, CategaryModalContent
} from './EditQuestionModule.styles';
import { Select, message } from 'antd';
import Lottie from "lottie-react";
import dataNot from "../../../../assets/Lottie/5nvMVE1u7L.json";

import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import EditQuestion from '../../components/Learningmodulescomponents/EditQuestion/EditQuestion';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3, FiEdit } from "react-icons/fi";
import { getModule } from '../../../../api/addNewModuleApi';
import { getSkillAssessment, getSkillAssessmentByModule, softDeleteSkillAssessment } from '../../../../api/skillAssessmentApi';
import { editTiy, gettiyByModule, softDeleteTiy } from '../../../../api/tiyApi';
import { editQuestionBank, getQuestionBankByModule, softDeleteQuestionBank } from '../../../../api/questionBankApi';
import { editMainQuestion, getMainQuestionByModule, softDeleteMainQuestion } from '../../../../api/userMainQuestionBankApi';
import {
  createCategory, getAllCategory, updateCategory,
  deleteCategory, addQuestionsToCategory, getQuestionsToAddToCategory,
  removeQuestionsFromCategory
} from '../../../../api/categaryApi';

const TABS = ['Skill Assessment', 'Try-it-Yourself', 'Question Bank', 'Category'];
const normalizeCategoryList = (raw) => (Array.isArray(raw) ? raw : (raw?.data ?? []));

const EditQuestionModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Modules');


    /* ---------- state ---------- */
  const [activeTab, setActiveTab] = useState('Skill Assessment');
  const [searchTerm, setSearchTerm] = useState('');

  /* module dropdown */
  const [moduleOptions, setModuleOptions] = useState([]);
  const [selectedModuleCode, setSelectedModuleCode] = useState(moduleOptions.length > 0 ? moduleOptions[0].value : null);

  /* questions */
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isQEditOpen, setIsQEditOpen] = useState(false);
  const [isQDeleteOpen, setIsQDeleteOpen] = useState(false);

  /* categories */
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', count: '' });
  const [catSaving, setCatSaving] = useState(false);

  /* create / edit category modal */
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /* delete category confirm */
  const [isCatDeleteOpen, setIsCatDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  /* ------- NEW: add‑question modal ------- */
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addCatId, setAddCatId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [selectedQIds, setSelectedQIds] = useState([]);
  const  [ isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [removeCatId, setRemoveCatId] = useState(null);


  useEffect(() => {
    const apiCaller = async () => {
      try {
        const moduleResponse = await getModule();
        const data = moduleResponse.data.map((module) => { return ({ value: module.module_code, label: module.moduleName }) })
        console.log("data", data);
        setModuleOptions(data);
        setSelectedModuleCode(data.length > 0 ? data[0].value : null);
      } catch (error) {
        console.log(error);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        if (activeTab === 'Skill Assessment') {
          const quetsionData = await getSkillAssessmentByModule(selectedModuleCode);
          setQuestions(quetsionData.data);

        } else if (activeTab === 'Try-it-Yourself') {
          const quetsionData = await getMainQuestionByModule(selectedModuleCode, 'tiy');
          setQuestions(quetsionData.data);

        } else if (activeTab === 'Question Bank') {
          const questionData = await getMainQuestionByModule(selectedModuleCode, 'questionBank');
          setQuestions(questionData.data);
        }


      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setQuestions([]);
        }
      }
    }
    apiCaller();
  }, [selectedModuleCode, activeTab]);

   const loadCategories = async () => {
    setCatLoading(true);
    try {
      const raw = await getAllCategory();
      console.log('Categories:', raw);
      setCategories(normalizeCategoryList(raw));
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setCatLoading(false);
    }
  };
  useEffect(() => { if (activeTab === 'Category') loadCategories(); }, [activeTab]);


  /* questions (non‑category tabs) */
  useEffect(() => {
    if (activeTab === 'Category' || !selectedModuleCode) return setQuestions([]);
    (async () => {
      const map = {
        'Skill Assessment': () => getSkillAssessmentByModule(selectedModuleCode),
        'Try-it-Yourself': () => getMainQuestionByModule(selectedModuleCode, 'tiy'),
        'Question Bank': () => getMainQuestionByModule(selectedModuleCode, 'questionBank'),
      };
      const res = await map[activeTab]();
      setQuestions(res.data ?? []);
    })().catch(() => setQuestions([]));
  }, [activeTab, selectedModuleCode]);

  useEffect(() => {
    if (!isAddModalOpen || !addCatId) return;
    (async () => {
      try {
        const res = await getQuestionsToAddToCategory(addCatId);
        console.log(res);
        const opts = (res?.data ?? []).map((q) => ({ label: q.question, value: q._id }));
        setQuestionOptions(opts);
      } catch (err) {
        console.error(err);
        setQuestionOptions([]);
      }
    })();
  }, [isAddModalOpen, addCatId]);

  /* ------------- question handlers ------------- */
  const openQEdit = (q, idx) => { setCurrentQuestion({ ...q, index: idx }); setIsQEditOpen(true); };
  const saveQEdit = async (upd) => {
    if (activeTab !== 'Skill Assessment') await editMainQuestion(upd._id, { question: upd.question, answer: upd.answer });
    setQuestions((p) => p.map((q, i) => (i === upd.index ? upd : q)));
    setIsQEditOpen(false);
  };
  const confirmQDelete = (q, idx) => { setCurrentQuestion({ ...q, index: idx }); setIsQDeleteOpen(true); };
  const doQDelete = async () => {
    await softDeleteMainQuestion(currentQuestion._id);
    setQuestions((p) => p.filter((_, i) => i !== currentQuestion.index));
    setIsQDeleteOpen(false);
  };

  /* ------------- category handlers ------------- */
  const openCatCreate = () => { setEditingCategoryId(null); setCatForm({ name: '', count: '' }); setIsCreateModalOpen(true); };
  const openCatEdit = (cat) => { setEditingCategoryId(cat._id); setCatForm({ name: cat.category_name, count: cat.numberOfQuestions }); setIsCreateModalOpen(true); };

  
const saveCategory = async () => {
  const { name, count } = catForm;
  if (!name.trim() || !Number(count)) return;

  setCatSaving(true);
  try {
    const payload = {
      category_name: name.trim(),
      numberOfQuestions: Number(count),
    };

    if (editingCategoryId) {
      await updateCategory(editingCategoryId, payload);      // PUT
      message.success('Category updated');
    } else {
      await createCategory(payload);                         // POST
      message.success('Category created');
    }

    await loadCategories();          // refresh table first
    setIsCreateModalOpen(false);     // then close modal
  } catch (err) {
    console.error(err);
    message.error(err.response?.data?.message || 'Failed to save category');
  } finally {
    setCatSaving(false);
  }
};
  /* delete category */
  const confirmCatDelete = (cat) => { setCategoryToDelete(cat); setIsCatDeleteOpen(true); };
  const doCatDelete = async () => {
    await deleteCategory(categoryToDelete._id);
    await loadCategories();
    setIsCatDeleteOpen(false);
  };

  /* --------- NEW: add‑question handlers --------- */
const openAddModal = async (cat) => {
  setAddCatId(cat._id);
  setSelectedQIds([]);

  // Existing questions in the category to disable
  const alreadyAddedQIds = cat.questions?.map((q) => q._id || q) || [];

  try {
    let allQuestions = [];

    if (!questions.length) {
      const bank = await getMainQuestionByModule(selectedModuleCode, 'questionBank');
      allQuestions = bank.data ?? [];
    } else {
      allQuestions = questions;
    }

    // Build question options with "disabled" flag
    const options = allQuestions.map((q) => ({
      label: q.question,
      value: q._id,
      disabled: alreadyAddedQIds.includes(q._id),
    }));

    setQuestionOptions(options);
  } catch (e) {
    console.error("Failed to fetch questions", e);
    setQuestionOptions([]);
  }

  setIsAddModalOpen(true);
};


  /* remove question from category */

const openRemoveModal = (cat) => {
  setRemoveCatId(cat._id);
  setSelectedQIds([]);
  
  const questionList = (cat.questions || []).map(q => ({
    label: q.question || q.question_text || 'Untitled', // adjust if needed
    value: typeof q === 'string' ? q : q._id,
  }));

  setQuestionOptions(questionList);
  setIsRemoveModalOpen(true);
};

const removeQuestions = async () => {
  if (!removeCatId || !selectedQIds.length) return;

  try {
    await removeQuestionsFromCategory({
      category_id: removeCatId,
      question_ids: selectedQIds,
    });

    message.success('Questions removed from category');
    await loadCategories();
    setIsRemoveModalOpen(false);
  } catch (err) {
    console.error(err);
    message.error('Failed to remove questions');
  }
};
 


  const addQuestions = async () => {
    if (!addCatId || !selectedQIds.length) return;
    try {
      await addQuestionsToCategory({ category_id: addCatId, question_ids: selectedQIds });
      message.success('Questions added');
      await loadCategories();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error('Failed to add questions');
    }
  };


  const handleEditClick = (q, idx) => {
    setCurrentQuestion({ ...q, index: idx });
    setIsModalOpen(true);
  };

  const handleSave = async (updated) => {
    console.log("updated", updated);
    try {
      if (activeTab === 'Skill Assessment') {
        // const quetsionData = await softDeleteSkillAssessment(currentQuestion._id);

      } else if (activeTab === 'Try-it-Yourself') {
        const quetsionData = await editMainQuestion(updated._id, {
          question: updated.question,
          answer: updated.answer,
        });


      } else if (activeTab === 'Question Bank') {
        const questionData = await editMainQuestion(updated._id, {
          question: updated.question,
          answer: updated.answer,
        });
      }
      const newQuestions = [...questions];
      newQuestions[updated.index] = updated;
      setQuestions(newQuestions);
      setIsModalOpen(false);
      setCurrentQuestion(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (q, idx) => {
    setCurrentQuestion({ ...q, index: idx });
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (activeTab === 'Skill Assessment') {
        const quetsionData = await softDeleteSkillAssessment(currentQuestion._id);

      } else if (activeTab === 'Try-it-Yourself') {
        const quetsionData = await softDeleteMainQuestion(currentQuestion._id);


      } else if (activeTab === 'Question Bank') {
        const questionData = await softDeleteMainQuestion(currentQuestion._id);
      }
      const newQuestions = questions.filter((_, idx) => idx !== currentQuestion.index);
      setQuestions(newQuestions);
      setIsConfirmationModalOpen(false);
      setCurrentQuestion(null);
    } catch (error) {
      console.log(error);
    }


  };

  const handleDeleteCancel = () => {
    setIsConfirmationModalOpen(false);
    setCurrentQuestion(null);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAnswer = (q) => {
    if (q.question_type === 'mcq') {
      const options = [
        { label: 'A', value: q.option_a, key: 'option_a' },
        { label: 'B', value: q.option_b, key: 'option_b' },
        { label: 'C', value: q.option_c, key: 'option_c' },
        { label: 'D', value: q.option_d, key: 'option_d' },
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {options.map((opt, i) => (
            <div
              key={i}
              style={{
                fontWeight: q.correct_option === opt.key ? 'bold' : 'normal',
              }}
            >
              {opt.label}. {opt.value}
            </div>
          ))}
        </div>
      );
    }

    return q.answer || "N/A";
  };

   const renderCategoryRows = () => {
    if (catLoading)     return <TableRowCategory><CellCategory colSpan={3}>Loading…</CellCategory></TableRowCategory>;
    if (!categories.length) return <TableRowCategory><CellCategory colSpan={3}>No categories</CellCategory></TableRowCategory>;
    return categories.map((cat) => (
      <TableRowCategory key={cat._id}>
        <CellCategory>{cat.category_name}</CellCategory>
        <CellCategory>
          <ActionIcons>
            <FiEdit onClick={() => openCatEdit(cat)} color='#2290ac' style={{ cursor: 'pointer' }}  size={20}/>
            <RiDeleteBinLine onClick={() => confirmCatDelete(cat)} color='#dc3545' style={{ cursor: 'pointer' }} size={20} />
          </ActionIcons>
        </CellCategory>
        <CellCategory>
          <ActionButtons>
            <AddButton onClick={() => openAddModal(cat)}>Add Question</AddButton>
            <RemoveButton onClick = {() => openRemoveModal(cat)}>Remove Questions</RemoveButton>
          </ActionButtons>
        </CellCategory>
      </TableRowCategory>
    ));
  };



  return (
    <Container>
      <TopBar>
        <SearchWrapper>
          <FaSearch style={{ marginRight: '8px', color: '#888' }} />
          <SearchInput
            placeholder="Search for a Question"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        {activeTab !== 'Category' && (

        <ModuleWrapper>
          {/* <DropdownIcon>
            <MdOutlineKeyboardArrowDown className="ModuleIncon" />
          </DropdownIcon> */}
          {/* <CustomSelectWrapper> */}
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => {
              var _a, _b;
              return (
                (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
                  _a !== void 0
                  ? _a
                  : ''
              )
                .toLowerCase()
                .localeCompare(
                  ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
                    _b !== void 0
                    ? _b
                    : ''
                  ).toLowerCase(),
                );
            }}
             key={selectedModuleCode}
              virtual={false} 
            options={moduleOptions}
            value={selectedModuleCode}
            onChange={(value) =>{ console.log("value", value);setSelectedModuleCode(value)}}
          />
          {/* </CustomSelectWrapper> */}
        </ModuleWrapper>
        )}  
      </TopBar>

      <Tabs>
        {TABS.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
       {activeTab === 'Category'
        ? (
          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'right', marginBottom: 12 }}>
              <BtnPrimary onClick={openCatCreate}>Create Categary</BtnPrimary>
            </div>
            <TableWrapperCategory>
              <TableCategory>
                <TableHeaderCategory>
                  <TCell header>Categories</TCell><TCell header>Actions</TCell><TCell header>Questions Action</TCell>
                </TableHeaderCategory>
                <TableBodyCategory>{renderCategoryRows()}</TableBodyCategory>
              </TableCategory>
            </TableWrapperCategory>
          </div>
        )
: questions.length ? (
          <TableWrapper>
            <Table>
              <TableHeader>
                <Cell header>Type</Cell>
                <Cell header>Question</Cell>
                <Cell header>Answer</Cell>
                <Cell header>Action</Cell>
              </TableHeader>

              <TableBody>
                {filteredQuestions.map((q, idx) => (
                  <TableRow key={idx}>
                    <Cell>{q.question_type}</Cell>
                    <Cell>{q.question}</Cell>
                    <Cell>{renderAnswer(q)}</Cell>
                    <Cell>
                      <ActionIcons>
                        {(q.question_type === 'single-line' || q.question_type === 'multi-line') && (
                          <FiEdit3
                            color="#888888"
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                            onClick={() => handleEditClick(q, idx)}
                          />
                        )}
                        <RiDeleteBinLine
                          color="#dc3545"
                          style={{ cursor: 'pointer', fontSize: '20px' }}
                          onClick={() => handleDeleteClick(q, idx)}
                        />
                      </ActionIcons>
                    </Cell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper> ) :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> <Lottie
            className="Lottie"
            animationData={dataNot}
            loop={true}
            style={{
              // width: "100%", height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "50vh",      // full viewport height
              margin: 0,            // ensure no default margins
              padding: 0,
            }}
          /></div>
        }
      <EditQuestion
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentQuestion(null);
        }}
        questionData={currentQuestion}
        activeTab={activeTab}
        onSave={handleSave}
      />

      {isConfirmationModalOpen && (
        <ConfirmationModal onClick={handleDeleteCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleDeleteCancel}>×</CloseButton>
            <ModalTitle>Are you sure you want to delete this question?</ModalTitle>
            <ModalButtons>
              <button onClick={handleDeleteCancel}>Cancel</button>
              <button onClick={handleDeleteConfirm}>Delete</button>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}

        {/* category delete confirm */}
      {isCatDeleteOpen && (
        <ConfirmationModal onClick={()=>setIsCatDeleteOpen(false)}>
          <CategaryModalContent onClick={(e)=>e.stopPropagation()}>
            <ModelTextHeader>
              <ModalTextTitle>Delete Category</ModalTextTitle>        
              <DeleteCloseButton onClick={()=>setIsCatDeleteOpen(false)}>×</DeleteCloseButton>
            </ModelTextHeader>
            <ModalTitle>Delete category “{categoryToDelete?.category_name}”?</ModalTitle>
            <ModalButtons><button onClick={()=>setIsCatDeleteOpen(false)}>Cancel</button><button onClick={doCatDelete}>Delete</button></ModalButtons>
          </CategaryModalContent>
        </ConfirmationModal>
      )}

      {/* create / edit category */}
      {isCreateModalOpen && (
        <Overlay onClick={()=>setIsCreateModalOpen(false)}>
          <CreateModal onClick={(e)=>e.stopPropagation()}>
            <CreateModalHeader>
              <CreateModalTitle>{editingCategoryId ? 'Edit Category' : 'Create Category'}</CreateModalTitle>
              <CreateModalClose onClick={()=>setIsCreateModalOpen(false)}>×</CreateModalClose>
            </CreateModalHeader>
            <CreateModalBody>
              <Label>Name</Label><Input value={catForm.name} onChange={(e)=>setCatForm({ ...catForm, name:e.target.value })}/>
              <Label style={{ marginTop:24 }}>Number of questions</Label>
              <Input type="number" min="1" value={catForm.count} onChange={(e)=>setCatForm({ ...catForm, count:e.target.value })}/>
            </CreateModalBody>
            <CreateModalFooter>
              <BtnSecondary onClick={()=>setIsCreateModalOpen(false)}>Cancel</BtnSecondary>
              <BtnPrimary onClick={saveCategory} disabled={catSaving}>{catSaving?'Saving…':editingCategoryId?'Update':'Create'}</BtnPrimary>
            </CreateModalFooter>
          </CreateModal>
        </Overlay>
      )}

      {/* ---------- NEW: add‑question modal ---------- */}
      {isAddModalOpen && (
        <Overlay onClick={() => setIsAddModalOpen(false)}>
          <CreateModal onClick={(e) => e.stopPropagation()}>
            <CreateModalHeader>
              <CreateModalTitle>
                {questionOptions.length ? 'Select Questions' : 'No Eligible Questions'}
              </CreateModalTitle>
              <CreateModalClose onClick={() => setIsAddModalOpen(false)}>×</CreateModalClose>
            </CreateModalHeader>
<CreateModalBody style={{ gap: 16 }}>
  <Label>Select questions</Label>
  <Select
    mode="multiple"
    value={selectedQIds}
    onChange={setSelectedQIds}
    options={questionOptions}
    style={{ width: '100%' }}
    placeholder="Select questions to add"
  />

{selectedQIds.length > 0 && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
    {selectedQIds.map((id) => {
      const label = questionOptions.find((opt) => opt.value === id)?.label || 'Unknown';
      return (
        <div
          key={id}
          style={{
            border: '1px solid #91d5ff',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ flexGrow: 1 }}>{label}</span>
          <span
            onClick={() => setSelectedQIds((prev) => prev.filter((qId) => qId !== id))}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#ff4d4f',
              marginLeft: '12px',
            }}
          >
            ×
          </span>
        </div>
      );
    })}
  </div>
)}


 
</CreateModalBody>

            <CreateModalFooter>
              <BtnSecondary onClick={() => setIsAddModalOpen(false)}>Cancel</BtnSecondary>
              <BtnPrimary onClick={addQuestions} disabled={!selectedQIds.length}>
                Add
              </BtnPrimary>
            </CreateModalFooter>
          </CreateModal>
        </Overlay>
      )}

      {isRemoveModalOpen && (
  <Overlay onClick={() => setIsRemoveModalOpen(false)}>
    <CreateModal onClick={(e) => e.stopPropagation()}>
      <CreateModalHeader>
        <CreateModalTitle>
          {questionOptions.length ? 'Remove Questions from Category' : 'No Questions in Category'}
        </CreateModalTitle>
        <CreateModalClose onClick={() => setIsRemoveModalOpen(false)}>×</CreateModalClose>
      </CreateModalHeader>

      <CreateModalBody style={{ gap: 16 }}>
        <Label>Select questions to remove</Label>
        <Select
          mode="multiple"
          value={selectedQIds}
          onChange={setSelectedQIds}
          options={questionOptions}
          style={{ width: '100%' }}
          placeholder="Select questions to remove"
        />

        {selectedQIds.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {selectedQIds.map((id) => {
              const label = questionOptions.find((opt) => opt.value === id)?.label || 'Unknown';
              return (
                <div
                  key={id}
                  style={{
                    border: '1px solid #ffa39e',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ flexGrow: 1 }}>{label}</span>
                  <span
                    onClick={() => setSelectedQIds((prev) => prev.filter((qId) => qId !== id))}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: '#ff4d4f',
                      marginLeft: '12px',
                    }}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CreateModalBody>

      <CreateModalFooter>
        <BtnSecondary onClick={() => setIsRemoveModalOpen(false)}>Cancel</BtnSecondary>
        <BtnPrimary onClick={removeQuestions} disabled={!selectedQIds.length}>
          Remove
        </BtnPrimary>
      </CreateModalFooter>
    </CreateModal>
  </Overlay>
)}

    </Container>
  );
};

export default EditQuestionModule;
