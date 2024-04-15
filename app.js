const express = require('express');
const app = express();
const path = require('path');
// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'public')));
// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// 定义监听端口，使用环境变量或默认3000端口
const PORT = process.env.PORT || 3000;
// 将服务器监听放在一个函数中，以便测试时不启动服务器
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// 导出app供测试使用
// 导出app供测试使用 
module.exports = app;