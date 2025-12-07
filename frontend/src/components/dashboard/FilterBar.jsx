import React, { useState, useEffect } from "react";
import { RotateCcw, Check } from "lucide-react";
import FilterPillButton from "../ui/FilterPillButton";
import AgeSlider from "../ui/AgeSlider";
import { FILTER_LABELS } from "../../utils/constants";

export default function FilterBar({
  filtersMeta,
  filters,
  setFilters,
  loadingFilters,
  onReset,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [localAge, setLocalAge] = useState({ min: 0, max: 100 });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setLocalAge({
      min: filters.ageRange?.min ?? 0,
      max: filters.ageRange?.max ?? 100,
    });
  }, [filters.ageRange]);

  const toggleMultiFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const clearFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : null,
    }));
    setOpenFilter(null);
  };

  const handleTagAdd = () => {
     if(!tagInput) return;
     setFilters((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), ...tagInput.split(',').map(t=>t.trim()).filter(Boolean)]
     }));
     setTagInput("");
  }

  return (
    <div className="h-[50px] flex items-center justify-between px-4 gap-2 p-4 border-b border-transparent">
      <div className="flex items-center gap-2 whitespace-nowrap overflow-visible">
        <button
          className="w-8 h-[28px] bg-[#F3F3F3] rounded flex items-center justify-center hover:bg-gray-200 border border-[#D3D4DD]"
          onClick={onReset}
        >
          <RotateCcw size={14} className="text-[#3A3A47]" />
        </button>

        {!loadingFilters && filtersMeta && (
          <>
            {Object.keys(FILTER_LABELS).map((key) => (
              <div key={key} className="relative inline-block">
                <FilterPillButton
                  label={FILTER_LABELS[key]}
                  activeCount={
                    Array.isArray(filters[key])
                      ? filters[key].length
                      : filters[key] ? 1 : 0
                  }
                  onClick={() => setOpenFilter(openFilter === key ? null : key)}
                />

                {/* --- STANDARD MULTI SELECT --- */}
                {openFilter === key &&
                  filtersMeta[key] &&
                  !["ageRange", "dateRange", "tags"].includes(key) && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg border rounded-lg p-2 z-[9999] min-w-[220px] max-h-64 overflow-y-auto">
                      {filtersMeta[key].map((option) => (
                        <div
                          key={option}
                          onClick={() => toggleMultiFilter(key, option)}
                          className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100"
                        >
                          <Check
                            size={14}
                            className={`${
                              filters[key]?.includes(option) ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* --- AGE RANGE --- */}
                {openFilter === key && key === "ageRange" && (
                  <div className="absolute left-0 mt-2 bg-white shadow-lg p-3 border rounded w-[260px] z-[9999]">
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      Age Range
                      {filters.ageRange && (
                        <button onClick={() => clearFilter("ageRange")} className="text-red-500 text-[10px]">
                          Clear
                        </button>
                      )}
                    </div>
                    <AgeSlider
                      value={[localAge.min, localAge.max]}
                      onChange={(vals) => setLocalAge(vals)}
                      onFinalChange={(vals) =>
                        setFilters((prev) => ({
                          ...prev,
                          ageRange: { min: vals[0], max: vals[1] },
                        }))
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>{filters.ageRange?.min ?? 0}</span>
                      <span>{filters.ageRange?.max ?? 100}</span>
                    </div>
                  </div>
                )}

                {/* --- DATE RANGE --- */}
                {openFilter === key && key === "dateRange" && (
                   <div className="absolute left-0 mt-2 bg-white shadow-lg p-3 border rounded  z-[9999]">
                     <div className="flex flex-col gap-2">
                        <input type="date" className="border p-1 rounded" 
                            onChange={(e) => setFilters(prev => ({...prev, dateRange: {...prev.dateRange, start: e.target.value}}))} 
                            value={filters.dateRange?.start || ""}
                        />
                        <input type="date" className="border p-1 rounded" 
                             onChange={(e) => setFilters(prev => ({...prev, dateRange: {...prev.dateRange, end: e.target.value}}))} 
                             value={filters.dateRange?.end || ""}
                        />
                     </div>
                   </div>
                )}

                 {/* --- TAGS --- */}
                {openFilter === key && key === "tags" && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg p-3 border rounded w-[260px] z-[9999]">
                         <input 
                            value={tagInput} 
                            onChange={e => setTagInput(e.target.value)} 
                            onKeyDown={e => e.key === 'Enter' && handleTagAdd()}
                            className="w-full border p-1 rounded text-sm"
                            placeholder="Type and enter..."
                         />
                         <div className="flex flex-wrap gap-1 mt-2">
                             {filters.tags?.map(t => (
                                 <span key={t} className="bg-gray-200 px-2 py-1 rounded text-xs">
                                     {t} <button onClick={() => toggleMultiFilter('tags', t)} className="text-red-500 ml-1">x</button>
                                 </span>
                             ))}
                         </div>
                    </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
