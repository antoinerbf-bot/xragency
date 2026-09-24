import { SHOWCASE } from "./content";

export type ShowcaseItem = (typeof SHOWCASE)[number] & { services?: string[] };

/**
 * Compatibility export for older consumers.
 * The public portfolio intentionally contains only verified XR Agency projects.
 */
export const ALL_SHOWCASE: ShowcaseItem[] = SHOWCASE as ShowcaseItem[];
