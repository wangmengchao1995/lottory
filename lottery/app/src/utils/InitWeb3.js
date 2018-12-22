//初始化web3

//1. 导入web3， 导入的是web3类型，并不是实例, 需要我们自己new一下
let Web3 = require('web3')

//2. 创建一个web3的实例
let web3 = new Web3()

console.log('version :', web3.version)

//3. 设置网络: 巧克力
//巧克力是给我们测试使用的，默认不需要指定助记词就可以使用代码进行交互
//应该指定用户自己的Provider:电话卡
// web3.setProvider('http://127.0.0.1:7545')
web3.setProvider(window.web3.currentProvider)

module.exports = web3;
