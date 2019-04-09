### Abstract:
From Supply Chain Management point of view planning, executing, and delivering products requires a lot of time and uses a lot of company resources. Block chain technology combines transparency and security to increase efficiency and reliability. With supply chain, it is important to track each and every product and activity throughout the entire process. Block chain will help automotive suppliers track their product from location to location throughout the entire manufacturing and delivery process. It is a perfect tool to record various data like asset part numbers, inventory, location, accounts, product owners or manufacturers, etc. Block chain can also be used to link various products with serial numbers and barcodes for better tracking. Using this new technology, a prototype application will be developed to simulate some of the basic tasks involved in Supply Chain Management.

## Title:
Asset Management System using Blockchain Smart-Contract Technology

### Organization Description:
Company A. Group is a top tier automotive supplier that delivers Electronic Power Steering units to various Original Equipment Manufacturers (OEMs) such as Ford, GM, and Chrysler. They manufacture different parts at different technical center locations around United States. Their Supply Chain Management division is looking to improve the productivity, tracking, and reliability of their products throughout their entire process. To do so, a prototype has been developed using blockchain smart-contract technology to do the part tracking for them.

### Problem Description:
The current Supply Chain process involves using resources to monitor the parts throughout the manufacturing process. The resources are responsible for assigning part numbers to each manufactured part, entering each part into the system, then updating them throughout the life of the part until it is assembled and shipped to customers.
There are a number of things wrong with this current process. Using resources for some of these simple tasks can become very costly. Having an employee input all of the assets into the company database can also be prone to human errors. Human errors will cause misleading or invalid information entering the database making monitoring and tracking these parts extremely difficult. Which brings this to the next point, security and reliability. It is very important to have accurate, untampered data in the company databases. Security threats or breaches can be very hazardous to the company and can cause severe damages. Data breaches, invalid or tampered data, and general database maintenance can cause downtime where management has no access to this data making quick split decision difficult. That is why it is also important to have this data always available and accurate.

### Organizational Sponsors:
Using my experience and knowledge is Electronic Power Steering systems and its development I have come up with an alias for my company called ‘A. Group’. A. Group is an automotive supplier that manufactures the same parts my current employer does. Using their model and manufacturing process I have been able to isolate common Supply Chain issues I have heard/seen while working for this company. I have done research on blockchain technology to come up with ways to fix those problems and mitigate risk.

### System Capabilities:
The blockchain technology was using to solve these problems due to the nature of its functionality. Most blockchains do not have a central database where data is stored and retrieved from. Instead, it is run by multiple nodes in different locations. This is great for network attacks since to take down the network, one will need to stop all nodes in the blockchain at the same time. This prototype was built on the Ethereum blockchain. This particular blockchain can store pieces of code called smart contracts. Smart contracts are small programs which can be used to store data and interact with the blockchain. 
Using it’s smart-contract technology, we have built a prototype contract on the Ethereum network for asset management. This contract has the capabilities of creating new accounts, new manufactured parts, and new assemblies (collection of parts put together) by sending transactions to the network to do these things. All of this data is then created and stored on the blockchain. Blockchains are immutable so any data created cannot be modified. The concept here is to have assembly machines in manufacturing plant automatically submit transactions to this smart contract when new parts are created or shipped.
With this smart contract in place, a client application can be created to read data from the blockchain and monitor in real-time which parts are created, how many parts exists, where these parts are, and so on.

### Business Benefits:
There are a lot of technical benefits to this concept, but there are a lot of business benefits as well. With the data being available at any time, management can make better business decisions from the data stored on the block chain. Data analytics can also play a strong role here. They can also see the up-to-date data instantly with no delay, so they can also make agile business decisions.
The business will become more efficient. Data can be stored and retrieved form the block chain instantly from anywhere around the world. Data will be available to everyone since everything is stored on one ledger and each node has a copy of that ledger.
There are cost benefits to this as well. Eliminating the middlemen who deal with data storage and processing. This will consume less resources and you do not need to trust anyone else. All you need is to trust that the data on the block chain is accurate. The speed and efficiency of the block chain can also help reduce cost.

### Deliverables:
The main purpose of this project was to develop a smart contract that will handle some of the basic tasks for A. Group’s product management. However, an additional (supporting) application was developed to demonstrate how that smart contract can be used. In summary, there will be 3 deliverables as outlined below.

### Truffle Framework
The Truffle Framework allows for easy deployment of smart contracts. This framework provides libraries and functions to your smart contract so that it can be configured, compiled, and migrated to the block chain.

(See Appendix [1]) This framework provides a few supporting files and folders:

* Bin – Smart contract binary and ABI files are placed here.
* Build – Smart contract compiled files are placed here.
* Contracts – Solidity smart contract files. Source code for the smart contract is here.
* Migrations – Scripts to allow Truffle to migrate our smart contract onto the block chain.
* Node_modules – Node files for the client application to interact with the block chain.
* Src – The source code for our client application.
* Test – Several tests written in JavaScript to test our smart contract.
* Package.json, Truffle.js – Configuration files to link our client application with the smart contract.

(See Appendix [2]) Truffle migrations also allows smart contracts to be easily deployed on the block chain. Once the smart contract is deployed, it will return the block chain account address of the smart contract. This address is used to access the smart contract.

(See Appendix [3]) Truffle can also be used to test the smart contract locally before connecting it to any client application. ‘Truffle Console’ is used for this purpose. Here’s I’m accessing the deployed smart contract and creating a new account. Once the account has been created, it’ll return with the transaction information that was sent to the block chain.

### Asset Management Smart Contract
The brains of our prototype. This is the smart contract that will handle the asset management. This piece of code will be deployed to the Ethereum block chain using Truffle and will be available to interact with. 

(See Appendix [4]) Development and Deployment
Smart contract code is compiled using the Solidity compiler (.solc) which generate contract bytecode and ABI (Application Binary Interface). Truffle sends a transaction to the block chain with the bytecode and ABI to deploy the contract. Once it is deployed, you can interact with a specific smart contract by sending transactions to the Ethereum block chain.

This smart contract is broken down into two parts:

1) (See Appendix [5]) Data Structures – Here is the definition for the data that will be stored on the block chain: Account, Assembly, and Part. Each one has its own structure and a mapping to define a list of Accounts, Assemblies, and Parts.

    * Account: account number, account name, account description, account address, and account state.
    * Assembly: Assembly number, assembly name, assembly description, assembly manufacturer, and list of parts associated with that assembly.
    * Part: Part number, part name, part description, part manufacturer, and a list of owners for that part.

2) (See Appendix [6]) Methods – Here is the definitions for how we will be interacting with our smart contract (i.e. creating new objects, writing data, reading data). These define the kind of transactions sent to the block chain that the smart contract can handle.

    * createAccount: Create a new account object on the block chain.
    * createAssembly: Create a new assembly object on the block chain.
    * createPart: Create a new part object on the block chain.
    * updatePartOwner: Change the current owner of a specific part object.
    * getPartOwners: Read all of the owners for a specific part object.
    * getCrntPartOwner: Read the current owner for a specific part object.
    * getAssemblyPartList: Read all of the parts that went into a specific assembly object.

### Web Application
In order to demonstrate how the smart contract, that is deployed to Ethereum blockchain, behaves, a client application was developed. (See Appendix [7]) This client application uses Web3.js framework to interact with the smart contract. The Web3 web application connects to a specific provider which allows it to send transactions to the Ethereum block chain. In this case, MetaMask plugin is used. (See Appendix [8]) MetaMask is a chrome extension that generates an account and connect your browser to an Ethereum node. It handles the processing of transactions for you. The client web application does not interact with the block chain, only MetaMask does.

(See Appendix [9]) The web application is run locally using lite-server. Lite-server boots a local server which will handle the Http GET and POST request automatically (as show in the console log of the screenshot).

(See Appendix [10]) Once the web application is running, it will read the address of the contract that is deployed to the Ethereum block chain as well as the number of assets it currently holds and prints it on the screen. Each time a new asset is created on the block chain, the count will be updated.

(See Appendix [11]) Next is the data table. This table will show the details for all of the assets that are currently stored inside of the smart contract. List can be changed to different assets by selecting the asset on the left. Once an asset is selected, the web application will send a transaction to the block chain to read the data of the asset data structures.

(See Appendix [12]) Lastly, pushing data to the smart contract. Once a function is selected on the left, a form will show up. This form will have inputs for that specific asset. To create an asset, fill out the form and click the ‘Create’ button (See Appendix [13]). Once the create button has been pressed, MetaMask will pop up asking you to approve the transaction that will be sent to the Ethereum blockchain (See Appendix [14]). Once approved, a transaction will be sent to the block chain, and event listener will be triggered to notify the web application there is a new transaction in the smart contract. This will cause the web application to update the numbers and list of data (See Appendix [15]).

### Feasibility Analysis:
In a way this prototype is a concept. There are a lot more moving pieces that is involved with Supply Chain. With the time and deadline that was allocated for the project, it is difficult to implement and demonstrate all of the functionality. To transition this proof of concept to the prototype stage, all of the Supply Chain factors associated within the company needs to be considered. Data on the blockchain should be stored in a way that is fairly similar to how it is currently stored in the databases. This is to mitigate risk of data loss during transition of standard databases to block chain and was not taken into consideration when developing this proof of concept. Transition to this the block chain technology needs to be carefully thought out since any downtime of data access can delay the manufacturing process, delay shipment, and even loss of packages. Developing this smart contract in a way that is very similar to the current process then testing it in parallel will solve a lot of these problems and will point out additional problems that will have to be considered and fixed. Once this smart contract has been developed and tested to the current standard, it can then be rolled out into production.
This was out of scope of this project but how this smart contract will be rolling out into production field for the company is very important and can (at first) cost money and resources for the company. Once the smart contract is fully functional and tested, a management plan will need to be created to roll it out into production. This plan will involve phasing out the old system while phasing in the new system at the same time while taking all risks into consideration.

### Solution Evaluation:
The completed deliverable is a proof of concept but will demonstrate a few things. First it will demonstrate how a block chain functions and how the smart contracts can be implemented to interact with. Before proceeding any further, the company will have to understand this so that they can tailor this technology to the company’s business functions. The proof of concept will also demonstrate how data can be stored from the block chain, how the data can be retrieved, and the reliability of this data. Then to demonstrate simple Supply Chain functions of manufacturing and assembling parts, several functions have been developed. Including creating new accounts, creating new parts, and assembling these parts into new assemblies. Finally, a client web application has been developed to demonstrate all of the functionality of the smart contract by interacting with it behind the scenes.
This proof of concept can help solve some of the common issues A. Group is seeing when it comes to Supply Chain for manufacturing. It will show how easy it is to send data to the block chain and that it can easily be done using assembly machines in manufacturing plants. Once this data is submitted, the concept will then demonstrate how this data can be read, accessed, and interpreted. Because of the nature of block chain technology, this data cannot be changed unless if there’s a function in the smart contract to allow it to do so. With all of this in place, these functions can then be automated to save time and reduce costs.

### Lessons Learned:
While working on this project, I have learned many things. The biggest thing is the inter-workings of a block chain…how the block chain works, how it operates, what you can and cannot do, etc. I have also learned the limitations of this technology at this point in time (see ‘Limitations & Future Work’). Block chain technology is really new and is constantly being updated. It is important to keep up with these changes or else your smart contract code can easily become outdated.
While doing research on Supply Chain Management, I was to get an understanding how Supply Chain works and what it entails. I have also found its limitations and how I can apply the block chain technology to improve Supply Chain and solve its common problems. 

### Limitations & Future Work:
One of the biggest limitation of my work is the block chain that I had to use to develop the proof of concept. Due to the timing constrains, I had to choose a block chain that has matured enough to be able to start developing smart contracts without doing a lot of setup for the block chain itself. Ethereum satisfies this requirement for me, however it is public. It is useful if the data needs to be accessed by multiple companies but it not that useful from within a company. A company needs to be able to store data without it being available to the public. For something like Supply Chain Management, it probably would be best to use a block chain such as Hyper Ledger which allows the deployment of a private block chain for smart contracts and storing data on a private network. This would have involved doing a lot of setup work, that is why Ethereum was used.
Current block chains also have limitations. Not all programming languages are supported for smart contract development. For example, Ethereum uses Solidity. Solidity is a newly developed language that is specific to Ethereum. For a new language, some features that should be standard aren’t available which limits to the kind of algorithms and data structures you can write in your smart contracts. To store data structures in a block chain also involves transactions. Most block chains available now are limited in the number of transactions it can handle without back log. This would not be so much of an issue if a private block chain such as Hyper Ledger was used since one business doesn’t need to be able to handle thousands of transactions per second.
For the future once more functionality is available, this smart contract needs to be rewritten to provide a more suitable data structure for data storage. It also needs to be ported over on a different private block chain so that only the business has access to the data. With more time, additional feature could also be implemented with a better client application for viewing the data, and possibly doing some analytics on that data.


## Appendixes:

[Appendix 1] Screenshot outlining the folder structure of the project.
[Appendix 2] Console log showing Truffle deploying the Asset Management smart contract.
[Appendix 3] Console log showing Truffle executing a transaction on the block chain.
[Appendix 4] Diagram how smart contract are deployed onto Ethereum block chain.
Source: https://www.researchgate.net/figure/The-process-of-smart-contracts-development-deployment-and-interaction_fig3_319249505
[Appendix 5] Screenshot of source code for the asset data structure in the smart contract.
[Appendix 6] Screenshot of source code for the methods of interacting with the smart contract.
[Appendix 7] Diagram of how transactions are handled from Web3 to Ethereum block chain.
Source: https://github.com/ethereumbook/ethereumbook/issues/376
[Appendix 8] MetaMask chrome extension.
[Appendix 9] Lite-server running a local server to host our client web application.
[Appendix 10] Web application reading smart contract address and number of assets it holds.
[Appendix 11] Web application reading asset details from smart contract and displaying in table.
[Appendix 12] Form to create a new asset.
[Appendix 13] Form filled out to create a new account.
[Appendix 14] MetaMask confirming the transaction of form submission. 
[Appendix 15] Web application updated after transaction was submitted to block chain.


