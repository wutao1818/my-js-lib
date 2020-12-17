import Mybutton from './index.vue';

Mybutton.install = (Vue) => {
  Vue.component(Mybutton.name, Mybutton);
}

export { Mybutton };
