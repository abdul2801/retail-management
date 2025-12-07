import { prisma } from "../utils/db.js";

export async function getSalesFilters() {
  const [
    customerRegion,
    gender,
    productCategory,
    paymentMethod,
    ageMin,
    ageMax,
    dateMin,
    dateMax
  ] = await Promise.all([
    prisma.customer.findMany({
      distinct: ["customerRegion"],
      select: { customerRegion: true },
    }),

    prisma.customer.findMany({
      distinct: ["gender"],
      select: { gender: true },
    }),

    prisma.product.findMany({
      distinct: ["productCategory"],
      select: { productCategory: true },
    }),

    prisma.sale.findMany({
      distinct: ["paymentMethod"],
      select: { paymentMethod: true },
    }),

    prisma.customer.aggregate({ _min: { age: true } }),
    prisma.customer.aggregate({ _max: { age: true } }),

    prisma.sale.aggregate({ _min: { date: true } }),
    prisma.sale.aggregate({ _max: { date: true } }),
  ]);

  return {
    customerRegion: customerRegion.map(r => r.customerRegion).filter(Boolean),
    gender: gender.map(g => g.gender).filter(Boolean),
    productCategory: productCategory.map(p => p.productCategory).filter(Boolean),
    paymentMethod: paymentMethod.map(p => p.paymentMethod).filter(Boolean),
    ageRange: {
      min: ageMin._min.age ?? null,
      max: ageMax._max.age ?? null,
    },
    dateRange: {
      start: dateMin._min.date ?? null,
      end: dateMax._max.date ?? null,
    }
  };
}
