const { app, BrowserWindow, ipcMain } = require("electron");

// 监听渲染进程的 renderer-send 数据
ipcMain.on("renderer-send", (event, val) => {
    console.log(val);
    event.reply(
        "main-send",
        "接收到渲染进程数据，主进程回复，electron控制台打印"
    );
});
app.on("ready", function () {
    // 创建一个窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //配置网页功能
            nodeIntegration: true, // 加载的文件中可以直接使用node语法
            contextIsolation: false, // 是否开启上下文隔离，默认true
        },
    });

    //窗口中加载 index.html 这个文件
    win.loadFile("stady-index.html");

    // 打开开发调试工具
    win.openDevTools();

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
 */

/**
 * window 的消息传递
 * 窗口1 
 *      通过 window.open('xxx.html') 打开子窗口
 *      window.addEventListener('message',(msg)=>{ console.log("接收到 xxx.html 窗口发送的信息") })
 * 
 *      xxx.html
 *      通过 window.opener.postMessage("发送到窗口1的消息")
 */