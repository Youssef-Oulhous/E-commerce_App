import React from 'react'

interface TableProps {
  children: React.ReactNode
  className?: string
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
)

export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => (
  <thead className={`[&_tr]:border-b ${className}`}>
    {children}
  </thead>
)

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
)

export const TableFooter: React.FC<TableProps> = ({ children, className = '' }) => (
  <tfoot className={`border-t bg-gray-50/50 font-medium [&>tr]:last:border-b-0 ${className}`}>
    {children}
  </tfoot>
)

export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => (
  <tr className={`border-b border-gray-200 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 ${className}`}>
    {children}
  </tr>
)

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
)

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className = '', ...props }) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props} // Spread the rest of the props, which will include `colSpan`
  >
    {children}
  </td>
);

export const TableCaption: React.FC<TableProps> = ({ children, className = '' }) => (
  <caption className={`mt-4 text-sm text-gray-500 ${className}`}>
    {children}
  </caption>
)