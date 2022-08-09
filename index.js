const { app, BrowserWindow, ipcMain} = require("electron");
const initTray = require("./ele-sysmenu");
let win = null;

// 主进程与渲染进程交互
require("./ele-props")

app.on("ready", function () {
    // 创建一个窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame:true,
        icon: "static/video-ico.png",     //应用运行时的标题栏图标
        webPreferences: {
            //配置网页功能
            nodeIntegration: true, // 加载的文件中可以直接使用node语法
            contextIsolation: false, // 是否开启上下文隔离，默认true
        },
    });

    //窗口中加载 index.html 这个文件
    win.loadFile("index.html");

    // 打开开发调试工具
    win.openDevTools();

    // 托盘与右键菜单
    initTray(win);

    // 界面菜单
    require("./ele-webmenu")


    win.setBounds(800,500);
    
    win.once("ready-to-show", () => {
        console.log("ready-to-show");
        win.show(); // 页面渲染完成后显示窗口，防止白屏问题
    });
});

/**
 *  进程通信(主进程，渲染进程)
 *
 *  主进程(比如这个 index.js 入口文件)
 *      可以使用所有nodejs api
 *
 *  渲染进程(loadFile 加载的index.html)
 *      默认不能使用nodejs api 除非去设置 webPreferences
 *
 *  主进程与渲染进程的通信
 *
 *      主进程 ipcMan 模块 处理渲染进程的数据
 *
 *      渲染进程 ipcRenderer 模块 接收主进程的数据
 * 
 * https://www.electronjs.org/zh/docs/latest/tutorial/message-ports
 * 
 * 
 * vue 配置 electron  https://juejin.cn/post/7015476516196712462#heading-17
 *      准备一个vue项目
 *      安装 vue add electron-builder 插件
 *      会自动添加
 *      "electron:build": "vue-cli-service electron:build",
 *      "electron:serve": "vue-cli-service electron:serve",
 * 
 *       主进程文件是 background.js，这个文件在 Vue项目/src/下面
 *      
 */
