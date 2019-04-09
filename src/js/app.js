/*
** Define variables for loader and content HTML data
*/
var loader = $("#loader");
var content = $(".content");
var datatableHeader = $('#datatableHeader');
var datatableResults = $('#datatableResults');

/*
** Function: Executed on html page load. Start App initialization.
*/
$(function() {
    $(window).load(function() {
        console.log("Page loaded.");

        /* Show the loader and hide all HTML content while app initializes */
        loader.show();
        content.hide();

        /* Start the app initialization procedure */
        App.init();
    });
});

/*
** Application object to handle smart contract executions.
*/
App = {
    /* Define parameters to store contract information */
    web3Provider: null,
    contracts: {},
    contractAddr: '0x0',

    /* App initialization function */
    init: function() {
        console.log("Init Started.");

        return App.initWeb3();
    },

    /* Initialize Web3, used for JS interaction with contract */
    initWeb3: function() {
        console.log("initWeb3 Started.");

        /* Check if a web3 instance can be provided by Meta Mask. */
        if (typeof web3 !== 'undefined') {
            console.log("Connected to MetaMask");
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            console.log("Can't connect to MetaMask");
            /* Specify default isntance (Ganache) if no web3 instance provided. */
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    /* Initialize the contract to be used in the web application */
    initContract: function() {
        console.log("initContract Started.");

        $.getJSON("AssetManagement.json", function(AssetManagement) {
            /* Instantiate a new truffle contract from the artifact. */
            App.contracts.AssetManagement = TruffleContract(AssetManagement);
            /* Connect provider to interact with contract. */
            App.contracts.AssetManagement.setProvider(App.web3Provider);
            
            App.EventListener();

            /* Render HTML page with data retrieved from contract */
            return App.renderData();
        });
    },

    /* Listen for events on the blockchain and notify the client application */
    EventListener: function() {
        App.contracts.AssetManagement.deployed().then(function(i) {
            i.accountCreatedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(err, evt) {
                console.log("Account Created Event Triggered", evt)
                App.renderData();
            });
            i.assemblyCreatedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(err, evt) {
                console.log("Assembly Created Event Triggered", evt)
                App.renderData();
            });
            i.partCreatedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(err, evt) {
                console.log("Part Created Event Triggered", evt)
                App.renderData();
            });
        });
    },

    /* Read data from the smart contract and render the web app */
    renderData: function() {
        console.log("renderData Started.");

        var AssetMgtInstance;

        /* Read contract data and render on HTML page */
        try {
            App.contracts.AssetManagement.deployed().then(function(i) {
                /* Initialize contract instance. RETURN: Contract addr */
                AssetMgtInstance = i;
                return AssetMgtInstance.address;

            }).then(function(Addr) {
                /* Initialize contract addr. RETURN: Num of Accounts */
                App.contractAddr = Addr;
                $('#addr').html(App.contractAddr);
                return AssetMgtInstance.accountsCount();
    
            }).then(function(accountsCount) {
                /* Initialize Num of Accounts. RETURN: Num of Assemblies */
                $('#NumOfAccounts').html(Number(accountsCount));
                return AssetMgtInstance.assemblyCount();
    
            }).then(function(assemblyCount) {
                /* Initialize Num of Assemblies. RETURN: Num of Parts */
                $('#NumOfAssemblies').html(Number(assemblyCount));
                return AssetMgtInstance.partsCount();
    
            }).then(function(partsCount) {
                /* Initialize Num of Parts. Hide loader and show all HTML content */
                $('#NumOfParts').html(Number(partsCount));
                
                loader.hide();
                content.show();
            }).catch(function(err) {
                console.log(err);
            });
        } catch (err) {
            console.log("Contract doesn't exist.");
            console.log(err);
        }
    },

    /* Get list of accounts and append to table */
    getAccounts: function() {
        console.log("Getting Accounts...");

        /* Define table column headers */
        var colHeader = "<tr><th>Account Number</th><th>Account Name</th><th>Account Desc</th><th>Address</th><th>State</th></tr>";
        /* Clear and append new column header */
        datatableHeader.empty();
        datatableHeader.append(colHeader);

        /* Retrieve data from smart contract and append to HTML */
        App.appendData("account");
        
        loader.hide();
        content.show();
    },

    /* Get list of assemblies and append to table */
    getAssemblies: function() {
        console.log("Getting Assemblies...");

        /* Define table column headers */
        var colHeader = "<tr><th>Assembly Number</th><th>Name</th><th>Description</th><th>Manufacturer</th></tr>";
        /* Clear and append new column header */
        datatableHeader.empty();
        datatableHeader.append(colHeader);

        /* Retrieve data from smart contract and append to HTML */
        App.appendData("assembly");
    },

    /* Get list of parts and append to table */
    getParts: function() {
        console.log("Getting Parts...");

        /* Define table column headers */
        var colHeader = "<tr><th>Part Number</th><th>Part Name</th><th>Description</th><th>Manufacturer</th></tr>";
        /* Clear and append new column header */
        datatableHeader.empty();
        datatableHeader.append(colHeader);

        /* Retrieve data from smart contract and append to HTML */
        App.appendData("part");
    },

    /* Read asset data from blockchain and append it to the datatables */
    appendData: function(type) {
        console.log("Appending Data...");

        /* Empty the data tables */
        datatableResults.empty();

        /* Get smart contract instance */
        App.contracts.AssetManagement.deployed().then(function(i) {
            contractInstance = i;
            
            /* Read number of assets in the blockchain */
            if (type === "account") {
                return contractInstance.accountsCount();
            } else if (type === "assembly") {
                return contractInstance.assemblyCount();
            } else if (type === "part") {
                return contractInstance.partsCount();
            } else {
                console.log("Unknown type, cannot append data.");
            }
        }).then(function(cnt) {
            for (var i = 1; i <= cnt; i++) {
                var _index = i;
                /* For each asset in the blockchain, read the data and append to table */
                if (type === "account") {
                    contractInstance.account_store(_index).then(function(account) {
                        var accNum = account[0];
                        var accName = account[1];
                        var accDesc = account[2];
                        var accAddr = account[3];
                        var state = account[4];
    
                        /* Append new data rows for parts */
                        var dataRow = 
                            "<tr> \
                                <td><a style=\"cursor: pointer;\" onclick=\"App.printData(" + accNum + ", 'account')\">" + accNum + "</a></td> \
                                <td>" + accName + "</td> \
                                <td>" + accDesc + "</td> \
                                <td>" + accAddr + "</td> \
                                <td>" + state + "</td> \
                            </tr>";
                        datatableResults.append(dataRow);
                    });
                } else if (type === "assembly") {
                    contractInstance.assembly_store(_index).then(function(assembly) {
                        var aNum = assembly[0];
                        var aName = assembly[1];
                        var aDesc = assembly[2];
                        var aManuf = assembly[3];
    
                        /* Append new data rows for parts */
                        var dataRow = 
                            "<tr> \
                                <td><a style=\"cursor: pointer;\" onclick=\"App.printData(" + aNum + ", 'assembly')\">" + aNum + "</a></td> \
                                <td>" + aName + "</td> \
                                <td>" + aDesc + "</td> \
                                <td>" + aManuf + "</td> \
                            </tr>";
                        datatableResults.append(dataRow);
                    });
                } else if (type === "part") {
                    contractInstance.part_store(_index).then(function(part) {
                        
                        var pNum = part[0];
                        var pName = part[1];
                        var pDesc = part[2];
                        var pManuf = part[3];
                        
                        /* Append new data rows for parts */
                        var dataRow = 
                            "<tr> \
                                <td><a style=\"cursor: pointer;\" onclick=\"App.printData(" + pNum + ", 'part')\">" + pNum + "</a></td> \
                                <td>" + pName + "</td> \
                                <td>" + pDesc + "</td> \
                                <td>" + pManuf + "</td> \
                            </tr>";
                        datatableResults.append(dataRow);
                    });
                }
            }
        });
    },

    /* Submit 'createAccount' transaction to the blockchain */
    createAccount: function() {
        console.log("Creating Account...");

        /* Get DOM elements */
        var name = document.getElementById("account_name").value;
        var desc = document.getElementById("account_desc").value;
        var addr = document.getElementById("account_addr").value;
        var state = document.getElementById("account_state").value;
        
        /* Clear Form */
        document.getElementById("account_name").value = "";
        document.getElementById("account_desc").value = "";
        document.getElementById("account_addr").value = "";
        document.getElementById("account_state").value = "";

        /* Verify no empty fields and submit to blockchain */
        if (name === "" || desc === "" || addr === "" || state === "") {
            alert("Check empty fields.");
        } else {
            /* Create new Account on blockchain */
            App.contracts.AssetManagement.deployed().then(function(contractInstance) {
                return contractInstance.createAccount(name, desc, addr, state);
            });
        }
        App.getAccounts();
    },

    /* Submit 'createAssembly' transaction to the blockchain */
    createAssembly: function() {
        console.log("Creating Assembly...");

        var partList = [];
        $("input:checkbox[name=part]:checked").each(function() {
            partList.push($(this).val());
        });

        /* Get DOM elements */
        var name = document.getElementById("assem_name").value;
        var desc = document.getElementById("assem_desc").value;
        var manufacturer = document.getElementById("assem_manuf").value;
        
        /* Verify no empty fields and submit to blockchain */
        if (name === "" || desc === "" || manufacturer === "" || partList === "") {
            alert("Check empty fields.");
        } else {
            /* Create new Assembly on blockchain */
            App.contracts.AssetManagement.deployed().then(function(contractInstance) {
                return contractInstance.createAssembly(name, desc, manufacturer, partList);
            });
        }

        /* Clear Form */
        document.getElementById("assem_name").value = "";
        document.getElementById("assem_desc").value = "";
        document.getElementById("assem_manuf").value = "";
    },

    /* Submit 'createPart' transaction to the blockchain */
    createPart: function() {
        console.log("Creating Part...");

        /* Get DOM elements */
        var name = document.getElementById("part_name").value;
        var desc = document.getElementById("part_desc").value;
        var manufacturer = document.getElementById("part_manuf").value;
        
        /* Verify no empty fields and submit to blockchain */
        if (name === "" || desc === "" || manufacturer === "") {
            alert("Check empty fields.");
        } else {
            /* Create new Part on blockchain */
            App.contracts.AssetManagement.deployed().then(function(contractInstance) {
                return contractInstance.createPart(name, desc, manufacturer);
            });
        }

        /* Clear Form */
        document.getElementById("part_name").value = "";
        document.getElementById("part_desc").value = "";
        document.getElementById("part_manuf").value = "";
    },

    /* Submit 'updatePartOwnership' transaction to the blockchain */
    updatePartOwnership: function() {
        
        /* Get DOM elements */
        var part_num = document.getElementById("part_num").value;
        var new_owner = document.getElementById("new_owner").value;
        console.log("Updating ownership for part: " + part_num);

        /* Check for empty fields */
        if (part_num === "" || new_owner === "") {
            alert("Check empty fields.");
        } else {
            /* Verify the part exists */
            App.contracts.AssetManagement.deployed().then(function(contractInstance) {
                return contractInstance.part_store(part_num)
            }).then(function(part){
                if(part[1] !== "") {
                    /* Clear Form */
                    document.getElementById("part_num").value = "";
                    document.getElementById("new_owner").value = "";

                    return contractInstance.updatePartOwner(part_num, new_owner);
                } else {
                    alert("Invalid Part Number");
                }
            });
        }
    },

    /* Print data in an alert pop-up for more information on assets */
    printData: function (_id, _type) {
        var msg;

        /* Get contract instance */
        App.contracts.AssetManagement.deployed().then(function(contractInstance) {
            
            if (_type === "account") {
                return contractInstance.account_store(_id);
            } else if (_type === "assembly") {
                return contractInstance.assembly_store(_id);
            } else if (_type === "part") {
                return contractInstance.part_store(_id);
            }
        }).then(function(result) {

            /* Print asset information in an alert pop up */
            msg = "Blockchain Asset Information: \n\n";
            if (_type === "account") {
                msg += "Account Number: " + result[0] + 
                "\nAccount Name: " + result[1] + 
                "\nAccount Description: " + result[2] + 
                "\nAccount Address: " + result[3] + 
                "\nAccount State: " + result[4];
                alert(msg);
            } else if (_type === "assembly") {
                msg += "Assembly Number: " + result[0] + 
                        "\nAssembly Name: " + result[1] + 
                        "\nAssembly Description: " + result[2] + 
                        "\nAssembly Manufacturer: " + result[3];
                contractInstance.getAssemblyPartList(_id).then(function(list) {
                    msg += "\nPart List: " + list;
                    alert(msg);
                });
            } else if (_type === "part") {
                msg += "Part Number: " + result[0] + 
                        "\nPart Name: " + result[1] + 
                        "\nPart Description: " + result[2] + 
                        "\nPart Manufacturer: " + result[3];
                contractInstance.getCrntPartOwner(_id).then(function(owner) {
                    msg += "\nCurrent Owner: " + owner;

                    contractInstance.getPartOwners(_id).then(function(list) {
                        msg += "\nPrevious Owners: " + list;
                        alert(msg);
                    });
                });
            }
        });
    }
};
