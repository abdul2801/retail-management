import React from "react";
import { Range } from "react-range";

export default function AgeSlider({ value, onChange, onFinalChange }) {
  return (
    <Range
      step={1}
      min={0}
      max={100}
      values={value}
      onChange={(vals) => onChange({ min: vals[0], max: vals[1] })}
      onFinalChange={(vals) => onFinalChange(vals)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="w-full h-1 bg-gray-200 rounded cursor-pointer my-4"
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="w-3 h-3 bg-black rounded-full cursor-grab active:cursor-grabbing"
        />
      )}
    />
  );
}
