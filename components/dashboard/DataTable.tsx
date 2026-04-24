"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  searchKey: keyof T;
  filterOptions?: {
    label: string;
    key: keyof T;
    options: string[];
  }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({ 
  title, 
  description, 
  data, 
  columns, 
  searchKey,
  filterOptions,
  onEdit,
  onDelete,
  onView 
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- LOGIC: Filtering & Searching ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = String(item[searchKey])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
        if (!value || value === "all") return true;
        return String(item[key as keyof T]) === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, activeFilters, searchKey]);

  // --- LOGIC: Pagination ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-9 border-slate-200">Export CSV</Button>
           <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700">Add New</Button>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Search by ${String(searchKey)}...`}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filterOptions?.map((filter) => (
          <select
            key={String(filter.key)}
            className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            onChange={(e) => setActiveFilters({ ...activeFilters, [String(filter.key)]: e.target.value })}
          >
            <option value="all">All {filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${col.className}`}>
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    {columns.map((col, idx) => (
                      <td key={idx} className={`px-6 py-4 text-sm text-slate-600 ${col.className}`}>
                        {typeof col.accessor === "function" 
                          ? col.accessor(item) 
                          : (item[col.accessor] as React.ReactNode)}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {onView && (
                          <button onClick={() => onView(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item.id as any)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900">{Math.min(filteredData.length, (currentPage - 1) * itemsPerPage + 1)}</span> to <span className="text-slate-900">{Math.min(filteredData.length, currentPage * itemsPerPage)}</span> of <span className="text-slate-900">{filteredData.length}</span> results
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === totalPages || totalPages === 0} 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}