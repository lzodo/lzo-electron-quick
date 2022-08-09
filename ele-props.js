const { ipcMain } = require("electron");

// 监听渲染进程的 renderer-send 数据
ipcMain.on("renderer-send123xx", (event, val) => {
    console.log(val);
    event.reply(
        "main-send",
        "接收到渲染进程数据，主进程到渲染进程，electron控制台打印"
    );
});

// win.webContents.send('mainMsg', '也可以主线程发送到渲染进程')
