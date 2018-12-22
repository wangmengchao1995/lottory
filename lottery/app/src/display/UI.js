import React from 'react'
import {Button, Card, Icon, Image, Statistic} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg'/>
        <Card.Content>
            <Card.Header>黑马众筹</Card.Header>
            <Card.Meta>
                <p>管理员地址: {props.manager1}</p>
                <p>当前地址: {props.currentAccount}</p>
                <p>上一期赢家: {props.winner}</p>
            </Card.Meta>
            <Card.Description>随时开奖!</Card.Description>
        </Card.Content>

        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playerCount} 人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.totalMoney} ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='red' onClick={props.play}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>
        <Button inverted color='green' onClick={props.kaijiang} style={{'display': props.isShow}}>
            开奖
        </Button>
        <Button inverted color='orange' onClick={props.tuijiang} style={{'display': props.isShow}}>
            退奖
        </Button>
    </Card>
)

//es6的语法， 与module.exports用法一致
export default CardExampleCard


//export 对应 import (建议使用)

//module.exports  对应 require
