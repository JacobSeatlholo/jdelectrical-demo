import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface EstimatePayload {
  service: string;
  jobType: string;
  description: string;
  urgency: string;
  property?: string;
}

const SYSTEM_PROMPT = `You are the senior estimating assistant for JD Electrical, a master-electrician-led electrical contractor based in Brackendowns, Alberton, Gauteng, South Africa (Reg IT9819/07, Dept of Labour GS01479). They handle domestic, commercial, industrial and mining electrical work: house wiring, gate/garage automation, electric fencing, intercoms, pool & borehole pumps, generators, solar, factory installations, filling stations, commercial pumps and tanks, and Certificates of Compliance (CoC).

Rules:
- Quote ranges in South African Rand (ZAR) reflecting realistic 2025/2026 Gauteng rates including labour and standard materials.
- Be practical and honest: give a plausible low-high range for the described job. Small domestic jobs Z500-Z25000; larger installs higher. If the description is too vague, widen the range and say what would narrow it.
- Never invent JD Electrical staff names other than Jan Cilliers (owner, master electrician). Never promise exact prices - always "indicative estimate".
- Answer ONLY with valid JSON matching this schema (no markdown fences, no commentary):
{"jobSummary": string (1-2 sentences describing the job as JD would understand it),
 "scope": string[] (3-6 concrete tasks/line items JD would perform),
 "priceLow": number (ZAR),
 "priceHigh": number (ZAR),
 "assumptions": string[] (1-3 short assumptions e.g. materials included, access hours),
 "urgencyNote": string (1 sentence, references their stated urgency),
 "safetyFlags": string[] (0-3 short compliance/safety notes e.g. "CoC required on completion", "SANS 10142-1 applies"),
 "nextStep": string (1 sentence call-to-action referencing Jan or the JD team)}`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EstimatePayload;
    const { service, jobType, description, urgency, property } = body;

    if (!service || !description || String(description).trim().length < 8) {
      return NextResponse.json(
        { error: "Please describe the job in a little more detail." },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const userMsg = `Estimate this job for JD Electrical (Alberton, Gauteng):
Service category: ${service}
Job type: ${jobType || "general"}
Property: ${property || "not specified"}
Urgency: ${urgency || "normal"}
Customer description: ${String(description).slice(0, 1200)}`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        { role: "user", content: userMsg },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content || "";
    let parsed;
    try {
      const cleaned = raw
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      parsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      return NextResponse.json(
        {
          estimate: {
            jobSummary:
              "Estimate engine could not parse this job. Please call Jan on +27 83 602 3171 for a direct assessment.",
            scope: ["Telephonic assessment", "Site visit if required"],
            priceLow: 0,
            priceHigh: 0,
            assumptions: ["Fallback estimate"],
            urgencyNote: "A direct call will be fastest.",
            safetyFlags: [],
            nextStep:
              "Call +27 83 602 3171 or send a WhatsApp and Jan will assist personally.",
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ estimate: parsed });
  } catch (err) {
    console.error("Estimate failed:", err);
    return NextResponse.json(
      {
        error:
          "Estimate service is busy right now. Please WhatsApp +27 83 602 3171 and JD will get back to you fast.",
      },
      { status: 500 }
    );
  }
}
