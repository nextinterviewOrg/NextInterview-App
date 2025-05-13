import React, { useEffect, useState } from "react";
import { Select, Table, Typography } from "antd";
import { getModuleCode, getTopicCode } from "../../../../../../api/addNewModuleApi";

const { Option } = Select;
const { Title } = Typography;

const ViewCodes = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const response = await getModuleCode();
      setModules(response.data);
    };
    fetchModules();
  }, []);

  const handleModuleChange = async (value) => {
    const module = modules.find((m) => m.module_code === value);
    setSelectedModule(module);
    const response = await getTopicCode(value);
    setTopics(response.data);
  };

  const columns = [
    {
      title: "Topic Name",
      dataIndex: "topic_name",
      key: "topic_name",
    },
    {
      title: "Topic Code",
      dataIndex: "topic_code",
      key: "topic_code",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Title level={4}>Select Module</Title>
      <Select
        showSearch
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="Select a module"
        optionFilterProp="children"
        onChange={handleModuleChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {modules.map((mod) => (
          <Option key={mod.module_code} value={mod.module_code}>
            {mod.module_name} - {mod.module_code}
          </Option>
        ))}
      </Select>

      {selectedModule && (
        <div style={{ marginBottom: 20 }}>
          <Title level={5}>
            {selectedModule.module_name} - {selectedModule.module_code}
          </Title>
        </div>
      )}

      <Table
        dataSource={topics}
        columns={columns}
        rowKey="topic_code"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ViewCodes;
