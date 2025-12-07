import React from "react";
import { Info } from "lucide-react";

const StatCard = ({ title, value, loading }) => (
  <div className="flex flex-col p-4 bg-white border border-[#CFDBE8] rounded-lg min-w-[200px] flex-1">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm text-[#0D141C] font-['IBM_Plex_Sans']">
        {title}
      </span>
      <Info size={14} className="text-gray-400" />
    </div>
    {loading ? (
      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
    ) : (
      <span className="text-xl font-bold font-['IBM_Plex_Sans'] text-[#0D141C]">
        {value ?? "—"}
      </span>
    )}
  </div>
);

export default StatCard;
