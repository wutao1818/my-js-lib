import Toast from './index.vue';

Toast.install = Vue => {
  Vue.prototype.$toast = (msg = '操作成功', duration = 2000) => {
    const contruct = Vue.extend(Toast);
    const instance = new contruct();
    instance.msg = msg;
    const tpl = instance.$mount().$el;

    document.querySelector('body').appendChild(tpl);
    setTimeout(() => {
      document.querySelector('body').removeChild(tpl)
    }, duration);

  }
}

export { Toast };
