import { useEffect, useState } from "react";
import { Form, Transfer as AntTransfer } from "antd";

function checkIncludes(name, search) {
  if (typeof name === "string" && typeof search === "string") {
    if (name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const Tree = (props = {}) => {
  const { value, data = [], onChange = () => {} } = props;

  const handleData = () => {
    return [...data].map((item = {}) => {
      const { _id } = item;

      return { key: _id, ...item };
    });
  };

  const handleChange = (newTargetKeys) => {
    onChange(newTargetKeys);
  };

  const filterOption = (a = "", b = {}) => {
    const { name = "" } = b;
    const includes = checkIncludes(name, a);

    return includes;
  };

  return (
    <AntTransfer
      dataSource={handleData()}
      showSearch
      filterOption={filterOption}
      targetKeys={value}
      onChange={handleChange}
      render={(item) => {
        const { name = "Без названия" } = item;

        return <div style={{ width: "100%", overflow: "hidden" }}>{name}</div>;
      }}
    />
  );
};

export default Tree;
