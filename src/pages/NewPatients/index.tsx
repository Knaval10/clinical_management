import React, { useEffect, useState } from "react";
import OpdTable, { DataType } from "../../components/Table/OpdTable";
import { Input, Select, TableColumnsType, Tag } from "antd";
import OpdCard from "../../components/Card/OpdCard";
import StatCard from "../../components/Card/StatCard";
import { tableData } from "../../constants/tableData";
import Date from "../../components/Date";
import { formatDate } from "../../utils/helperFunction";
import viewIcon from "../../assets/EyeIcon.svg";
import {
  AlertOutlined,
  ClockCircleOutlined,
  ExceptionOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
const columns: TableColumnsType<DataType> = [
  {
    title: "S.No.",
    dataIndex: "sn",
    key: "sn",
    align: "center",
  },
  {
    title: "UHID",
    dataIndex: "uhid",
    key: "uhid",
    align: "center",
  },
  {
    title: "Patient Name",
    dataIndex: "patient",
    key: "patient",
    // align: "center",
  },
  {
    title: "Age/Gender",
    dataIndex: "age",
    key: "age",
    align: "center",
  },
  {
    title: "Billing Data & Time",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    // align: "center",
  },
  {
    title: "Doctor Name",
    dataIndex: "doctor",
    key: "doctor",
    // align: "center",
  },
  {
    title: "Queue no.",
    dataIndex: "queue",
    key: "queue",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    align: "center",

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
            <Tag
              color={color}
              key={tag}
              className="capitalize !rounded-xl w-full !flex !justify-center !m-0"
            >
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
    align: "center",
    render: () => (
      <div className="flex justify-center ">
        <a className="border-[0.5px] border-gray-300 p-1 rounded-lg">
          <img src={viewIcon} alt="view details" />
        </a>
      </div>
    ),
  },
];

const initialData: DataType[] = tableData.map<DataType>((item, i) => ({
  key: i,
  sn: item.sn,
  uhid: item.uhid,
  patient: item.patient,
  age: `${item.age}/${item.gender}`,
  time: formatDate(item.time),
  department: item.department,
  doctor: item.doctor,
  queue: item.queue,
  address: item.address,
  tags: i % 2 === 0 ? ["follow up"] : i % 3 === 0 ? ["new"] : ["free"],
  action: "Eye",
}));

const NewPatients: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataType[]>(initialData);
  const doctorOptions = tableData.map((item) => ({
    value: item.doctor,
    label: item?.doctor,
  }));
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const handleDoctorFilter = (value: string) => {
    setSelectedDoctor(value);
    const filtered = initialData.filter((item) => item.doctor === value);
    setFilteredData(filtered);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = initialData.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(value)
      )
    );
    console.log("filtered", filtered);
    setFilteredData(filtered);
  };
  const filterByDateRange = (
    data: DataType[],
    start: string | null,
    end: string | null
  ) => {
    if (!start || !end) return data;

    const startDateObj = formatDate(start);
    const endDateObj = formatDate(end);

    return data.filter((item) => {
      const itemDate = formatDate(item.time);
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
  };
  const handleDateFilter = () => {
    if (startDate && endDate) {
      const filtered = filterByDateRange(initialData, startDate, endDate);
      setFilteredData(filtered);
    }
  };

  // Use effect to trigger filtering when both dates are selected
  useEffect(() => {
    if (startDate && endDate) {
      handleDateFilter();
    }
  }, [startDate, endDate]);

  // Date input handlers
  const handleStartDateChange = (value: any) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(value);
  };
  console.log("date", startDate, endDate);
  return (
    <main className="px-10 flex flex-col">
      <section>
        home Clinical Management OPD New Patients
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p>Stethoscope</p>
            <h2>OPD Department</h2>
            <p>Filter</p>
            <p>Reload</p>
          </div>
          <div className="flex gap-2">
            <p>Hide filter</p>
            <p>Download Excel</p>
          </div>
        </div>
      </section>
      <section>
        <h3>Filter:</h3>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="period">Period</label>
            <div className="flex gap-2">
              <Date
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
              />
              <Date
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
              />

              {/* <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-400"
                onClick={handleDateFilter}
              >
                Apply
              </button> */}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="period">Filter Via Doctor</label>
            <Select
              value={selectedDoctor}
              options={doctorOptions}
              onChange={handleDoctorFilter}
              placeholder="Select a doctor"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pt-3">
        <OpdCard
          title="New Patients"
          count={0}
          aboutIcon={false}
          queue={false}
          icon={<UserOutlined />}
        />
        <OpdCard
          title="New Patients"
          count={0}
          aboutIcon={<ExclamationCircleOutlined />}
          queue={false}
          icon={<ClockCircleOutlined />}
        />
        <OpdCard
          title="New Patients"
          count={0}
          aboutIcon={false}
          queue={false}
          icon={<UserAddOutlined />}
        />
        <OpdCard
          title="New Patients"
          count={0}
          aboutIcon={false}
          queue={false}
          icon={<ExceptionOutlined />}
        />
        <OpdCard
          title="New Patients"
          count={0}
          aboutIcon={false}
          queue={false}
          icon={<AlertOutlined />}
        />
      </section>
      <section className="py-5 grid grid-cols-2 sm:grid-cols-4 gap-2 w-[45%]">
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
      </section>
      <section className="flex flex-col gap-5">
        <div className="flex gap-[0.5px]">
          <div className="border-2 border-gray-200 rounded-l-lg p-1">
            <SearchOutlined />
          </div>
          <Input
            type="text"
            value={searchText}
            onChange={handleSearch}
            allowClear
            placeholder="Search modules or data"
            style={{ width: "32%" }}
          />
        </div>
        <OpdTable data={filteredData} columns={columns} />
      </section>
    </main>
  );
};

export default NewPatients;
