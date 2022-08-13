const { dialog } = require('electron')

// app 加载完之后才能用

// 打开文件夹
module.exports = () => {
    console.log(dialog.showOpenDialog({ title: "默认测试", properties: ['openFile', 'multiSelections'] }))
}

