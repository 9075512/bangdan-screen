
let UtilVar = {
    ENC: false, //返回结果是否加密
    baseUrl: process.env.VUE_APP_BASE_API,
    code: 401,
}
const runtimeType = {
    production: () => {
        /**
         * 通过打包配置打某个环境的api地址
         */
        UtilVar.baseUrl = process.env.VUE_APP_BASE_API
    },
    //测试环境
    test:()=>{

    },
    //开发环境
    development: () => {
      
    },
    
}
console.log(process.env);

//通过打包配置打某个环境的api地址
// runtimeType[process.env.VUE_APP_BASE_API]()
export default UtilVar

