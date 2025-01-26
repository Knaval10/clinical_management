import React, { useEffect, useState } from "react";
import OpdTable, { DataType } from "../../components/Table/OpdTable";
import { Input, Select, TableColumnsType, Tag } from "antd";
import OpdCard from "../../components/Card/OpdCard";
import StatCard from "../../components/Card/StatCard";
import { tableData } from "../../constants/tableData";
import Date from "../../components/Date";
import { formatDate } from "../../utils/helperFunction";
import viewIcon from "../../assets/EyeIcon.svg";
import stethIcon from "../../assets/stethoscope.svg";
import filterIcon from "../../assets/bars-filter.svg";
import hideIcon from "../../assets/hide.png";
import excelIcon from "../../assets/excel.jpeg";

import {
  AlertOutlined,
  ClockCircleOutlined,
  ExceptionOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../utils/downloadExcel";

const uniqueDoctors = new Set(tableData.map((item) => item.doctor));
const uniqueDoctorsArray = Array.from(uniqueDoctors);
const selectedDoctors = uniqueDoctorsArray.slice(0, 10);

const modifiedTableData = tableData.map((item) => {
  const randomIndex = Math.floor(Math.random() * selectedDoctors.length);
  return {
    ...item,
    doctor: selectedDoctors[randomIndex],
  };
});

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
    title: "Previous rec.",
    dataIndex: "record",
    key: "record",
    align: "center",
    render: () => (
      <>
        <Select
          defaultValue={tableData.map((item) => item.record)}
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: "5+", label: "5+" },
          ]}
        />
      </>
    ),
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

const initialData: DataType[] = modifiedTableData.map<DataType>((item, i) => ({
  key: i,
  sn: item.sn,
  uhid: item.uhid,
  patient: item.patient,
  age: `${item.age}/${item.gender}`,
  time: formatDate(item.time),
  department: item.department,
  doctor: item.doctor,
  queue: item.queue,
  record: item.record,
  tags: i % 2 === 0 ? ["follow up"] : i % 3 === 0 ? ["new"] : ["free"],
  action: "Eye",
}));

const NewPatients: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataType[]>(initialData);

  const doctorOptions = [
    ...new Set(modifiedTableData.map((item) => item.doctor)),
  ].map((item) => ({
    value: item,
    label: item,
  }));
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleDoctorFilter = (value: string) => {
    setSelectedDoctor(value);
    // const filtered = initialData.filter((item) => item.doctor === value);
    // setFilteredData(filtered);
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

  const filterData = () => {
    let filtered = [...initialData];

    // Apply date filter if both start and end date are set
    if (startDate && endDate) {
      filtered = filterByDateRange(filtered, startDate, endDate);
    }

    // Apply doctor filter
    if (selectedDoctor) {
      filtered = filtered.filter((item) => item.doctor === selectedDoctor);
    }

    // Apply search text filter
    if (searchText) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(searchText)
        )
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [startDate, endDate, selectedDoctor, searchText]);

  // Date input handlers
  const handleStartDateChange = (value: any) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(value);
  };
  const handleExport = () => {
    exportToExcel(filteredData, "New Patients Data");
  };
  const [rowsPerPage, setRowsPerPage] = useState(
    filteredData?.length >= 10 ? 10 : filterData.length
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handleRowsChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    setRowsPerPage(value > 0 ? value : 10);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main className="p-5  flex flex-col">
      <section className="flex flex-col gap-2">
        <div className="flex gap-2 font-normal text-[14px] text-gray-400">
          <HomeOutlined />
          <RightOutlined />
          <Link to="">Clinical Mangagement</Link>
          <RightOutlined />
          <Link to="">OPD</Link>
          <RightOutlined />
          <Link to="">New Patients</Link>
        </div>
        <div className="flex flex-col gap-3 md:flex-row justify-between pb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <img src={stethIcon} alt="" className="w-full h-full" />
            </div>
            <h2 className="font-bold text-xl">OPD Department</h2>
            <button className="flex gap-2 py-0.5 px-3 border-[0.5px] border-gray-200 rounded-sm shadow-xl cursor-pointer">
              <img src={filterIcon} alt="" className="w-5" />
              <p>Filter</p>
            </button>
            <button className="py-0.5 px-1.5 shadow-xl border-[0.5px] border-gray-200 rounded-sm cursor-pointer">
              <ReloadOutlined />
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 py-0.5 px-3 border-[0.5px] border-gray-200 rounded-sm shadow-xl">
              <img src={hideIcon} alt="" className="w-5" />
              <p>Hide filter</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 py-0.5 px-3 border-[0.5px] border-gray-200 rounded-sm shadow-xl cursor-pointer"
            >
              <img src={excelIcon} alt="" className="w-5" />
              <p>Download Excel</p>
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="text-gray-400">Filter:</h3>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <p>Period</p>
            <div className="flex gap-2">
              <Date
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="From Date"
              />
              <Date
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="To Date"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Filter Via Doctor</p>
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
          count={20}
          aboutIcon={false}
          queue={false}
          icon={<UserOutlined />}
          queueCount={""}
        />
        <OpdCard
          title="Average Wait Time"
          count={30}
          aboutIcon={<ExclamationCircleOutlined />}
          queue={false}
          icon={<ClockCircleOutlined />}
          queueCount={""}
        />
        <OpdCard
          title="Patients in Queue"
          count={25}
          aboutIcon={false}
          queue={true}
          icon={<UserAddOutlined />}
          queueCount={"11 - 12"}
        />
        <OpdCard
          title="Cancellations"
          count={10}
          aboutIcon={false}
          queue={false}
          icon={<ExceptionOutlined />}
          queueCount={""}
        />
        <OpdCard
          title="Urgent Cases"
          count={10}
          aboutIcon={false}
          queue={true}
          icon={<AlertOutlined />}
          queueCount={"4 - 14"}
        />
      </section>
      <section className="py-5 flex flex-wrap gap-2 ">
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
        <StatCard title={"Nurse"} count={0} />
      </section>
      <section className="flex flex-col gap-5">
        <div className="flex justify-between">
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
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm">Show</p>
            <input
              type="number"
              value={rowsPerPage}
              onChange={handleRowsChange}
              className="border-[0.5px] rounded-lg border-gray-300 p-1 w-14 text-center"
            />
          </div>
        </div>
        <div className="relative">
          <OpdTable
            data={filteredData}
            columns={columns}
            pagination={{
              pageSize: rowsPerPage,
              showSizeChanger: false,
              current: currentPage,
              onChange: handlePageChange,
              total: filteredData.length,
            }}
          />
          <div className="absolute bottom-5 text-gray-400 hidden sm:block">
            {filteredData.length > 0
              ? `Showing ${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(
                  currentPage * rowsPerPage,
                  filteredData.length
                )} of ${filteredData.length} entries`
              : "Showing 0 of 0 entries"}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewPatients;
