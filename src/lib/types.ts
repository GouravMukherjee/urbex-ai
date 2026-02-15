// ---------------------------------------------------------------------------
// Urbex.ai — Domain Types
// ---------------------------------------------------------------------------

export type LocationType = "abandoned" | "closed" | "industrial";
export type LocationStatus = "verified" | "unverified" | "unknown";
export type Difficulty = "easy" | "moderate" | "hard";

export interface EvidenceSource {
  title: string;
  type: string; // e.g. "news article", "satellite imagery", "government record"
  year: number;
}

export interface CommunityNote {
  username: string;
  message: string;
  timestamp: string; // ISO date
}

export interface UrbexLocation {
  id: string;
  name: string;
  type: LocationType;
  status: LocationStatus;
  difficulty: Difficulty;
  description: string;
  latitude: number;
  longitude: number;
  confidence: number; // 0-100
  lastUpdated: string; // ISO date
  tags: string[];
  heroImage: string;
  thumbnailImage: string;
  evidence: EvidenceSource[];
  communityNotes: CommunityNote[];
}

export interface LocationFilters {
  search?: string;
  types?: LocationType[];
  statuses?: LocationStatus[];
  difficulties?: Difficulty[];
  region?: string;
}

export type FeedbackType =
  | "correction"
  | "new-evidence"
  | "safety-concern"
  | "general";

export interface FeedbackPayload {
  locationId: string;
  type: FeedbackType;
  message: string;
  photo?: File | null;
}
