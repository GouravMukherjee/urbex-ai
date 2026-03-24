import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const DIFFICULTY_MAP: Record<number, string> = {
  1: "easy",
  2: "easy",
  3: "moderate",
  4: "hard",
  5: "hard",
};

function streetViewUrl(lat: number, lng: number, width: number, height: number) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key || !lat || !lng) return "";
  return `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${lat},${lng}&fov=90&pitch=10&key=${key}`;
}

function mapRow(row: Record<string, unknown>) {
  const difficulty = typeof row.difficulty === "number" ? row.difficulty : 3;
  const lat = Number(row.lat) || 0;
  const lng = Number(row.lng) || 0;
  return {
    id: row.id as string,
    name: row.name as string,
    type: (row.category as string) || "abandoned",
    status: "unverified" as const,
    difficulty: (DIFFICULTY_MAP[difficulty] || "moderate") as "easy" | "moderate" | "hard",
    description: (row.description as string) || "",
    latitude: lat,
    longitude: lng,
    confidence: 50,
    lastUpdated: row.date_added
      ? new Date(row.date_added as string).toISOString()
      : new Date().toISOString(),
    tags: [row.category as string].filter(Boolean),
    heroImage: streetViewUrl(lat, lng, 1280, 720),
    thumbnailImage: streetViewUrl(lat, lng, 400, 300),
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
