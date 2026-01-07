export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  },
  stagger: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.06,
      },
    },
  },
  hoverLift: {
    rest: { y: 0 },
    hover: { y: -4 },
  },
};

export const motionTransition = {
  easeOut: [0.16, 1, 0.3, 1] as const,
};
