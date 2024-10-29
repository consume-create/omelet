export default {
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        offset: 60,
        behavior: 'smooth'
      };
    } else if (savedPosition) {
      return {
        ...savedPosition,
        behavior: 'smooth'
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
};
