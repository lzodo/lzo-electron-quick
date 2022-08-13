const { app, BrowserWindow, ipcMain ,BrowserView} = require("electron");
const initTray = require("./ele-sysmenu");
const showDialog = require("./Main/main-dialog");
let win = null;


// 主进程与渲染进程交互
require("./ele-props")

app.on("ready", function () {
    // 创建一个窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame:true,
        // autoHideMenuBar:true,
        icon: "static/video-ico.png",     //应用运行时的标题栏图标
        webPreferences: {
            //配置网页功能
            nodeIntegration: true, // 加载的文件中可以直接使用node语法
            contextIsolation: false, // 是否开启上下文隔离，默认true
        },
    });
    require('@electron/remote/main').initialize()
    require("@electron/remote/main").enable(win.webContents)

    // dialog
    // showDialog();

    // 子窗口（child 窗口将总是显示在 win 窗口的顶部）
    // const child = new BrowserWindow({ parent: win })
    // child.show()

    // 内嵌子窗口
    const view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 200, y: 200, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')
    view.setAutoResize({width:true,horizontal:true})

    //窗口中加载 index.html 这个文件
    win.loadFile("index.html");

    // 打开开发调试工具
    win.openDevTools();

    // 托盘与右键菜单
    initTray(win);

    // 界面菜单
    require("./ele-webmenu")

    // shell
    require("./Main/main-shell")


    win.setBounds(800,500);
    
    win.once("ready-to-show", () => {
        console.log("ready-to-show");
        win.show(); // 页面渲染完成后显示窗口，防止白屏问题
    });

    ipcMain.on("renderer-send123xx", (event, val) => {
        console.log(val);
        event.reply(
            "main-send",
            "接收到渲染进程数据，主进程到渲染进程，electron控制台打印"
        );
    });
    ipcMain.se
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
 *  监听主进程变化
 *      nodemon --watch index.js --exec electron .
 *  打包
 *      "package-win": "electron-packager . HelloWorld --platform=win32",
 *      安装 npm install --save-dev electron-packager
 *          指令 程序位置 程序名称 系统平台
 * 
 * vue 配置 electron  https://juejin.cn/post/7015476516196712462#heading-17
 *      准备一个vue项目
 *      安装 vue add electron-builder 插件
 *      会自动添加
 *      "electron:build": "vue-cli-service electron:build",
 *      "electron:serve": "vue-cli-service electron:serve",
 *          yarm install的包最好用 yard electron:build 打包
 *          打包错误问题1
 *          electron:build 的时候需要下载很多大文件，终端无法下载可以卡主的网址复制到浏览器下载
 *              https://github.com/electron/electron/releases?after=v1.2.3
 *              找到 C:\Users\Administrator\AppData\Local\electron\Cache
 *              electron-v12.2.3-win32-x64.zip 直接放到 Cache 下
 * 
 *              找到 C:\Users\Administrator\AppData\Local\electron-builder\Cache\
 *              Cache 下创建 nsis 和 winCodeSign，存放解压的 nsis-x.x.x,nsis-resources-xxx 和 winCodeSign-x.x.x
 * 
 *         主进程文件是 background.js，这个文件在 Vue项目/src/下面
 *          vue + electron 可以指定更新
 *          
 *      
 */
