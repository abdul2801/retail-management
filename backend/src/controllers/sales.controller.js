import { getSales } from "../services/sales.service.js";
import { getSummary } from "../services/summary.service.js";
import { getSalesFilters } from "../services/salesFilters.service.js";
function normalizeFilters(filters) {
  return Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : [value],
    ])
  );
}
function validateQuery(query) {
  const ageMinLimit = 0;
  const ageMaxLimit = 120;

  const numericFields = ["page", "limit", "ageMin", "ageMax"];

  for (const field of numericFields) {
    const value = query[field];

    if (value === undefined || value === "") continue;

    if (isNaN(Number(value))) {
      throw new Error(`${field} must be a valid number`);
    }

    const num = Number(value);

    if ((field === "ageMin" || field === "ageMax") && (num < ageMinLimit || num > ageMaxLimit)) {
      throw new Error(`${field} must be between ${ageMinLimit} and ${ageMaxLimit}`);
    }

    if ((field === "page" || field === "limit") && num <= 0) {
      throw new Error(`${field} must be greater than 0`);
    }
  }

  if (query.sortBy && typeof query.sortBy !== "string") {
    throw new Error("sortBy must be a string");
  }

  if (query.search && typeof query.search !== "string") {
    throw new Error("search must be a string");
  }
}


export async function fetchSales(req, res) {
  try {
    validateQuery(req.query);

    const { search, sortBy, page, limit, ...filters } = req.query;

    const result = await getSales({
      search: search || "",
      sortBy: sortBy || "date_desc",
      filters: normalizeFilters(filters),
      _page: Number(page) || 1,
      _limit: Number(limit) || 10,
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function fetchSummary(req, res) {
  try {
    validateQuery(req.query);

    const { search, ...filters } = req.query;

    const result = await getSummary({
      search: search || "",
      filters: normalizeFilters(filters),
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export async function getSalesFiltersController(req, res) {
  try {
    const filters = await getSalesFilters();
    res.json(filters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load filters" });
  }
}
