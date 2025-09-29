// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title PancakeToken (PNC) — BEP20 with Permit, Burnable, Pausable, Ownable
 * @notice Demo token for portfolio/interview. Not audited.
 */
contract PancakeToken is ERC20, ERC20Burnable, ERC20Permit, Ownable, Pausable {
    address public treasury;
    bool public feeEnabled;
    uint16 public feeBps; // e.g., 50 = 0.5%

    event TreasuryUpdated(address indexed treasury);
    event FeeConfigUpdated(bool enabled, uint16 feeBps);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address owner_,
        address treasury_
    ) ERC20(name_, symbol_) ERC20Permit(name_) Ownable(owner_) {
        _mint(owner_, initialSupply_ * 10 ** decimals());
        treasury = treasury_;
        feeEnabled = false;
        feeBps = 0;
    }

    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setFee(bool _enabled, uint16 _feeBps) external onlyOwner {
        require(_feeBps <= 500, "fee too high"); // max 5% demo guard
        feeEnabled = _enabled;
        feeBps = _feeBps;
        emit FeeConfigUpdated(_enabled, _feeBps);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20) {
        require(!paused(), "token paused");
        if (feeEnabled && treasury != address(0) && from != address(0) && to != address(0) && feeBps > 0) {
            uint256 fee = (value * feeBps) / 10_000;
            uint256 sendAmount = value - fee;
            super._update(from, treasury, fee);
            super._update(from, to, sendAmount);
        } else {
            super._update(from, to, value);
        }
    }

    // Solidity requires explicit override declaration for multiple inheritance in newer OZ versions
    function nonces(address owner) public view override(ERC20Permit) returns (uint256) {
        return super.nonces(owner);
    }

    function DOMAIN_SEPARATOR() public view override(ERC20Permit) returns (bytes32) {
        return super.DOMAIN_SEPARATOR();
    }
}
