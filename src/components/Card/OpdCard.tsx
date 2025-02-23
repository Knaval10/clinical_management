import { Card } from "antd";
import React from "react";
import "./card.css";
interface propsType {
  title: string;
  count: number;
  aboutIcon: any;
  icon: any;
  queue: boolean;
  queueCount: string;
}

const OpdCard = ({
  title,
  count,
  aboutIcon = true,
  icon,
  queue = false,
  queueCount,
}: propsType) => {
  return (
    <Card style={{ minWidth: 200 }} className="opd">
      <div className="flex flex-col gap-2">
        <section className="flex justify-between">
          <h2>{title}</h2>
          {aboutIcon ? <div>{aboutIcon}</div> : queue ? "Queue No." : null}
        </section>
        <section className="flex justify-between">
          <div className="flex gap-2">
            <div className="">{icon}</div>
            <p className="font-bold">{count}</p>
          </div>
          <p className="font-bold">{queue ? queueCount : null}</p>
        </section>
      </div>
    </Card>
  );
};

export default OpdCard;
