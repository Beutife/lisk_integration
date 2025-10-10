// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    mapping(address => bool) private _hasClaimed;

    constructor() ERC20("Lisk SEA Token", "LSEA") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function mint(uint256 amount) public {
        require(!_hasClaimed[msg.sender], "Already claimed tokens");
        require(amount <= 100 * 10**decimals(), "Cannot mint more than 100 tokens");
        _hasClaimed[msg.sender] = true;
        _mint(msg.sender, amount);
    }
}