import * as React from "react"

export const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <table className="w-full caption-bottom text-sm border-collapse" {...props} />
)

export const TableHeader = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-100 font-medium" {...props} />
)

export const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
)

export const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b last:border-0 hover:bg-gray-50" {...props} />
)

export const TableHead = (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className="p-2 text-left font-medium" {...props} />
)

export const TableCell = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-2 align-middle" {...props} />
)
