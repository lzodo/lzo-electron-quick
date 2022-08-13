const { ipcRenderer } = require("electron");
const { BrowserWindow, Menu, getCurrentWindow } = require('@electron/remote');

window.onload = function () {

    ipcRenderer.send("renderer-send123xx", "渲染进程数据传递到主进程");

    // 获取当前窗口
    //let thisWindow = BrowserWindow.getCurrentWindow()

    // 窗口关闭之前做一些事情
    // window.onbeforeunload = function(){
    //     console.log('222');
    //     document.getElementById("beforeClose").addEventListener("click",()=>{
    //         getCurrentWindow().close()
    //     })
    //     return false
    // }

    // 创建一个新的窗口
    document.getElementById("addwin").addEventListener("click", () => {
        let sonWin = new BrowserWindow({
            width: 200,
            height: 200,
        });
        // sonWin.loadFile("./index2.html");
        // 为关闭的时候进行清空
        sonWin.on("close", () => {
            sonWin = null;
        });
    })

    //右键菜单
    const rightMenuTemp = [
        { label: "复制" },
        { label: "粘贴" },
    ]

    const rmenu = Menu.buildFromTemplate(rightMenuTemp);
    window.addEventListener("contextmenu", e => {
        e.preventDefault();
        rmenu.popup({
            window: getCurrentWindow()
        })
    })
};


ipcRenderer.on("main-send", (data, val) => {
    // 接收主进程的消息
    console.log(val, 13456);
});