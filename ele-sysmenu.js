const { app, Tray, Menu } = require("electron");

module.exports = (win) => {
    // 托盘图标 与 右键菜单列表
    let tray = new Tray("static/video-ico.png");
    tray.setToolTip("鼠标移入提示文字");
    tray.setTitle("设置 titlle");

    //监听点击托盘的事件
    tray.on("click", () => {
        // 这里来控制窗口的显示和隐藏
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    });

    let menu = Menu.buildFromTemplate([
        {
            label: "退出",
            type: "radio",
            checked: true, //默认选中
            click: () => {
                console.log("点击退出");
                app.quit();
            },
        },
    ]);

    tray.setContextMenu(menu);
};

// 监听托盘右键事件
// tray.on("right-click", () => {
//     // 右键菜单模板
//     const tempate = [
//         {
//             label: "无操作",
//         },
//         {
//             label: "退出",
//             click: () => app.quit(),
//         },
//     ];
//     //通过 Menu 创建菜单
//     const menuConfig = Menu.buildFromTemplate(tempate);
//     // 让我们的写的托盘右键的菜单替代原来的
//     tray.popUpContextMenu(menuConfig);
// });
