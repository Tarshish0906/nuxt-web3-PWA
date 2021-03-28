pragma solidity ^0.5.12;

contract SingleNumRegister {
    uint256 storeData;

    function set(uint256 x) public {
        storeData = x;
    }

    function get() public view returns (uint256 retVal) {
        return storeData;
    }
}
