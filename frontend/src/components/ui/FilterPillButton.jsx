import React from "react";
import { ChevronDown } from "lucide-react";

const FilterPillButton = ({ label, activeCount = 0, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded text-gray-600 text-sm border transition-colors ${
      activeCount > 0 ? "bg-gray-300" : "bg-gray-200"
    } hover:bg-gray-300 whitespace-nowrap`}
  >
    <span className="font-['IBM_Plex_Sans']">{label}</span>
    {activeCount > 0 && (
      <span className="text-xs px-2 py-0.5 bg-gray-500 text-white rounded-full">
        {activeCount}
      </span>
    )}
    <ChevronDown size={14} />
  </button>
);

export default FilterPillButton;
