var AssetManagement = artifacts.require("./AssetManagement.sol");

contract("AssetManagement", function(accounts) {

    /* TEST: Number of artifacts is initialized correctly. */
    it("Number of artifacts are initialized correctly.", function() {
        return AssetManagement.deployed().then(function(i) {
            contractInstance = i;
            return contractInstance.accountsCount();
        }).then(function(cnt) {
            assert.equal(cnt, 0, "Accounts init to 0s.");
            return contractInstance.assemblyCount();
        }).then(function(cnt) {
            assert.equal(cnt, 0, "Assemblies init to 0s.");
            return contractInstance.partsCount();
        }).then(function(cnt) {
            assert.equal(cnt, 0, "Parts init to 0s.");
        });
    });

    
    
});