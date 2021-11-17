import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

// Custom themes

const fonts = {
  ...chakraTheme.fonts,
  heading: "Helvetica",
  text: "Arial",
};

const components = {
  ...chakraTheme.components,
  Button: {
    baseStyle: {
      width: "100%",
    },
    variants: {
      solid: {
        paddingY: "1.5em",
        color: "white",
        background: "gray.800",
        _hover: {
          background: "black",
        },
      },
      outline: {
        paddingY: "1.5em",
        color: "gray.600",
        _hover: {
          background: "gray.800",
          color: "white",
        },
      },
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: "gray.800",
      errorBorderColor: "red.500",
    },
  },
  NumberInput: {
    defaultProps: {
      focusBorderColor: "gray.800",
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: "gray.800",
    },
  },
  Heading: {
    baseStyle: {
      color: "gray.800",
      letterSpacing: "tight",
    },
  },
};

const theme = extendTheme({ fonts, components });

export default theme;
