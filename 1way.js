// @format
// Inspiration taken from:
// - https://exploringjs.com/es6/ch_proxies.html
// - https://reactjs.org/docs/hooks-intro.html
// - https://medium.com/@Roli_Dori/svelte-js-two-way-binding-ded98a89af1c

const selector = {
  css: "*[bind\\:value]",
  plain: "bind:value"
};
class Store extends WeakMap {
  set(...args) {
    const [elem, v] = args;
    elem.setAttribute("value", v);
    return super.set(...args);
  }
}
const store = new Store();

export const useState = (init, name) => {
  const fns = Array.from(document.querySelectorAll(selector.css))
    .filter(elem => elem.getAttribute(selector.plain) === `{${name}}`)
    .map(funFactory(init));
  console.log(fns);
  const setter = newValue => fns.forEach(fn => fn(newValue));
  return [init, setter];
};

const funFactory = init => {
  return elem => {
    if (!store.get(elem)) {
      store.set(elem, init);
    }
    return v => store.set(elem, v);
  };
};
