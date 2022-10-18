import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: "6px",
        fontSize: "16px",
        height: "42px",
        width: "fit-content",
        fontWeight: "500",
        // boxShadow: "0px 0px 10px #00000029"
      },
      sizes: {
        xl: {
          h: "46px",
          fontSize: "18px",
          fontWeight: "700",
        },
      },
      variants: {
        primary: {
          background:
            "transparent linear-gradient(90deg, #F13B3B 0%, #E8104B 100%) 0% 0% no-repeat padding-box",
          color: "white",
          _hover: {
            _disabled: {
              bgColor: "#CACACA",
            },
          },
        },
        secondary: {
          background: "#CACACA 0% 0% no-repeat padding-box",
          color: "white",
        },
        primaryoutline: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#FF5757",
          color: "#FF2B2B",
        },
        secondaryoutline: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#CACACA",
          color: "#F13B3B",
        },
      },
    },
  },
  breakpoints,
  colors: {
    red: {
      350: "#FF3030",
      450: "#FF0707",
      600: "#eb1e1a",
    },
    blue: {
      300: "#2874f0",
    },
    gray: {
      100: "#E0E2E5",
      ecom: "#f6f6f6",
      icon: "#848a8f",
      150: "#f9f9f9",
      250: "#636363",
      300: "#6D6B6B",
      350: "#DDE0E2",
      450: "#A5A5A5",
      550: "#6A6D6F",
      650: "#484B4D",
      750: "#424242",
      800: "#191A20",
      850: "#393939",
    },
    black: {
      200: "#1D1D1D",
    },
  },
});

const ChakraConfig = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraConfig;
