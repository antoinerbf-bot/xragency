/**
 * Moteur fiscal et de calcul automatique de TVA selon la localisation du client
 * Conçu pour :
 * 1. Entité actuelle : KARMA SASU (France / UE)
 * 2. Évolutivité future : LLC aux USA ou Limited à Hong Kong
 */

export type TaxIssuerEntity = "FR_SASU" | "US_LLC" | "HK_LTD";

export interface CountryTaxInfo {
  code: string;
  name: string;
  flag: string;
  isEU: boolean;
  standardVatRate: number; // ex: 0.20
}

export const SUPPORTED_COUNTRIES: CountryTaxInfo[] = [
  { code: "FR", name: "France", flag: "🇫🇷", isEU: true, standardVatRate: 0.20 },
  { code: "MC", name: "Monaco", flag: "🇲🇨", isEU: true, standardVatRate: 0.20 },
  { code: "BE", name: "Belgique", flag: "🇧🇪", isEU: true, standardVatRate: 0.21 },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", isEU: true, standardVatRate: 0.17 },
  { code: "CH", name: "Suisse", flag: "🇨🇭", isEU: false, standardVatRate: 0.081 },
  { code: "GB", name: "Royaume-Uni", flag: "🇬🇧", isEU: false, standardVatRate: 0.20 },
  { code: "US", name: "États-Unis", flag: "🇺🇸", isEU: false, standardVatRate: 0.0 },
  { code: "CA", name: "Canada", flag: "🇨🇦", isEU: false, standardVatRate: 0.0 },
  { code: "AE", name: "Émirats Arabes Unis (Dubaï)", flag: "🇦🇪", isEU: false, standardVatRate: 0.05 },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", isEU: false, standardVatRate: 0.0 },
  { code: "SG", name: "Singapour", flag: "🇸🇬", isEU: false, standardVatRate: 0.09 },
  { code: "DE", name: "Allemagne", flag: "🇩🇪", isEU: true, standardVatRate: 0.19 },
  { code: "ES", name: "Espagne", flag: "🇪🇸", isEU: true, standardVatRate: 0.21 },
  { code: "IT", name: "Italie", flag: "🇮🇹", isEU: true, standardVatRate: 0.22 },
  { code: "NL", name: "Pays-Bas", flag: "🇳🇱", isEU: true, standardVatRate: 0.21 },
  { code: "PT", name: "Portugal", flag: "🇵🇹", isEU: true, standardVatRate: 0.23 },
  { code: "MA", name: "Maroc", flag: "🇲🇦", isEU: false, standardVatRate: 0.20 },
  { code: "OTHER_NON_EU", name: "Autre pays (Hors UE / International)", flag: "🌐", isEU: false, standardVatRate: 0.0 },
];

export interface TaxCalculationParams {
  issuerEntity?: TaxIssuerEntity;
  clientCountryCode: string;
  clientType?: "b2b" | "b2c";
  clientVatNumber?: string;
  oneShotHt: number;
  mrrHt: number;
  paymentMode?: "50_50" | "3x";
}

export interface TaxCalculationResult {
  issuerEntity: TaxIssuerEntity;
  issuerLabel: string;
  clientCountryCode: string;
  clientCountryLabel: string;
  clientType: "b2b" | "b2c";
  clientVatNumber?: string;
  
  // Taux & Régime
  taxRate: number; // ex: 0.20
  taxRatePercent: number; // ex: 20
  taxRateLabel: string; // "20,0 %", "0,0 % (Autoliquidation)", "0,0 % (Export hors UE)"
  regimeName: string;
  legalNotice: string;
  isReverseCharge: boolean;
  isTaxExempt: boolean;

  // Calcul One-Shot
  oneShotHt: number;
  oneShotTax: number;
  oneShotTtc: number;

  // Calcul MRR (Abonnements)
  mrrHt: number;
  mrrTax: number;
  mrrTtc: number;

  // Modalités de règlement (sur le montant TTC)
  depositTtc: number; // Acompte 50%
  balanceTtc: number; // Solde 50%
  installment3xTtc: number; // Mensualité 3x sans frais
}

export function detectCountryFromText(text?: string): string {
  if (!text) return "FR";
  const lower = text.toLowerCase();
  if (lower.includes("suisse") || lower.includes("switzerland") || lower.includes("geneve") || lower.includes("zurich") || lower.includes("lausanne") || lower.includes("+41")) return "CH";
  if (lower.includes("belgique") || lower.includes("belgium") || lower.includes("bruxelles") || lower.includes("+32")) return "BE";
  if (lower.includes("luxembourg") || lower.includes("+352")) return "LU";
  if (lower.includes("monaco") || lower.includes("+377")) return "MC";
  if (lower.includes("royaume-uni") || lower.includes("london") || lower.includes("uk") || lower.includes("united kingdom") || lower.includes("+44")) return "GB";
  if (lower.includes("états-unis") || lower.includes("etats-unis") || lower.includes("usa") || lower.includes("united states") || lower.includes("+1")) return "US";
  if (lower.includes("canada") || lower.includes("québec") || lower.includes("montreal")) return "CA";
  if (lower.includes("dubai") || lower.includes("dubaï") || lower.includes("emirats") || lower.includes("uae") || lower.includes("+971")) return "AE";
  if (lower.includes("hong kong") || lower.includes("hong-kong") || lower.includes("+852")) return "HK";
  if (lower.includes("maroc") || lower.includes("casablanca") || lower.includes("rabat") || lower.includes("+212")) return "MA";
  return "FR";
}

export function calculateQuoteTva(params: TaxCalculationParams): TaxCalculationResult {
  const issuerEntity = params.issuerEntity || "FR_SASU";
  const countryCode = params.clientCountryCode || "FR";
  const clientType = params.clientType || "b2b";
  const vatNum = params.clientVatNumber?.trim() || "";

  const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode) || {
    code: countryCode,
    name: "International",
    flag: "🌐",
    isEU: false,
    standardVatRate: 0.0,
  };

  let taxRate = 0.20;
  let taxRateLabel = "20,0 %";
  let regimeName = "TVA standard France";
  let legalNotice = "TVA française applicable au taux standard de 20,0% (Articles 256 et 278 du CGI).";
  let isReverseCharge = false;
  let isTaxExempt = false;

  // 1. ÉMETTEUR ACTUEL : SOCIÉTÉ FRANÇAISE (KARMA SASU)
  if (issuerEntity === "FR_SASU") {
    if (country.code === "FR" || country.code === "MC") {
      // France Métropolitaine & Monaco
      taxRate = 0.20;
      taxRateLabel = "20,0 %";
      regimeName = "TVA standard France";
      legalNotice = "TVA française applicable au taux normal de 20,0% (Art. 256 et 278 du CGI).";
      isReverseCharge = false;
      isTaxExempt = false;
    } else if (country.isEU) {
      // Union Européenne (hors France)
      if (clientType === "b2b") {
        // B2B intra-communautaire -> Autoliquidation
        taxRate = 0.0;
        taxRateLabel = "0,0 % (Autoliquidation)";
        regimeName = "Autoliquidation TVA Intracommunautaire";
        legalNotice = vatNum
          ? `Exonération de TVA, art. 283-2 du CGI / Art. 44 & 196 Directive 2006/112/CE — Autoliquidation par le preneur (Reverse charge). N° TVA Client : ${vatNum}.`
          : "Exonération de TVA, art. 283-2 du CGI / Art. 44 & 196 Directive 2006/112/CE — Autoliquidation par le preneur professionnel établi dans l'UE (Reverse charge).";
        isReverseCharge = true;
        isTaxExempt = true;
      } else {
        // B2C intra-communautaire
        taxRate = 0.20;
        taxRateLabel = "20,0 % (TVA UE)";
        regimeName = "TVA B2C Union Européenne";
        legalNotice = "TVA applicable selon la réglementation des prestations immatérielles B2C dans l'UE.";
        isReverseCharge = false;
        isTaxExempt = false;
      }
    } else {
      // Hors Union Européenne (Suisse, USA, UK, Dubaï, Canada, HK, etc.)
      taxRate = 0.0;
      taxRateLabel = "0,0 % (Export hors UE)";
      regimeName = "Prestation immatérielle hors UE (Export)";
      legalNotice = "TVA non applicable, art. 259-1 du Code Général des Impôts — Prestation de services immatérielle fournie à un preneur établi hors Union Européenne.";
      isReverseCharge = false;
      isTaxExempt = true;
    }
  } 
  // 2. ÉVOLUTIVITÉ FUTURE : LLC AUX ÉTATS-UNIS
  else if (issuerEntity === "US_LLC") {
    taxRate = 0.0;
    taxRateLabel = "0,0 % (US LLC)";
    regimeName = "XR Agency LLC (USA)";
    legalNotice = "Prestation facturée par XR AGENCY LLC (États-Unis). Opération non soumise à la TVA européenne. Exonération US Sales Tax pour prestations de services à l'export.";
    isReverseCharge = false;
    isTaxExempt = true;
  }
  // 3. ÉVOLUTIVITÉ FUTURE : SOCIÉTÉ À HONG KONG
  else if (issuerEntity === "HK_LTD") {
    taxRate = 0.0;
    taxRateLabel = "0,0 % (Hong Kong)";
    regimeName = "XR Agency Limited (Hong Kong)";
    legalNotice = "Prestation facturée par XR AGENCY LIMITED (Hong Kong). Régime fiscal territorial de Hong Kong, taxe sur la valeur ajoutée non applicable (0% VAT).";
    isReverseCharge = false;
    isTaxExempt = true;
  }

  // Calculs financiers arrondis
  const oneShotHt = Math.round(params.oneShotHt * 100) / 100;
  const oneShotTax = Math.round(oneShotHt * taxRate * 100) / 100;
  const oneShotTtc = Math.round((oneShotHt + oneShotTax) * 100) / 100;

  const mrrHt = Math.round(params.mrrHt * 100) / 100;
  const mrrTax = Math.round(mrrHt * taxRate * 100) / 100;
  const mrrTtc = Math.round((mrrHt + mrrTax) * 100) / 100;

  const depositTtc = Math.round(oneShotTtc * 0.5 * 100) / 100;
  const balanceTtc = Math.round((oneShotTtc - depositTtc) * 100) / 100;
  const installment3xTtc = Math.round((oneShotTtc / 3) * 100) / 100;

  const issuerLabel =
    issuerEntity === "FR_SASU"
      ? "KARMA SASU (France · 78 Av. des Champs-Élysées, Paris)"
      : issuerEntity === "US_LLC"
      ? "XR AGENCY LLC (États-Unis · Delaware / Wyoming)"
      : "XR AGENCY LIMITED (Hong Kong · Central)";

  return {
    issuerEntity,
    issuerLabel,
    clientCountryCode: country.code,
    clientCountryLabel: `${country.flag} ${country.name}`,
    clientType,
    clientVatNumber: vatNum || undefined,
    taxRate,
    taxRatePercent: Math.round(taxRate * 1000) / 10,
    taxRateLabel,
    regimeName,
    legalNotice,
    isReverseCharge,
    isTaxExempt,
    oneShotHt,
    oneShotTax,
    oneShotTtc,
    mrrHt,
    mrrTax,
    mrrTtc,
    depositTtc,
    balanceTtc,
    installment3xTtc,
  };
}
