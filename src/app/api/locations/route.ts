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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search");
    const types = searchParams.get("types");
    const difficulties = searchParams.get("difficulties");
    const region = searchParams.get("region");

    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(`(LOWER(name) LIKE $${paramIndex} OR LOWER(description) LIKE $${paramIndex})`);
      values.push(`%${search.toLowerCase()}%`);
      paramIndex++;
    }

    if (types) {
      const typeList = types.split(",");
      conditions.push(`category = ANY($${paramIndex}::text[])`);
      values.push(typeList);
      paramIndex++;
    }

    if (difficulties) {
      const diffList = difficulties.split(",");
      const diffValues: number[] = [];
      for (const d of diffList) {
        if (d === "easy") diffValues.push(1, 2);
        if (d === "moderate") diffValues.push(3);
        if (d === "hard") diffValues.push(4, 5);
      }
      if (diffValues.length > 0) {
        conditions.push(`difficulty = ANY($${paramIndex}::int[])`);
        values.push(diffValues);
        paramIndex++;
      }
    }

    if (region) {
      conditions.push(`LOWER(region) = LOWER($${paramIndex})`);
      values.push(region);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM locations ${whereClause} ORDER BY date_added DESC NULLS LAST`;

    const result = await pool.query(query, values);
    const locations = result.rows.map(mapRow);

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
