import React from "react";
import OpdTable, { DataType } from "../../components/Table/OpdTable";
import { TableColumnsType, Tag } from "antd";
import OpdCard from "../../components/Card";

const columns: TableColumnsType<DataType> = [
  {
    title: "S.No.",
    dataIndex: "sn",
    key: "sn",
    render: (text: string) => <a href="/login">{text}</a>,
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
    render: (_: unknown, { tags }: DataType) => (
      <>
        {tags.map((tag) => {
          let color: string;
          switch (tag) {
            case "follow up":
              color = "geekblue";
              break;
            case "new":
              color = "volcano";
              break;
            default:
              color = "green";
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

const data: DataType[] = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: `${i}`,
  sn: `${i + 1}`,
  uhid: `${i + 1000}`,
  patient: "Hari Thapa",
  age: "32/Male",
  time: "10:00",
  department: "OPD",
  doctor: "Ram Thapa",
  queue: 1,
  address: "New York No. 1 Lake Park",
  tags: i % 2 === 0 ? ["follow up"] : i % 3 === 0 ? ["new"] : ["free"],
  action: "Eye",
}));

const NewPatients: React.FC = () => {
  return (
    <main className="px-10 flex flex-col">
      <OpdCard />
      <OpdTable data={data} columns={columns} />
    </main>
  );
};

export default NewPatients;
