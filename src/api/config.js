//项目配置生产、开发，测试接口配置

export default {
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: false,
    /**
     * @description api请求基础路径
     */
    baseUrl: process.env.NODE_ENV === 'development' ? "http://49.234.39.34:9093" : "http://218.94.87.202:9091",
    //baseUrl: process.env.NODE_ENV === 'development' ? "http://192.168.101.39:9093" : "http://49.234.39.34:9093",
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'loginOne',
    /**
     * @description 需要加载的插件
     */
    plugin: {
        'error-store': {
            showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    }
}
