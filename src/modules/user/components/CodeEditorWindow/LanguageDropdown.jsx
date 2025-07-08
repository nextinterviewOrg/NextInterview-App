import React, { useEffect } from "react";
import Select from "react-select";
import { customStyles } from "./constants/customStyles";
import { languageOptions } from "./constants/languageOptions";
import axios from "axios";

const LanguagesDropdown = ({ onSelectChange }) => {
  const [languages, setLanguages] = React.useState([]);
  useEffect(() => {
    const apiCaller = async () => {
      const options = {
        method: "GET",
        url: "https://judge0-extra-ce.p.rapidapi.com/languages",
        headers: {
          "x-rapidapi-key":
            "39906602eamsh7241fddd134e8ecp1ff6d1jsn745264e9d839",
          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const languageData = response.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.name,
          };
        });
        setLanguages(languageData);
      } catch (error) {
        console.error(error);
      }
    };
    apiCaller();
  }, []);
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languages}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
