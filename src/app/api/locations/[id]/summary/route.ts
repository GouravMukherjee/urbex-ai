import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import pool from "@/lib/db";

const client = new Anthropic();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const row = result.rows[0];
    const locationContext = [
      row.name && `Name: ${row.name}`,
      row.category && `Category: ${row.category}`,
      row.description && `Description: ${row.description}`,
      row.region && `Region: ${row.region}`,
      row.lat && row.lng && `Coordinates: ${row.lat}, ${row.lng}`,
      row.author && `Documented by: ${row.author}`,
      row.difficulty != null && `Difficulty rating: ${row.difficulty}/5`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an expert urban exploration historian and guide. Given the following location data, write a compelling 2-3 paragraph summary that covers:
- The history and significance of this place
- What makes it interesting for urban exploration
- Any safety or access considerations

Be vivid but factual. If details are sparse, focus on what's known and what the category/region suggest. Do NOT use markdown headings or bullet points — write flowing prose.

${locationContext}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const summary = textBlock ? textBlock.text : "";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
