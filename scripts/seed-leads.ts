import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SAMPLE_LEADS = [
  {
    name: "Sam, Alrode Workshop",
    phone: "0831230001",
    service: "Industrial & Mining — Generator installation",
    message: "Sample lead: 100kVA generator with auto changeover for a workshop in Alrode.",
    source: "demo",
    status: "quoted",
    estimate: JSON.stringify({
      jobSummary: "100kVA generator with automatic changeover panel, Alrode workshop.",
      scope: ["Supply & install 100kVA gen", "Auto changeover", "CoC on completion"],
      priceLow: 145000,
      priceHigh: 210000,
    }),
    hoursAgo: 26,
  },
  {
    name: "Naledi (Brackenhurst)",
    phone: "0831230002",
    service: "Domestic — Gate automation",
    message: "Sample lead: sliding gate motor + intercom, Brackenhurst home.",
    source: "demo",
    status: "contacted",
    estimate: JSON.stringify({
      jobSummary: "Sliding gate motor and intercom installation, residential.",
      scope: ["Supply gate motor", "Intercom pairing", "CoC"],
      priceLow: 8500,
      priceHigh: 14500,
    }),
    hoursAgo: 5,
  },
  {
    name: "Petrus, Vereeniging Filling Station",
    phone: "0831230003",
    service: "Industrial & Mining — Pumps & tanks",
    message: "Sample lead: forecourt pump panel fault + urgent CoC re-issue.",
    source: "demo",
    status: "new",
    estimate: JSON.stringify({
      jobSummary: "Forecourt pump control panel repair and CoC re-issue.",
      scope: ["Fault find panel", "Replace contactors", "Re-issue CoC"],
      priceLow: 6500,
      priceHigh: 12000,
    }),
    hoursAgo: 1,
  },
];

async function main() {
  const count = await prisma.lead.count();
  if (count > 0) {
    console.log(`Leads table already has ${count} rows — skipping seed.`);
    return;
  }
  for (const l of SAMPLE_LEADS) {
    const { hoursAgo, ...data } = l;
    await prisma.lead.create({
      data: {
        ...data,
        createdAt: new Date(Date.now() - hoursAgo * 3600 * 1000),
      },
    });
  }
  console.log(`Seeded ${SAMPLE_LEADS.length} sample leads.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
