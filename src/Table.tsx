// Import required utilities and hooks from react-table
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

// Import types from react-table
import type { ColumnDef } from "@tanstack/react-table";

// Import useState hook from React for maintaining local state
import { useState } from "react";

// Import the DebouncedInput component
import { DebouncedInput } from "./DebounceInput.tsx";

// Define the props for the Table component
interface ReactTableProps<T extends object> {
  data: T[]; // data to be displayed in the table
  columns: ColumnDef<T>[]; // column definitions for the table
  filterFn?: FilterFn<T>; // optional function to filter the data
}

// Define the Table component
export const Table = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  // Set up state for global filter and sorting
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Initialize the react-table with data, columns, and handlers for sorting and global filter
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  // Render the table
  return (
    <>
      {/* Render the global filter input field */}
      <div className="flex justify-end m-4">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          type="text"
          placeholder="Search all columns..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Render the actual table */}
      <table className="table table-zebra w-full">
        <thead>
          {/* Render table headers */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="flex justify-between">
                        <p>
                          {/* Render column header */}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </p>
                        <p>
                          {/* Render sorting icons if column is sorted */}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </p>
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* Render table rows */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {/* Render cells for each row */}
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render pagination controls */}
      <div className="flex justify-center">
        <div className="btn-group m-4">
          <button
            className="btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button
            className="btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </button>
          <button className="btn">
            {/* Render the current page and total page count */}
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </button>
          <button
            className="btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </button>
          <button
            className="btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};
