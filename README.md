![bangdan-screen](https://socialify.git.ci/9075512/bangdan-screen/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)
## 项目描述


根据奔跑吧面条的[vue-big-screen](https://gitee.com/MTrun/big-screen-vue-datav)开源框架基础上进行修改。

- 项目需要全屏展示（按 F11）。

- 项目部分区域使用了全局注册方式，增加了打包体积，在实际运用中请使用 **按需引入**。

- 项目环境：Vue-cli、DataV、Echarts、Webpack、Npm、Node，axios,mock。

- 请拉取 master 分支的代码，其余分支是开发分支。

- 在项目public目录下存放地图数据合集，根据地市编存放。


友情链接：

1. [Vue 官方文档](https://gitee.com/link?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Finstance.html)
2. [DataV 官方文档](https://gitee.com/link?target=http%3A%2F%2Fdatav.jiaminghi.com%2Fguide%2F)
3. [echarts 实例](https://gitee.com/link?target=https%3A%2F%2Fecharts.apache.org%2Fexamples%2Fzh%2Findex.html)，[echarts API 文档](https://gitee.com/link?target=https%3A%2F%2Fecharts.apache.org%2Fzh%2Fapi.html%23echarts)
4. [mock.js官网](http://mockjs.com/examples.html)
5. [axios官网](https://axios-http.com/)

## 使用介绍

### 安装

```npm
npm install   
```
### 启动

```npm
npm start 
```

## 自适应缩放组件

### 注意

采用Scale方式，会自动给组件父元素添加overflow:hidden 

### 使用

```vue
<template>
  <scale-screen width="1920" height="1080">
    <div>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
    </div>
  </scale-screen>
</template>

<script>
import ScaleScreen from 'scale-screen'

export default {
  name:'Demo',
  components:{
    VScaleScreen
  }
}
</script>
```
### API
| 属性         | 说明                                                         | 类型                             | 默认值 |
| ------------ | ------------------------------------------------------------ | -------------------------------- | ------ |
| selfAdaption | 是否进行自适应                                               | Boolean                          | true   |
| width        | 大屏宽度                                                     | `Number` or `String`             | 1920   |
| height       | 大屏高度                                                     | `Number` or `String`             | 1080   |
| autoScale    | 自适应配置，配置为boolean类型时，为启动或者关闭自适应，配置为对象时，若x为true，x轴产生边距，y为true时，y轴产生边距，启用fullScreen时此配置失效 | Boolean or {x:boolean,y:boolean} | true   |
| delay        | 窗口变化防抖延迟时间                                         | Number                           | 500    |
| fullScreen   | 全屏自适应，启用此配置项时会存在拉伸效果，同时autoScale失效，非必要情况下不建议开启 | Boolean                          | false  |
| boxStyle     | 修改容器样式，如居中展示时侧边背景色，符合Vue双向绑定style标准格式 | Object                           | null   |
| wrapperStyle | 修改自适应区域样式，符合Vue双向绑定style标准格式             | Object                           | null   |

## 公用组件

封装了除面条外个别用到的组件

### message消息提示

因为刚开始没想着用第三方提示库，自己简单封装了一个。

注：组件内部目前只有warning，类型，如果需要其他类型自己组件内添加。

因在main.js注册全局可以直接使用，不需要引入

```js
  this.$Message({
      text: res.msg,
      type: 'warning'
  })
//也可以这样
this.$Message.warning(res.msg)
```

| 参数 |   描述   | 默认值  |  类型  | 可选值  |
| :--: | :------: | :-----: | :----: | :-----: |
| text | 提示文字 |    -    | string |    -    |
| type | 弹窗类型 | warning | string | warning |

### 外边框

因为我的项目外边框几乎一样，还有title,所以封装了此组件。

根据自己需求更改，更换外边框（src\components\item-wrap\item-wrap.vue）下更换。

```vue
<ItemWrap
    title="我是title"
    >
       <div>我是谁？</div>
</ItemWrap>
```

| 参数  | 描述 | 默认值 |  类型  | 可选值 |
| :---: | :--: | :----: | :----: | :----: |
| title | 标头 |   -    | string |   -    |

## 免责声明

本项目仅供开发学习使用，任何人用于任何用途均与项目作者无关！

