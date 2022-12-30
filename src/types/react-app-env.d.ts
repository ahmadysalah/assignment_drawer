/// <reference types="react-scripts" />
// css modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// roughjs types
declare module 'roughjs/bundled/rough.esm';
