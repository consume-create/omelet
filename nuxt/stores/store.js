import { defineStore } from 'pinia';

export const useStore = defineStore('state', {
  state: () => ({
    menu_open: false,
    dark_mode: false,
    site_nav: [
      { id: 'work', label: 'Work' },
      { id: 'capabilities', label: 'Capabilities' },
      { id: 'leadership', label: 'Leadership' }
    ]
  }),
  actions: {
    setMenuOpen() {
      this.menu_open = !this.menu_open;
    },
    setDarkMode() {
      this.dark_mode = !this.dark_mode;
    }
  }
})
