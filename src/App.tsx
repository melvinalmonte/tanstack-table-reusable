import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Table } from "./Table.tsx";
import data from "./data/generated.json";

type Item = {
  guid: string;
  age: number;
  name: string;
  gender: string;
  email: string;
};

function App() {
  // Defining table columns
  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Gender",
        cell: (row) => row.renderValue(),
        accessorKey: "gender",
      },
      {
        header: "Age",
        cell: (row) => row.renderValue(),
        accessorKey: "age",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
    ],
    []
  );

  return (
    <div className="container mx-auto">
      <div className="navbar">
        <h1 className="normal-case text-xl">Reusable Tanstack Table example</h1>
      </div>
      <h2 className="text-2xl p-2">Rendering {data.length} items</h2>
      <Table data={data} columns={cols} />
    </div>
  );
}
export default App;
