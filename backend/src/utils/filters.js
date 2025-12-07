export function buildWhere(filters = {}) {
  const where = {};

  if (!filters) return where;

  if (filters.customerRegion?.length) {
    where.customer = { customerRegion: { in: filters.customerRegion } };
  }

  if (filters.gender?.length) {
    where.customer = { ...where.customer, gender: { in: filters.gender } };
  }

  if (filters.productCategory?.length) {
    where.product = { productCategory: { in: filters.productCategory } };
  }

  if (filters.paymentMethod?.length) {
    where.paymentMethod = { in: filters.paymentMethod };
  }

  if (filters.tags?.length) {
    where.product = { ...where.product, tags: { contains: filters.tags[0]} };
  }
  

  if (filters.ageMin || filters.ageMax) {
  let ageFrom = Number(filters.ageMin);
  let ageTo = Number(filters.ageMax);
  // if (!filters.ageMin && filters.ageMax) ageFrom = ageTo;
  // if (!filters.ageMax && filters.ageMin) ageTo = ageFrom;
  console.log(ageFrom, ageTo)
  if (!isNaN(ageFrom) || !isNaN(ageTo)) {
    where.customer = {
      ...where.customer,
      age: {
        ...(ageFrom ? { gte: ageFrom } : {}),
        ...(ageTo ? { lte: ageTo } : {}),
      },
    };
  }
}

if (filters.dateFrom || filters.dateTo) {
  let dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
  let dateTo = filters.dateTo ? new Date(filters.dateTo) : null;

  // if (!filters.dateFrom && filters.dateTo) dateFrom = dateTo;
  // if (!filters.dateTo && filters.dateFrom) dateTo = dateFrom;

  if ((dateFrom && !isNaN(dateFrom)) || (dateTo && !isNaN(dateTo))) {
    where.date = {
      ...(dateFrom ? { gte: dateFrom } : {}),
      ...(dateTo ? { lte: dateTo } : {}),
    };
  }
}

return where;
}