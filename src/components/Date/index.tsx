import { DatePicker } from "antd";
import React from "react";
import icon from "../../assets/Clock.svg";

const Date = ({ onChange, value, placeholder }: any) => {
  return (
    <div>
      <DatePicker value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Date;
