import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const DIFFICULTY_MAP: Record<number, string> = {
  1: "easy",
  2: "easy",
  3: "moderate",
  4: "hard",
  5: "hard",
};

function mapRow(row: Record<string, unknown>) {
  const difficulty = typeof row.difficulty === "number" ? row.difficulty : 3;
  return {
    id: row.id as string,
    name: row.name as string,
    type: (row.category as string) || "abandoned",
    status: "unverified" as const,
    difficulty: (DIFFICULTY_MAP[difficulty] || "moderate") as "easy" | "moderate" | "hard",
    description: (row.description as string) || "",
    latitude: Number(row.lat) || 0,
    longitude: Number(row.lng) || 0,
    confidence: 50,
    lastUpdated: row.date_added
      ? new Date(row.date_added as string).toISOString()
      : new Date().toISOString(),
    tags: [row.category as string].filter(Boolean),
    heroImage: "",
    thumbnailImage: "",
    evidence: [],
    communityNotes: [],
    author: (row.author as string) || "",
    favorite: (row.favorite as boolean) || false,
    region: (row.region as string) || "",
  };
}

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

    const location = mapRow(result.rows[0]);
    return NextResponse.json(location);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
