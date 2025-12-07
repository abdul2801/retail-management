import { API_BASE, PAGE_SIZE } from "../utils/constants";

export const fetchFiltersMeta = async () => {
  const res = await fetch(`${API_BASE}/sales/filters`);
  return res.json();
};

export const fetchSalesData = async (queryString) => {
  const res = await fetch(`${API_BASE}/sales?${queryString}`);
  return res.json();
};

export const fetchSalesSummary = async (queryString) => {
  const res = await fetch(`${API_BASE}/sales/summary?${queryString}`);
  return res.json();
};

export const buildSalesQueryString = ({
  search,
  sortBy,
  page,
  filters,
}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);
  params.append("page", String(page));
  params.append("limit", String(PAGE_SIZE));

  ["customerRegion", "gender", "productCategory", "paymentMethod"].forEach(
    (key) => {
      const vals = filters[key];
      if (Array.isArray(vals) && vals.length) {
        vals.forEach((v) => params.append(key, v));
      }
    }
  );

  if (filters.ageRange?.min != null)
    params.append("ageMin", String(filters.ageRange.min));
  if (filters.ageRange?.max != null)
    params.append("ageMax", String(filters.ageRange.max));

  if (filters.dateRange?.start)
    params.append("dateFrom", new Date(filters.dateRange.start).toISOString());
  if (filters.dateRange?.end)
    params.append("dateTo", new Date(filters.dateRange.end).toISOString());
  
  if (filters.tags && filters.tags.length > 0) {
    params.append("tags", filters.tags.join(","));
  }

  return params.toString();
};
