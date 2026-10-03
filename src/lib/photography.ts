import maisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import villaAzur from "@/assets/pf-02-villa-azur.jpg";
import serviceBranding from "@/assets/svc-branding.jpg";
import serviceMaps from "@/assets/svc-maps.jpg";
import serviceSeo from "@/assets/svc-seo.jpg";
import serviceSocial from "@/assets/svc-social.jpg";
import serviceMaintenance from "@/assets/svc-maintenance.jpg";
import serviceAi from "@/assets/svc-ai.jpg";

/**
 * Service photography / screenshots.
 * The primary catalogue uses local, stable assets so the visual language stays
 * consistent and the page does not depend on third-party screenshot services.
 */
export const XR_PHOTOS = {
  websites: maisonLumiere,
  branding: serviceBranding,
  seo: serviceSeo,
  maps: serviceMaps,
  social: serviceSocial,
  maintenance: serviceMaintenance,
  robotics: "https://www.korbenforpeople.com/wp-content/uploads/2025/08/DELIVERY-BOTS-2-VUE-01-scaled.png",
  refonte: villaAzur,
  ads: serviceSeo,
  strategy: maisonLumiere,
  ai: serviceAi,
} as const;

export const XR_HERO_PHOTO = villaAzur;
export const XR_JOURNEY_PHOTO = maisonLumiere;
