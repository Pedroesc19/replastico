const interaction = "var(--motion-fast)";
const overlay = "var(--motion-medium)";

const motion = {
  transitionAll: `all ${overlay} var(--motion-ease)`,
  fade: ({ overlay: isOverlay = false } = {}) => ({
    animation: `fadeIn ${isOverlay ? overlay : interaction} var(--motion-ease)`
  }),
  slide: ({ direction = "up", overlay: isOverlay = false } = {}) => {
    const name =
      direction === "down"
        ? "slideInDown"
        : direction === "left"
        ? "slideInLeft"
        : direction === "right"
        ? "slideInRight"
        : "slideInUp";
    return {
      animation: `${name} ${isOverlay ? overlay : interaction} var(--motion-ease)`
    };
  },
  scale: ({ overlay: isOverlay = false } = {}) => ({
    animation: `scaleIn ${isOverlay ? overlay : interaction} var(--motion-ease)`
  })
};

export default motion;
