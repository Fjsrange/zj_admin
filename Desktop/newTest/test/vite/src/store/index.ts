import { defineStore } from 'pinia';

// 定义菜单状态
export interface MenuState {
  isCollapse: boolean;
}

export const useMenuStore = defineStore('menu', {
  state: ():MenuState=>({
    isCollapse: false,
  }),
  actions: {
    toggleCollapse() {
      console.log('toggleCollapse', this.isCollapse);
      
      this.isCollapse = !this.isCollapse;
    }
  }
});
