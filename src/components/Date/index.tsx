import { DatePicker } from "antd";
import React from "react";

const Date = ({ onChange, value }: any) => {
  return (
    <div>
      <DatePicker value={value} onChange={onChange} />
    </div>
  );
};

export default Date;
