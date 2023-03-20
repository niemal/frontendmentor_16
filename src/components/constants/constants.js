export const COLORS = {
  marine_blue: "hsl(213, 96%, 18%)",
  marine_blue_blue: "hsla(213, 96%, 18%, 0.35)",
  purple_blue: "hsl(243, 100%, 62%)",
  pastel_blue: "hsl(228, 100%, 84%)",
  light_blue: "hsl(206, 94%, 87%)",
  strawberry_red: "hsl(354, 84%, 57%)",
  cool_gray: "hsl(231, 11%, 63%)",
  light_gray: "hsl(229, 24%, 87%)",
  magnolia: "hsl(217, 100%, 97%)",
  alabaster: "hsl(231, 100%, 99%)",
  custom_gray: "hsl(230,75%,98%)",
  white: "hsl(0, 0%, 100%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth1: 1320,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth1: `(max-width: ${BREAKPOINTS.exclusiveWidth1 / 16}rem)`,
};
