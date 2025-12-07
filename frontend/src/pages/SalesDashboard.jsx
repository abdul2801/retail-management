import React, { useEffect, useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// Components
import SalesSidebar from "../components/dashboard/SalesSidebar";
import FilterBar from "../components/dashboard/FilterBar";
import SalesTable from "../components/dashboard/SalesTable";
import StatCard from "../components/ui/StatCard";

// Hooks & Services
import { useDebounce } from "../hooks/useDebounce";
import { formatCurrency } from "../utils/helpers";
import {
  fetchFiltersMeta,
  fetchSalesData,
  fetchSalesSummary,
  buildSalesQueryString,
} from "../services/salesService";

export default function SalesDashboard() {
  // --- STATE ---
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, setSortBy] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [openSort, setOpenSort] = useState(false);

  // Filters
  const [filtersMeta, setFiltersMeta] = useState(null);
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    productCategory: [],
    paymentMethod: [],
    ageRange: null,
    dateRange: null,
    tags: []
  });

  // Data
  const [salesData, setSalesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [summary, setSummary] = useState(null);

  // Loading
  const [loadingSales, setLoadingSales] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);

  // --- INITIAL LOAD ---
  useEffect(() => {
    async function loadFilters() {
      try {
        setLoadingFilters(true);
        const data = await fetchFiltersMeta();
        setFiltersMeta(data);
      } catch (e) {
        console.error("Failed to load filter metadata", e);
      } finally {
        setLoadingFilters(false);
      }
    }
    loadFilters();
  }, []);

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!filtersMeta) return;

    async function loadData() {
      const qs = buildSalesQueryString({
        search: debouncedSearch,
        sortBy,
        page,
        filters,
      });

      // Load Sales
      setLoadingSales(true);
      fetchSalesData(qs)
        .then((json) => {
          setSalesData(json.data || []);
          setTotalPages(json.totalPages || 1);
          setTotalRecords(json.total || json.totalRecords || 0);
        })
        .catch(() => setSalesData([]))
        .finally(() => setLoadingSales(false));

      // Load Summary
      setLoadingSummary(true);
      fetchSalesSummary(qs)
        .then(setSummary)
        .catch(() => setSummary(null))
        .finally(() => setLoadingSummary(false));
    }

    loadData();
  }, [debouncedSearch, sortBy, page, filters, filtersMeta]);

  // --- HANDLERS ---
  const resetAllFilters = () => {
    setFilters({
      customerRegion: [],
      gender: [],
      productCategory: [],
      paymentMethod: [],
      ageRange: null,
      dateRange: null,
      tags: []
    });
    setSortBy("date_desc");
    setPage(1);
    setSearch("");
  };

  const isNoResults = !loadingSales && salesData.length === 0;

  return (
    <div className="w-full min-h-screen bg-white font-['IBM_Plex_Sans'] flex flex-col items-center min-w-0">
      <div className="relative w-full max-w-[1456px] bg-white shadow-xl min-h-screen flex flex-col">
        <div className="flex flex-1 relative flex-col md:flex-row">
          
          <SalesSidebar />

          <div className="flex-1 flex flex-col bg-white">
            {/* --- TOP HEADER --- */}
            <div className="h-[44px] flex items-center justify-between px-4 border-b border-[#F3F3F3]">
              <h1 className="text-[12px] font-medium text-black">
                Sales Management System
              </h1>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-full md:w-[400px] h-[32px] bg-[#F3F3F3] border border-[#D3D4DD] rounded flex items-center px-3 gap-2">
                  <Search size={16} className="text-[#3A3A47]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setPage(1);
                      setSearch(e.target.value);
                    }}
                    placeholder="Search by name, phone, product, region..."
                    className="bg-transparent border-none outline-none text-sm text-[#7A7B8E] w-full"
                  />
                </div>
              </div>
            </div>

            {/* --- FILTER BAR --- */}
            <div className="flex justify-between items-center pr-4">
              <FilterBar 
                filtersMeta={filtersMeta}
                filters={filters}
                setFilters={setFilters}
                loadingFilters={loadingFilters}
                onReset={resetAllFilters}
              />
              
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F3F3F3] border border-[#D3D4DD] rounded text-sm text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => setOpenSort(!openSort)}
                >
                  Sort by <ChevronDown size={14} className="opacity-60" />
                </button>
                {openSort && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md border rounded p-2 z-50 min-w-[180px]">
                     {[
                       { label: "Newest First", value: "date_desc" },
                       { label: "Oldest First", value: "date_asc" },
                       { label: "Quantity High → Low", value: "quantity" },
                     ].map(opt => (
                        <div 
                          key={opt.value} 
                          className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => { setSortBy(opt.value); setOpenSort(false); }}
                        >
                          {opt.label}
                        </div>
                     ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- STAT CARDS --- */}
            <div className="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:flex gap-4">
              <StatCard
                title="Total units sold"
                value={summary?.totalUnitsSold?.toLocaleString("en-IN")}
                loading={loadingSummary}
              />
              <StatCard
                title="Total Revenue"
                value={formatCurrency(summary?.totalRevenue)}
                loading={loadingSummary}
              />
              <StatCard
                title="Total Discount"
                value={formatCurrency(summary?.totalDiscount)}
                loading={loadingSummary}
              />
              <StatCard
                title="Total Records"
                value={totalRecords.toLocaleString("en-IN")}
                loading={loadingSummary}
              />
            </div>

            {/* --- TABLE --- */}
            <SalesTable 
                data={salesData} 
                loading={loadingSales} 
                isNoResults={isNoResults} 
            />

            {/* --- PAGINATION --- */}
            <div className="h-[55px] border-t border-[#E5E7EB] bg-white flex items-center justify-center">
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <ChevronLeft size={14} />
                </button>
                 <span className="text-sm">Page {page} of {totalPages}</span>
                <button
                  className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
