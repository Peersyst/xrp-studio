import { Theme } from "@peersyst/react-components";
import { createGlobalStyle } from "styled-components";
import "./fonts.css";
import { SwitchStyles } from "config/theme/component/Switch.styles";

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    scroll-behavior: smooth;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    color: #121212;
    font-family: Ripple, Inter, sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: inherit;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  strong {
    font-weight: 500;
  }

  #root {
      min-height: 100vh;
  }
  
  a {
      text-decoration: none;
  }
  
  ${SwitchStyles};
`;
