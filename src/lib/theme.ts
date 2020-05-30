export default {
  breakpoints: ["360px", "480px"],
  colors: {
    text: "#101010",
    background: "#eee",
    primary: "#fefefe",
    secondary: "#c8e9fb",
    blue: "#5B51D8",
    orange: "#F56040",
  },
  fontWeights: {
    body: 400,
    heading: 700
  },
  fontSizes: [
    "0.5rem",
    "0.8rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2rem"
  ],
  radii: {
    default: "2px",
    plus: "5px"
  },
  text: {
    small: {
      fontSize: 1,
      opacity: 0.8
    },
    bubble: {
      time: {
        bottom: "5px",
        fontSize: 1,
        minWidth: "initial",
        position: "absolute",
        right: "5px",
      }
    }
  },
  buttons: {
    primary: {
      background: "orange",
      cursor: "pointer"
    }
  },
  variants: {
    badge: {
      alignItems: "center",
      bg: "blue",
      borderRadius: "plus",
      color: "background",
      fontSize: "11pt",
      p: "0 2px",
    },
    bubble: {
      primary: {
        bg: "primary",
        borderRadius: "plus",
        boxShadow: "inset 0 -1px 0 0 rgba(0,0,0,0.15)",
        float: "right",
        marginLeft: "40%",
        padding: "0.3rem",
      },
      foreign: {
        bg: "secondary",
        borderRadius: "plus",
        boxShadow: "inset 0 -1px 0 0 rgba(0,0,0,0.15)",
        marginRight: "40%",
        padding: "0.3rem",
      }
    }
  }
}
