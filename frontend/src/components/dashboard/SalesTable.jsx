import React, { useMemo } from "react";
import { Copy } from "lucide-react";
import { PAGE_SIZE } from "../../utils/constants";
import { formatCurrency, formatDate } from "../../utils/helpers";

export default function SalesTable({ data, loading, isNoResults }) {
  
  const skeletonRows = useMemo(
    () =>
      Array(PAGE_SIZE).fill(0).map((_, i) => (
          <tr key={i} className="border-b border-[#EEE] bg-white animate-pulse">
            {Array(13).fill(0).map((__, j) => (
                <td key={j} className="px-3 py-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </td>
              ))}
          </tr>
        )),
    []
  );

  return (
    <div className="flex-1 px-4 py-2 flex flex-col overflow-hidden">
      <div className="border border-[#F3F3F3] rounded-lg overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto overflow-y-hidden max-w-full">
          <table className="w-full text-sm table-auto whitespace-nowrap max-w-full">
            <thead className="bg-[#F3F3F3] text-[#515162] text-xs">
              <tr className="text-left">
                <th className="px-3 py-2">Transaction ID</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Customer ID</th>
                <th className="px-3 py-2">Customer name</th>
                <th className="px-3 py-2">Phone Number</th>
                <th className="px-3 py-2">Gender</th>
                <th className="px-3 py-2">Age</th>
                <th className="px-3 py-2">Product Category</th>
                <th className="px-3 py-2">Quantity</th>
                <th className="px-3 py-2">Total Amount</th>
                <th className="px-3 py-2">Customer Region</th>
                <th className="px-3 py-2">Product ID</th>
                <th className="px-3 py-2">Employee name</th>
              </tr>
            </thead>
            <tbody className="text-[#1F1F29]">
              {loading ? (
                skeletonRows
              ) : isNoResults ? (
                <tr>
                  <td colSpan={13} className="px-3 py-6 text-center text-sm text-gray-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                data.map((s, i) => (
                  <tr key={i} className="border-b border-[#EEE] hover:bg-gray-50 bg-white">
                    <td className="px-3 py-3">{s.transactionId}</td>
                    <td className="px-3 py-3">{formatDate(s.date)}</td>
                    <td className="px-3 py-3">{s.customer?.customerId}</td>
                    <td className="px-3 py-3">{s.customer?.customerName}</td>
                    <td className="px-3 py-3 flex items-center gap-2">
                      {s.customer?.phoneNumber}
                      <Copy size={12} className="cursor-pointer hover:text-blue-500" />
                    </td>
                    <td className="px-3 py-3">{s.customer?.gender}</td>
                    <td className="px-3 py-3">{s.customer?.age}</td>
                    <td className="px-3 py-3">{s.product?.productCategory}</td>
                    <td className="px-3 py-3">{s.quantity}</td>
                    <td className="px-3 py-3">{formatCurrency(s.finalAmount)}</td>
                    <td className="px-3 py-3">{s.customer?.customerRegion}</td>
                    <td className="px-3 py-3">{s.product?.productId}</td>
                    <td className="px-3 py-3">{s.employee?.employeeName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
