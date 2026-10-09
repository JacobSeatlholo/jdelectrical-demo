import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, province, service, message, source, estimate } =
      body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        email: email ? String(email).slice(0, 160) : null,
        province: province ? String(province).slice(0, 80) : null,
        service: service ? String(service).slice(0, 120) : null,
        message: message ? String(message).slice(0, 2000) : null,
        source: source ? String(source).slice(0, 40) : "website",
        estimate: estimate ? JSON.stringify(estimate).slice(0, 6000) : null,
      },
    });

    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error("Lead save failed:", err);
    return NextResponse.json(
      { error: "Could not save your request. Please call us instead." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("Lead fetch failed:", err);
    return NextResponse.json({ leads: [] }, { status: 200 });
  }
}
