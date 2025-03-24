import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import {
  ModulesSection,
  ModuleCard,
  ModuleActions,
  SearchBar,
  NewUploadButton,
  SearchBarWrapper,
} from "./Learningmoduleslistview.styles";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { deleteModule, getModule } from "../../../../../api/addNewModuleApi";
import DeleteModule from "../../../components/DeleteModule/DeleteModule"; // Import Delete Modal
import { message } from "antd";

const LearningModulesListView = () => {
  const [modules, setModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal state
  const [selectedModuleId, setSelectedModuleId] = useState(null); // Store module ID
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await getModule();
      const data = response.data.map((item) => ({
        title: item.moduleName,
        topics: item.topicData.length || 0,
        id: item.moduleId,
        imageURL: item.imageURL || "",
      }));
      setModules(data);
      setFilteredModules(data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedModuleId(id); // Store the ID of the module to be deleted
    setIsDeleteModalOpen(true); // Open the modal
  };

  const handleDeleteConfirm = async () => {
    if (selectedModuleId) {
      await deleteModule(selectedModuleId);
      message.success("Module deleted successfully!");
      fetchModules(); // Refresh the list after deletion
    }
    setIsDeleteModalOpen(false); // Close modal
    setSelectedModuleId(null); // Reset selected module ID
  };

  const handleCancelDelete = () => {
    message.error("Module deletion canceled!");
    setIsDeleteModalOpen(false); // Close modal
    setSelectedModuleId(null); // Reset selected module ID
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredModules(modules);
    } else {
      setFilteredModules(
        modules.filter((module) => module.title.toLowerCase().includes(query))
      );
    }
  };

  const handleEditClick = (module) => {
    navigate(`/admin/editmodel/${module._id}`, {
      state: { moduleData: module, moduleId: module._id }, // Pass the selected module's data
    });
  };

  return (
    <ModulesSection>
      <div className="module-header">
        <h3>Data Science Lite Modules</h3>
        <div style={{ display: "flex", gap: "30px" }}>
          <SearchBarWrapper>
            <IoSearch size={20} />
            <SearchBar
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBarWrapper>
          <NewUploadButton>
            <Link to={"/admin/moduleFileUpload"}>File Upload</Link>
          </NewUploadButton>
          <NewUploadButton>
            <Link to={"/admin/uploadmodule"}>New Upload</Link>
          </NewUploadButton>
        </div>
      </div>

      {/* Show shimmer effect if loading */}
      {loading ? (
        <div>
          {[...Array(5)].map((_, index) => (
            <ModuleCard key={index}>
              <div className="module-image shimmer"></div> 
              <div className="module-info">
                <div className="shimmer title"></div>
                <div className="shimmer topic"></div> 
              </div>
              <ModuleActions>
                <div className="shimmer edit-btn"></div>
                <div className="shimmer delete-btn"></div> 
              </ModuleActions>
            </ModuleCard>
          ))}
        </div>
      ) : (
        <div>
          {filteredModules.map((module, index) => (
            <ModuleCard key={index}>
              <img
                src={module.imageURL}
                alt={module.title}
                className="module-image"
              />
              <div className="module-info">
                <h4>
                  <Link to={`/admin/Diagnosing-and-Investigating-Metrics`}>
                    {module.title}
                  </Link>
                </h4>
                <p>{module.topics} topic</p>
              </div>
              <ModuleActions>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(module)}
                >
                  <FiEdit3 size={20} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(module._id)}
                >
                  <RiDeleteBinLine size={20} />
                </button>
              </ModuleActions>
            </ModuleCard>
          ))}
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModule
          onDelete={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </ModulesSection>
  );
};

export default LearningModulesListView;
