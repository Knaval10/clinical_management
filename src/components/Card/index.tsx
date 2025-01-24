import { Card } from "antd";
import React from "react";

interface propsType {
  title: string;
  count: number;
  aboutIcon: boolean;
  queue: boolean;
}

const OpdCard = ({
  title,
  count,
  aboutIcon = true,
  queue = true,
}: propsType) => {
  return (
    <Card style={{ width: 300 }}>
      <div className="flex flex-col">
        <section className="flex justify-between">
          <h2>{title}</h2>
          {aboutIcon ? "aboutIcon" : "Queue No."}
        </section>
        <section className="flex justify-between">
          <article className="flex gap-1">
            <p>icon</p>
            <p>{count}</p>
          </article>
          {queue ? "queue" : null}
        </section>
      </div>
    </Card>
  );
};

export default OpdCard;
