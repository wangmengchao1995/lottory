import React, {Component} from 'react';
import CardExampleCard from './display/UI'

let LotteryInstance = require('./eth/getInstance')
let web3 = require('./utils/InitWeb3')

class App extends Component {

    //状态变量，可以在类内进行传值
    state = {
        manager: '',
        winner: '',
        players: [],
        totalMoney: 0,
        round: 0,
        playerCount: 0,
        currentAccount: '',
        isShow: '',
    }


    //获取合约管理员地址
    //生命周期函数
    async componentWillMount() {
        //manager加上public，会自动生成一个访问函数
        //1. 调用合约方法，是异步的，需要使用async/await
        //2. 调用方法，需要指定call()或者send()
        let manager = await LotteryInstance.methods.manager().call()
        console.log('manager :', manager)

        //异步的，返回一个promise
        let accounts = await web3.eth.getAccounts()
        console.log('accounts :', accounts[0])

        //获取winner
        let winner = await LotteryInstance.methods.winner().call()
        //获取参与人
        let players = await LotteryInstance.methods.getPlayers().call()
        //获取奖金总额
        let totalMoney = await LotteryInstance.methods.getBalance().call()
        //获取期数
        let round = await LotteryInstance.methods.round().call()
        //获取本期彩民人数
        let playerCount = await LotteryInstance.methods.getPlayerCount().call()

        //如果是管理员就传递inline，否则传递none
        let isShow = manager == accounts[0] ? 'inline' : 'none'


        //设置状态变量的语法
        this.setState({
            // manager: manager
            //简写方式
            manager,
            currentAccount: accounts[0], //获取小狐狸当前地址
            winner,
            players,
            totalMoney: web3.utils.fromWei(totalMoney, 'ether'),
            round,
            playerCount,
            isShow,
        })
    }

    play = async () => {
        try { //获取账户
            let accounts = await web3.eth.getAccounts()

            //向合约投注1ether
            let res = await LotteryInstance.methods.play().send({
                from: accounts[0],
                // gas: xxxx,
                // gasprice : xxxx,
                value: 1 * 10 ** 18,
            })
            alert(`投注成功!`)
            window.location.reload(true)
        } catch (e) {
            console.log("play失败!")
        }
    }

    kaijiang = async () => {
        try { //获取账户
            let accounts = await web3.eth.getAccounts()

            let res = await LotteryInstance.methods.kaijiang().send({
                from: accounts[0],
                // gas: xxxx,
                // gasprice : xxxx,
                // value: 1 * 10 ** 18,
            })
            alert(`开奖成功!`)
            window.location.reload(true)
        } catch (e) {
            console.log("开奖失败!")
        }
    }

    tuijiang = async () => {
        try { //获取账户
            let accounts = await web3.eth.getAccounts()

            //向合约投注1ether
            let res = await LotteryInstance.methods.tuijiang().send({
                from: accounts[0],
                // gas: xxxx,
                // gasprice : xxxx,
                // value: 1 * 10 ** 18,
            })
            alert(`退奖成功!`)
            window.location.reload(true)
        } catch (e) {
            console.log("退奖失败!")
        }
    }


    render() {
        //对状态变量state进行解构
        let {manager, winner, players, totalMoney, round, playerCount, currentAccount, isShow} = this.state

        //读取状态变量的语法
        return (
            <div>
                <p>manager : {manager}</p>
                <p>winner: {winner}</p>
                <p>players : {players}</p>
                <p>totalMoney : {totalMoney}</p>
                <p>round : {round}</p>
                <CardExampleCard
                    manager1={manager}
                    currentAccount={currentAccount}
                    winner={winner}
                    totalMoney={totalMoney}
                    round={round}
                    playerCount={playerCount}
                    play={this.play}
                    kaijiang={this.kaijiang}
                    tuijiang={this.tuijiang}
                    isShow={isShow}
                />
            </div>
        );
    }
}

export default App;
