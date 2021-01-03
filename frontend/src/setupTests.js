// In response to error "matchMedia not present,
// legacy browsers require a polyfill"
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

window.scrollTo = function () {
  return;
};
