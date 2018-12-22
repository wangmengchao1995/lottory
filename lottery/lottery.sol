pragma solidity ^0.4.24;

contract Lottery {
    
//     1. 管理员： address
// 2. 彩民池: address[]
// 3. 中奖者： address
// 4. 彩票期数：uint


    address public manager;
    address[] players;
    address public winner;
    uint public round; 
    
    constructor() public {
        manager = msg.sender;
    }
    
    
    function play() public payable {
        
        // 使用require限定转入的金额为 1 ether
        // Require的特点，是参数要求为true
        require(msg.value == 1 ether);
        
        players.push(msg.sender);
        
    }
    
    // 开奖逻辑分析
    // 1. 只有管理员可以执行开奖
    // 2. 选择一个中奖人（随机的）：随机选择一个数组下标
        // a. Hash = keccak256(abi.encodePakcked(block.difficulty, block.timestamp, players.length))
        // b. 生成一个哈希，转成uint256，value1
        // c.  Value1 % 彩民数组的长度， 得到一个 0 ~ 彩民数组长度
        // d. 中奖人 = players[余数]
    // 3. 向这个下标对应的地址进行转账：99%金额， 1%给管理员
    // 4. 彩民数组清零, 期数加一
    
    function kaijiang() onlyManager public {
        bytes32 hash = keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length));
        
        uint256 value = uint256(hash);
        
        uint256 i = value % players.length;
        
        winner = players[i];
        
        uint256 totalMoney = getBalance();
        
        winner.transfer(totalMoney);
        
        round ++;
        
        delete players;
    } 
    
        
    // 1. 遍历彩民数组
    // 2. 对每一个元素进行转账， 1 ether
    // 3. 彩民池清零
    // 4. 期数加一

    function tuijiang() onlyManager public {
        
        for (uint i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
        }
        
        delete players;
        round++;
    }
    
    
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
    
    function getPlayerCount() public view returns(uint) {
        return players.length;
    }
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}