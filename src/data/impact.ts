export type Source = { label: string; url: string };

export type ImpactEntry = {
  id: string;
  title: string;
  org: string;
  year: string;
  /** One-line statement of the milestone. */
  claim: string;
  /** Context paragraphs — only facts traceable to the attached sources. */
  detail: string[];
  /** Pradeep's specific contribution. Self-reported; kept distinct from the sourced context. */
  role?: string;
  sources: Source[];
};

/**
 * Every entry must carry at least one public source. Nothing goes in this list
 * on the strength of a CV line alone.
 */
export const impact: ImpactEntry[] = [];
