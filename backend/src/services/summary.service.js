import { prisma } from "../utils/db.js";
import { buildWhere } from "../utils/filters.js";

export async function getSummary({ search = "", filters = {} } = {}) {
  const where = buildWhere(filters);

  // Apply same search logic as getSales()
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

  const stats = await prisma.sale.aggregate({
    where,
    _sum: {
      quantity: true,
      finalAmount: true,
      discountPercentage: true,
    },
    _count: { _all: true },
  });

  return {
    totalRecords: stats._count._all,
    totalUnitsSold: stats._sum.quantity ?? 0,
    totalRevenue: stats._sum.finalAmount ?? 0,
    totalDiscount: stats._sum.discountPercentage ?? 0,
  };
}
