const { app, BrowserWindow, ipcMain ,Tray,Menu} = require("electron");
let win = null;
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
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame:true,
        webPreferences: {
            //配置网页功能
            nodeIntegration: true, // 加载的文件中可以直接使用node语法
            contextIsolation: false, // 是否开启上下文隔离，默认true
        },
    });

    //窗口中加载 index.html 这个文件
    win.loadFile("index.html");

    // 打开开发调试工具
    // win.openDevTools();

    // 托盘图标 与 右键菜单列表
    let tray = new Tray("static/video-ico.png");
    tray.setToolTip("鼠标移入提示文字")

    let menu = Menu.buildFromTemplate([
        {
            label:"退出",
            type:"radio",
            checked:true, //默认选中
            click:()=>{
                console.log('点击退出');
                app.quit();
            }
        }
    ])

    tray.setContextMenu(menu)




    win.setBounds(800,500);
    
    win.once("ready-to-show", () => {
        console.log("ready-to-show");
        win.show(); // 页面渲染完成后显示窗口，防止白屏问题
    });
});


ipcMain.on("move-application", (event, val) => {
    win && win.setBounds(800,500);
    win && win.setPosition(val.x,val.y) 
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
 */
