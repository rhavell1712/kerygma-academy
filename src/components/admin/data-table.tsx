import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getKey: (row: T) => string;
  minWidth?: string;
};

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

export function DataTable<T>({
  columns,
  rows,
  getKey,
  minWidth = "min-w-[760px]",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidth} text-sm`}>
        <thead>
          <tr className="border-b border-line text-[11px] uppercase tracking-wider text-ink-faint">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-5 py-3 font-bold ${alignClass[column.align ?? "left"]} ${
                  column.className ?? ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr
              key={getKey(row)}
              className="transition-colors hover:bg-white/[0.02]"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-5 py-3.5 align-middle ${alignClass[column.align ?? "left"]} ${
                    column.className ?? ""
                  }`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
