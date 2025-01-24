import { Card } from "antd";
import React from "react";
import "./card.css";
interface propsType {
  title: string;
  count: number;
}

const StatCard = ({ title, count }: propsType) => {
  return (
    <Card style={{ minWidth: 100 }} className="stat">
      <article className="flex gap-1">
        <p>{title}</p>
        <p>{`(${count})`}</p>
      </article>
    </Card>
  );
};

export default StatCard;
