import maisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import villaAzur from "@/assets/pf-02-villa-azur.jpg";
import webLuxuryShowcase from "@/assets/web-luxury-showcase.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import serviceBrandingCinematic from "@/assets/svc-branding-cinematic.jpg";
import serviceMapsCinematic from "@/assets/svc-maps-cinematic.jpg";
import serviceSeoCinematic from "@/assets/svc-seo-cinematic.jpg";
import serviceSocialCinematic from "@/assets/svc-social-cinematic.jpg";
import serviceMaintenanceCinematic from "@/assets/svc-maintenance-cinematic.jpg";
import serviceRoboticsCinematic from "@/assets/svc-robotics-cinematic.jpg";
import serviceAi from "@/assets/svc-ai.jpg";

/**
 * Service photography / screenshots.
 * Authentic, cinematic 35mm photography shot with professional DP direction.
 */
export const XR_PHOTOS = {
  websites: webLuxuryShowcase,
  branding: serviceBrandingCinematic,
  seo: serviceSeoCinematic,
  maps: serviceMapsCinematic,
  social: serviceSocialCinematic,
  maintenance: serviceMaintenanceCinematic,
  robotics: serviceRoboticsCinematic,
  refonte: villaAzur,
  ads: serviceSeoCinematic,
  strategy: maisonLumiere,
  ai: serviceAi,
} as const;

export const XR_HERO_PHOTO = heroCinematic;
export const XR_JOURNEY_PHOTO = heroCinematic;

