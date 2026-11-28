import maisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import villaAzur from "@/assets/pf-02-villa-azur.jpg";
import webLuxuryShowcase from "@/assets/web-luxury-showcase.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import svcWebEditorial from "@/assets/svc-web-editorial.jpg";
import svcBrandingEditorial from "@/assets/svc-branding-editorial.jpg";
import svcMapsEditorial from "@/assets/svc-maps-editorial.jpg";
import svcSeoEditorial from "@/assets/svc-seo-editorial.jpg";
import svcSocialEditorial from "@/assets/svc-social-editorial.jpg";
import svcWebcareEditorial from "@/assets/svc-webcare-editorial.jpg";
import serviceBrandingCinematic from "@/assets/svc-branding-cinematic.jpg";
import serviceMapsCinematic from "@/assets/svc-maps-cinematic.jpg";
import serviceSeoCinematic from "@/assets/svc-seo-cinematic.jpg";
import serviceSocialCinematic from "@/assets/svc-social-cinematic.jpg";
import serviceMaintenanceCinematic from "@/assets/svc-maintenance-cinematic.jpg";
import serviceRoboticsCinematic from "@/assets/svc-robotics-cinematic.jpg";
import serviceAi from "@/assets/svc-ai.jpg";
import svciaWorkflows from "@/assets/svc-ia-workflows.jpg";
import sectorAutomotive from "@/assets/sector-automotive.jpg";
import sectorConstruction from "@/assets/sector-construction.jpg";
import sectorEducation from "@/assets/sector-education.jpg";
import sectorEvents from "@/assets/sector-events.jpg";
import sectorHealth from "@/assets/sector-health.jpg";
import sectorHospitality from "@/assets/sector-hospitality.jpg";
import sectorOther from "@/assets/sector-other.jpg";
import sectorRealestate from "@/assets/sector-realestate.jpg";
import sectorRestaurant from "@/assets/sector-restaurant.jpg";

/**
 * Service photography / screenshots.
 * Authentic, cinematic 35mm photography shot with professional DP direction.
 */
export const XR_PHOTOS = {
  websites: svcWebEditorial,
  branding: svcBrandingEditorial,
  seo: svcSeoEditorial,
  maps: svcMapsEditorial,
  social: svcSocialEditorial,
  maintenance: svcWebcareEditorial,
  robotics: serviceRoboticsCinematic,
  crm: svciaWorkflows,
  refonte: villaAzur,
  ads: svcSeoEditorial,
  strategy: maisonLumiere,
  ai: serviceAi,
} as const;

export const XR_HERO_PHOTO = heroCinematic;
export const XR_JOURNEY_PHOTO = heroCinematic;

export const XR_SECTOR_PHOTOS = {
  automotive: sectorAutomotive,
  construction: sectorConstruction,
  education: sectorEducation,
  events: sectorEvents,
  health: sectorHealth,
  hospitality: sectorHospitality,
  other: sectorOther,
  realestate: sectorRealestate,
  restaurant: sectorRestaurant,
} as const;
