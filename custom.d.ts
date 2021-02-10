/* eslint-disable no-undef */
/* eslint-disable import/no-unused-modules */

// To import svg as modules in a component
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
