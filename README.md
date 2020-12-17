## vue组件开发，通过rollup打包来：

```javascript
1、这里安装一个npm包 generator-rollup-package，npm install -g generator-rollup-package
2、通过yemon 在本地安装 yo rollup-package
3、由于npm安装某些依赖或者软链会导致安装报错，因此用强制安装 npm install -f
4、然后开始写vue组件，最后通过export导出
5、执行打包 npm run prod
6、执行发布 npm publish 	（确保 nrm 切换到内网 npm： 并登录npm账号）
7、访问本地sinopia查看你的包是否发布成功
```
 

## 使用方式

```javascript
import Toast from 'wutao-toast';
Vue.use(Toast);
  
```

