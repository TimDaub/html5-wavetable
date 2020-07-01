//@format
import { logistic } from "./fun.js";

export const render = (elem, data, styles) => {
  new Dygraph(elem, data, styles);
};
