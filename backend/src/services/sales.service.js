import { prisma } from "../utils/db.js";
import { buildWhere } from "../utils/filters.js";

export async function getSales({
  search = "",
  filters = {},
  sortBy = "date_desc",
  _page = 1,
  _limit = 10,
} = {}) {

  const where = buildWhere(filters);
  // parse as int
  let page = parseInt(_page);
  let limit = parseInt(_limit);  

  console.log(search)
if (search && search.trim() !== "") {
  const s = search.toLowerCase();

  where.OR = [
    { customer: { customerName: { contains: s } } },
    { customer: { phoneNumber: { contains: s } } },
    { product: { productName: { contains: s } } },
    { product: { tags: { contains: s } } },
    { employee: { employeeName: { contains: s } } },
    { store: { storeLocation: { contains: s } } },
  ];
}

  const orderBy = {
    date_asc: { date: "asc" },
    date_desc: { date: "desc" },
    quantity: { quantity: "desc" },
    customer_name: { customer: { customerName: "asc" } },
    amount: { finalAmount: "desc" },
  }[sortBy] || { date: "desc" };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.sale.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: { customer: true, product: true, store: true, employee: true },
    }),
    prisma.sale.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
