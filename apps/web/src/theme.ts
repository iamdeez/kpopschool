import { extendTheme } from "@chakra-ui/react";

// Ported 1:1 from the original kpopschool/src/App.js brand constants —
// these color names appear throughout the original components, so keeping
// the same names (not generic "brand.500" etc.) makes porting layout code
// a direct copy rather than a re-derivation.
export const popyellow = "#FFCC00";
export const popblue = "#00B2FF";
export const popmint = "#00C3BA";
export const popmag = "#FF3CA2";

export const brandGray = "#E1E4E4";
export const brandLightGray = "#F1F1F1";
export const brandDarkTeal = "rgba(29, 55, 57, 1)";
export const brandMintText = "rgba(0, 195, 186, 1)";
export const brandFadedTeal = "rgba(111, 151, 149, 1)";
// Lightened for WCAG AA (4.5:1) against brandDarkTeal — the original
// brandFadedTeal only manages 3.94:1 there (Lighthouse-confirmed).
export const brandFadedTealText = "#83aba9";

// WCAG AA (4.5:1)-safe darker variants of the brand colors above, for use
// wherever they're the actual text color (or a button background under
// white text) rather than a decorative border/accent — the originals fail
// contrast at those weights/sizes (Lighthouse-confirmed: popyellow 1.51:1,
// popblue 2.38:1, popmint 2.21:1, popmag 3.27:1 against white/near-white).
// Same hue/saturation, reduced lightness only.
export const popyellowText = "#806600";
export const popblueText = "#006b99";
export const popmintText = "#006661";
export const popmagText = "#cc006b";

// Shared card elevation treatment (teacher/curriculum/course cards) — flat,
// borderless content read as unfinished; a subtle shadow + hover lift is the
// standard "enterprise SaaS" affordance for a clickable card.
export const cardElevation = {
  borderRadius: "xl",
  boxShadow: "0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.06)",
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  _hover: {
    boxShadow: "0 4px 12px rgba(16, 24, 40, 0.12), 0 2px 4px rgba(16, 24, 40, 0.08)",
    transform: "translateY(-2px)",
  },
};

export const theme = extendTheme({
  colors: {
    popyellow: { 500: popyellow },
    popblue: { 500: popblue },
    popmint: { 500: popmint },
    popmag: { 500: popmag },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
        fontWeight: "600",
      },
      variants: {
        solid: {
          boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08)",
          transition: "box-shadow 0.2s ease-in-out, transform 0.15s ease-in-out",
          _hover: {
            boxShadow: "0 4px 10px rgba(16, 24, 40, 0.16)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "button:focus, input:focus": {
        outline: "none",
      },
      // v1.2.0 FR-007: certificate page's print button hides itself when printed.
      "@media print": {
        ".no-print": {
          display: "none",
        },
      },
    },
  },
});
