// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AAT is ERC20, Ownable {
    constructor() ERC20("American AI", "AAT") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000_000 * 10**18);
    }
}
