const { app, BrowserWindow } = require("electron")

app.on("ready", function () {
    // 创建一个窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        resizable: true,
        show: false, //设置窗口是否显示，默认true
        webPreferences: { //配置网页功能
            nodeIntegration:true, // 加载的文件中可以直接使用node语法
            contextIsolation:false, // 是否开启上下文隔离，默认true
        }
    });

    //窗口中加载 index.html 这个文件
    win.loadFile("stady-index.html")

    // 操作web内容的属性
    win.webContents.on("dom-ready",()=>{
        console.log("222 一个渲染进程加载完成")
    })

    win.on("close",()=>{
        console.log("主窗口关闭")
    })

    // win.setBounds({x:500,y:500}) // 设置窗口初始位置
    // win.setPosition(10,10) //设置位置

    win.once('ready-to-show', () => {
        console.log("ready-to-show");
        win.show()  // 页面渲染完成后显示窗口，防止白屏问题
    })

    win.on('show',()=>{
        win.maximize() // 显示后最大化、最小化、关闭窗口
        // win.minimize()
        // win.close()
    }) 
})

let isOpen = app.requestSingleInstanceLock();
if (!isOpen) {
    console.log("已经打开一个了")
}

/**
 * 全局 局部安装 electron
 * npm install electron -g 或 --save-dev
 * 
 * 运行脚本
 * "start": "electron ."
 * 
 * 如果控制台打印乱码的话
 * "start": "chcp 65001 & electron ."
 */

/**
 * app 模块
 *
 * 生命周期(程序从开始到结束经历的过程)
 *
 * 1、ready  应用程序初始化完成执行
 *      app.whenReady().then(()=>{})  初始化候完成之后promise方式执行回调的内容
 * 2、browser-window-created  窗口创建完成触发
 * ... 2 - 3直接有一些 dom 的周期事件，win.webContents.dom-ready...
 * 3、before-quit 窗口关闭之前触发
 * 4、will-quit 窗口关闭了，当时程序还没有关闭，即将关闭时触发
 * 5、quit 应用程序关闭触发
 *      -   app.window-all-closed 如果有这个，回调中需要执行 app.quit() 才会执行后面的钩子  
 *
 * 方法
 * app.requestSingleInstanceLock()    true 或 false，判断之前是否不存在打开的窗口，可以禁止双开
 *      调用后触发 second-instance 事件
 */

/**
 * BrowserWindow 模块
 *
 * BrowserWindow 属性
 *    width 窗口宽度
 *    height 窗口高度
 *    frame:false 去除边框(菜单按钮等)
 *    resizable:true 设置窗口是否可拖拉，改变大小
 *    maxWidth maxHeight minWidth minHeight  如果可以拖动，可以指定最大多大，最小多大
 *    show:true 设置窗口是否显示，默认true
 *    webPreferences: { //配置网页功能
 *       nodeIntegration:true, // 加载的文件中 是否支持node 默认false
 *       contextIsolation:false, // 是否开启上下文隔离，默认true
 *    }
 * BrowserWindow 实例方法
 *    win.loadFile 用于加载本地文件（各种类型文件）
 *    win.loadURL 用于加载远程文件，网页、视频地址(可以内置其他网站到程序中)
 *
 * BrowserWindow 事件
 *    win.once('ready-to-show',()=>{})  页面渲染完成之后触发
 *    win.on('show',()=>{})  页面显示时候触发
 */