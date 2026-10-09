import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `You are the AI Tool Idea Generator by Business Hustle - a South African company that builds local business directories and open-source AI automation for South African trade firms (electricians, plumbers, builders, mechanics, etc.). Business Hustle's focus is practical work that brings in nearby jobs.

A trade business owner gives one sentence about their business. Generate exactly 3 practical automation opportunities they could realistically deploy THIS QUARTER (90 days), suited to a small South African trade firm (low budget, WhatsApp-first, mobile-first).

Rules:
- Be concrete and South African: reference WhatsApp, loadshedding schedules, local directories, Google Business Profile, missed-call handling, quote follow-ups, CoC paperwork, etc. where relevant.
- Each idea must state what the automation DOES, the PAIN it removes, and the EXPECTED IMPACT (e.g. "recovers ~30% of missed calls").
- Avoid hype. Practical beats fancy.
- Answer ONLY with valid JSON (no markdown fences, no commentary):
{"ideas":[{"title":string,"pain":string,"how":string (2-3 sentences, concrete steps/tools),"impact":string,"effort":"Low"|"Medium"|"High","quarterReady":string (1 short sentence on how to start this week)}]}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const business = String(body?.business || "").trim();

    if (business.length < 8) {
      return NextResponse.json(
        {
          error:
            "Give us one sentence about the business (at least a few words).",
        },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Business: ${business.slice(0, 400)}`,
        },
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
          error:
            "The generator hit a snag. Try again - or WhatsApp Business Hustle for your three ideas.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ideas: parsed.ideas || [] });
  } catch (err) {
    console.error("Idea generation failed:", err);
    return NextResponse.json(
      { error: "Generator is busy. Please try again in a moment." },
      { status: 500 }
    );
  }
}
