import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

export interface DataType {
  key: number;
  sn: number;
  uhid: string;
  patient: string;
  age: string;
  time: string;
  department: string;
  doctor: string;
  queue: number;
  record: number | string;
  tags: string[];
  action: string;
}

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

interface OpdTableProps {
  data: DataType[];
  columns: ColumnsType<DataType>;
  pagination: any;
}

const OpdTable: React.FC<OpdTableProps> = ({ data, columns, pagination }) => {
  const { styles } = useStyle();
  return (
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
      pagination={pagination}
    />
  );
};

export default OpdTable;
