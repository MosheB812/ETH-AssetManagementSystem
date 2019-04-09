pragma solidity ^0.4.2;
pragma experimental ABIEncoderV2;

contract AssetManagement {

/* DATA DECLARATIONS */
    /* Account Structure */
    struct Account {
        uint id;
        string acc_name;
        string acc_desc;
        string acc_addr;
        string acc_state;
    }
    /* Assembly Structure */
    struct Assembly {
        uint aNumber;
        string aName;
        string aDesc;
        string aManuf;
        uint[] parts;
    }
    /* Part Structure */
    struct Part {
        uint pNumber;
        string pName;
        string pDesc;
        string pManuf;
        string[] owners;
    }

    /* Account Store Mapping */
    mapping(uint => Account) public account_store;
    uint public accountsCount;

    /* Assembly Store Mapping */
    mapping(uint => Assembly) public assembly_store;
    uint public assemblyCount;

    /* Part Store Mapping */
    mapping(uint => Part) public part_store;
    uint public partsCount;


/* METHOD DECLARATIONS */
    /* Constructor */
    constructor () public {
        accountsCount = 0;
        assemblyCount = 0;
        partsCount = 0;
    }
    /* Events */
    event accountCreatedEvent(uint indexed _accID);
    event assemblyCreatedEvent(uint indexed _assemNum);
    event partCreatedEvent(uint indexed _pNum);

    /* Create new Account */
    function createAccount (string _Name, string _Desc, string _Addr, string _State) public {
        accountsCount++;
        account_store[accountsCount] = Account(accountsCount, _Name, _Desc, _Addr, _State);

        /* Trigger event */
        emit accountCreatedEvent(accountsCount);
    }
    /* Create new Assembly */
    function createAssembly (string _aName, string _aDesc, string _aManuf, uint[] memory _partIDs) public {
        assemblyCount++;

        assembly_store[assemblyCount].aNumber = assemblyCount;
        assembly_store[assemblyCount].aName = _aName;
        assembly_store[assemblyCount].aDesc = _aDesc;
        assembly_store[assemblyCount].aManuf = _aManuf;

        for(uint i = 0; i <= _partIDs.length - 1; i++) {
            assembly_store[assemblyCount].parts.push(_partIDs[i]);
        }

        /* Trigger event */
        emit assemblyCreatedEvent(assemblyCount);
    }
    /* Create new parts */
    function createPart (string _pName, string _pDesc, string _pManuf) public {
        partsCount++;
        part_store[partsCount].pNumber = partsCount;
        part_store[partsCount].pName = _pName;
        part_store[partsCount].pDesc = _pDesc;
        part_store[partsCount].pManuf = _pManuf; 
        part_store[partsCount].owners.push(_pManuf);
        
        /* Trigger event */
        emit partCreatedEvent(partsCount);
    }
    /* Change the Part Owner */
    function updatePartOwner(uint _index, string owner) public {
        part_store[_index].owners.push(owner);
    }
    /* Get list of owners for a part */
    function getPartOwners(uint _index) public view returns (string[] memory) {
        return part_store[_index].owners;
    }
    /* Get latest owner for a part */
    function getCrntPartOwner(uint _index) public view returns (string memory) {
        uint length = part_store[_index].owners.length;
        return part_store[_index].owners[length - 1];
    }
    /* Get a list of parts associated with an assembly */
    function getAssemblyPartList(uint _index) public view returns (uint[] memory) {
        return assembly_store[_index].parts;
    }
}