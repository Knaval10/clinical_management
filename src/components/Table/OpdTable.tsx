import React from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls }: any = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface DataType {
  key: string;
  sn: string;
  uhid: string;
  patient: string;
  age: string;
  time: string;
  department: string;
  doctor: string;
  queue: number;
  address: string;
  tags: string[];
  action: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "S.No.",
    dataIndex: "sn",
    key: "sn",
    render: (text) => <a href="/login">{text}</a>,
  },
  {
    title: "UHID",
    dataIndex: "uhid",
    key: "uhid",
  },
  {
    title: "Patient Name",
    dataIndex: "patient",
    key: "patient",
  },
  {
    title: "Age/Gender",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Billing Data & Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Doctor Name",
    dataIndex: "doctor",
    key: "doctor",
  },
  {
    title: "Queue no.",
    dataIndex: "queue",
    key: "queue",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === "follow up" ? "geekblue" : "green";
          if (tag === "new") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag} className="capitalize !rounded-xl">
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    fixed: "right",
    width: 90,
    render: () => <a>action</a>,
  },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: `${i}`,
  sn: "1",
  uhid: "1",
  patient: "Hari Thapa",
  age: "32/Male",
  time: "10:00",
  department: "OPD",
  doctor: "Ram Thapa",
  queue: 1,
  address: "New York No. 1 Lake Park",
  tags: i % 2 == 0 ? ["follow up"] : i % 3 ? ["free"] : ["new"],
  action: "Eye",
}));

const App: React.FC = () => {
  const { styles } = useStyle();
  return (
    <Table<DataType>
      // bordered
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default App;
