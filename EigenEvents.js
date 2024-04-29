import Web3 from "web3"
import AVSDirectoryABI from "./abi/AVSDirectoryABI.json" assert { type: "json" }
import DelegationManagerABI from "./abi/DelegationManagerABI.json" assert { type: "json" }
import StrategyManagerABI from "./abi/StrategyManagerABI.json" assert { type: "json" }
import EigenPodManagerABI from "./abi/EigenPodManagerABI.json" assert { type: "json" }

class EigenEvents {
    /**
     * Initializes a new instance of the EigenEvents library.
     * @param {string} providerUrl - The URL of the Ethereum provider.
     * @param {string} [connectionType="http"] - The type of connection to use (http or ws).
     */
    constructor(providerUrl, connectionType = "http") {
        this.web3 = new Web3(
            connectionType === "ws"
                ? new Web3.providers.WebsocketProvider(providerUrl)
                : new Web3(providerUrl),
        )
        this.contracts = this._loadContracts()
    }

    /*
    ===========================================
    Use these functions to query for event data
    ===========================================
    */

    /**
     * All functions are have the same params & return structure
     * @param {number|string} fromBlock - Starting block number to fetch events.
     * @param {number|string} toBlock - Ending block number to fetch events.
     * @param {boolean} realTime - Whether to listen to events in real-time.
     * @param {Function|null} callback - Optional callback to handle the events.
     * @returns {Promise|undefined} Returns a promise if fetching past events, otherwise undefined.
     */

    /**
     * ---------------------------------
     * Events from DelegationManager.sol
     * ---------------------------------
     */
    async getOperatorRegisteredEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "OperatorRegistered",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getOperatorMetadataURIUpdatedEvents(
        fromBlock = null,
        toBlock = null,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "DelegationManager",
            "OperatorMetadataURIUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getMinWithdrawalDelayBlocksSetEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "DelegationManager",
            "MinWithdrawalDelayBlocksSet",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getOperatorDetailsModifiedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "OperatorDetailsModified",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getOperatorSharesDecreasedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "OperatorSharesDecreased",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getOperatorSharesIncreasedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "OperatorSharesIncreased",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStakerDelegatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "StakerDelegated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStakerForceUndelegatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "StakerForceUndelegated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStakerUndelegatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "StakerUndelegated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStrategyWithdrawalDelayBlocksSetEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "DelegationManager",
            "StrategyWithdrawalDelayBlocksSet",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getWithdrawalCompletedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "WithdrawalCompleted",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getWithdrawalMigratedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "WithdrawalMigrated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getWithdrawalQueuedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "DelegationManager",
            "WithdrawalQueued",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * -------------------------------
     * Events from StrategyManager.sol
     * -------------------------------
     */
    async getDepositEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents("StrategyManager", "Deposit", fromBlock, toBlock, realTime, callback)
    }

    async getOwnershipTransferredEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "StrategyManager",
            "OwnershipTransferred",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStrategyAddedToDepositWhitelistEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "StrategyManager",
            "StrategyAddedToDepositWhitelist",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStrategyRemovedFromDepositWhitelistEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "StrategyManager",
            "StrategyRemovedFromDepositWhitelist",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getStrategyWhitelisterChangedEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "StrategyManager",
            "StrategyWhitelisterChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getUpdatedThirdPartyTransfersForbiddenEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "StrategyManager",
            "UpdatedThirdPartyTransfersForbidden",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * -------------------------------
     * Events from EigenPodManager.sol
     * -------------------------------
     */
    async getBeaconChainETHDepositedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "EigenPodManager",
            "BeaconChainETHDeposited",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getBeaconChainETHWithdrawalCompletedEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "EigenPodManager",
            "BeaconChainETHWithdrawalCompleted",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getBeaconOracleUpdatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "EigenPodManager",
            "BeaconOracleUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getPodDeployedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "EigenPodManager",
            "PodDeployed",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getPodSharesUpdatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "EigenPodManager",
            "PodSharesUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * ----------------------------
     * Events from AVSDirectory.sol
     * ----------------------------
     */
    async getOperatorAVSRegistrationStatusUpdatedEvents(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "AVSDirectory",
            "OperatorAVSRegistrationStatusUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getAVSMetadataURIUpdatedEvents(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "AVSDirectory",
            "AVSMetadataURIUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /*
     ==================
     Internal functions
     ==================
    */

    /**
     * Internal method to load smart contracts using their ABIs and addresses.
     * @returns {Object} A dictionary of contract instances.
     */
    _loadContracts() {
        return {
            DelegationManager: new this.web3.eth.Contract(
                DelegationManagerABI,
                "0x39053D51B77DC0d36036Fc1fCc8Cb819df8Ef37A",
            ),
            AVSDirectory: new this.web3.eth.Contract(
                AVSDirectoryABI,
                "0x135DDa560e946695d6f155dACaFC6f1F25C1F5AF",
            ),
            StrategyManager: new this.web3.eth.Contract(
                StrategyManagerABI,
                "0x858646372CC42E1A627fcE94aa7A7033e7CF075A",
            ),
            EigenPodManager: new this.web3.eth.Contract(
                EigenPodManagerABI,
                "0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338",
            ),
        }
    }

    /**
     * Fetches or listens for events depending on the realTime parameter.
     * @param {string} contractName - Name of the contract.
     * @param {string} eventName - Name of the event.
     * @param {number|string} fromBlock - The block number to start fetching events from.
     * @param {number|string} toBlock - The block number to stop fetching events at.
     * @param {boolean} realTime - Whether to listen to events in real-time.
     * @param {Function|null} callback - Optional callback to handle the events.
     * @returns {Promise|undefined} Returns a promise if fetching past events, otherwise undefined.
     */
    async getEvents(
        contractName,
        eventName,
        fromBlock = 19492759,
        toBlock = "latest",
        realTime = false,
        callback = null,
    ) {
        if (realTime) {
            this._listenToEvents(contractName, eventName, callback)
        } else {
            return this._fetchPastEvents(contractName, eventName, fromBlock, toBlock, callback)
        }
    }

    /**
     * Internal method to fetch past events from a specified contract.
     * @param {string} contractName - The name of the contract.
     * @param {string} eventName - The event name.
     * @param {number|string} fromBlock - Starting block number to fetch events.
     * @param {number|string} toBlock - Ending block number to fetch events.
     * @param {Function|null} callback - Optional callback to process each event.
     * @returns {Promise<Array>} Returns a promise that resolves with an array of formatted event data.
     */
    async _fetchPastEvents(contractName, eventName, fromBlock, toBlock, callback) {
        const contract = this.contracts[contractName]
        const events = await contract.getPastEvents(eventName, { fromBlock, toBlock })
        if (callback) {
            return Promise.all(
                events.map((event) =>
                    callback(this._formatEventOutput(event, contract, eventName)),
                ),
            )
        } else {
            return Promise.all(
                events.map((event) => this._formatEventOutput(event, contract, eventName)),
            )
        }
    }

    /**
     * Internal method to listen to real-time events from a specified contract.
     * @param {string} contractName - The name of the contract.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function|null} callback - Callback to handle the event data.
     * @returns {Promise} Returns a subscription object for managing the real-time event listening.
     */
    async _listenToEvents(contractName, eventName, callback) {
        const contract = this.contracts[contractName]
        const eventSignature = this._getEventSignature(contract, eventName)

        if (!eventSignature) {
            console.error(`Event signature for ${eventName} not found in contract ${contractName}`)
            return
        }

        try {
            const subscription = await this.web3.eth.subscribe("logs", {
                address: contract.options.address,
                topics: [eventSignature],
            })

            subscription.on("data", async (event) => {
                const formattedData = await this._formatEventOutput(event, contract, eventName)
                if (callback) {
                    callback(formattedData)
                } else {
                    console.log(formattedData)
                }
            })

            return subscription
        } catch (error) {
            console.error("Error subscribing to events:", error)
        }
    }

    /**
     * Internal method to format the output of an event log.
     * @param {Object} event - The event log object.
     * @param {Object} contract - The contract instance from which the event originated.
     * @param {string} eventName - The name of the event.
     * @returns {Object} Returns a formatted event object including decoded parameters and a custom message.
     */
    async _formatEventOutput(event, contract, eventName) {
        if (!contract || !contract.options || !contract.options.jsonInterface) {
            console.error("Invalid contract object:", contract)
            throw new Error("The contract object is not properly initialized.")
        }

        const eventABI = contract.options.jsonInterface.find(
            (e) => e.type === "event" && e.name === eventName,
        )

        if (!eventABI) {
            console.error(`No ABI entry found for event name: ${eventName}`)
            return
        }

        const decodedParams = this.web3.eth.abi.decodeLog(
            eventABI.inputs,
            event.data,
            event.topics.slice(1),
        )

        let returnValues = {}
        eventABI.inputs.forEach((input) => {
            if (!input.name) return

            if (input.type.includes("tuple")) {
                returnValues[input.name] = this._decodeTuple(
                    decodedParams[input.name],
                    input.components,
                )
            } else {
                returnValues[input.name] = decodedParams[input.name]
            }
        })

        const messageTemplate = this._getMessageTemplate(eventName)
        const message = messageTemplate ? messageTemplate(returnValues) : ""

        return {
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            event: eventABI.name,
            returnValues: returnValues,
            message: message,
        }
    }

    /**
     * Internal method to decode tuple parameters from event logs.
     * @param {Object} tupleData - The raw tuple data from the log.
     * @param {Array} components - The components of the tuple as described in the ABI.
     * @returns {Object} Returns a decoded tuple object.
     */
    _decodeTuple(tupleData, components) {
        let result = {}
        components.forEach((component) => {
            let value = tupleData[component.name]
            if (component.type.includes("tuple")) {
                value = this._decodeTuple(value, component.components)
            }
            result[component.name] = value
        })
        return result
    }

    /**
     * Internal method to retrieve a message template for a specific event.
     * @param {string} eventName - The name of the event.
     * @returns {Function} Returns a function that formats the event's parameters into a string message.
     */
    _getMessageTemplate(eventName) {
        const strategyMapping = {
            "0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc": "cbETH",
            "0x93c4b944D05dfe6df7645A86cd2206016c51564D": "stETH",
            "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2": "rETH",
            "0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d": "ETHx",
            "0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff": "ankrETH",
            "0xa4C637e0F704745D182e4D38cAb7E7485321d059": "OETH",
            "0x57ba429517c3473B6d34CA9aCd56c0e735b94c02": "osETH",
            "0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6": "swETH",
            "0x7CA911E83dabf90C90dD3De5411a10F1A6112184": "wBETH",
            "0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6": "sfrxETH",
            "0xAe60d8180437b5C34bB956822ac2710972584473": "lsETH",
            "0x298aFB19A105D59E74658C4C334Ff360BadE6dd2": "mETH",
            "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0": "Beacon Chain ETH",
        }

        const tokenMapping = {
            "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704": "cbETH",
            "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": "stETH",
            "0xae78736cd615f374d3085123a210448e74fc6393": "rETH",
            "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b": "ETHx",
            "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb": "ankrETH",
            "0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3": "OETH",
            "0xf1c9acdc66974dfb6decb12aa385b9cd01190e38": "osETH",
            "0xf951E335afb289353dc249e82926178EaC7DEd78": "swETH",
            "0xa2e3356610840701bdf5611a53974510ae27e2e1": "wBETH",
            "0xac3e018457b222d93114458476f3e3416abbe38f": "sfrxETH",
            "0x8c1BEd5b9a0928467c9B1341Da1D7BD5e10b6549": "lsETH",
            "0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa": "mETH",
            "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0": "Beacon Chain ETH",
        }

        const templates = {
            // Events from DelegationManager.sol
            OperatorRegistered: (params) => `${params.operator} registered as an Operator.`,
            OperatorMetadataURIUpdated: (params) =>
                `${params.operator} (Operator) updated their metadata to ${params.metadataURI}.`,
            OperatorMetadataURIUpdated: (params) =>
                `${params.operator} updated their metadata URI to ${params.metadataURI}.`,
            MinWithdrawalDelayBlocksSet: (params) =>
                `MinWithdrawalDelayBlocks set from ${params.previousMinWithdrawalDelayBlocks} to ${params.newMinWithdrawalDelayBlocks}.`,
            OperatorDetailsModified: (params) => `${params.operator} modified their details.`,
            OperatorSharesDecreased: (params) => {
                const tokenName = strategyMapping[params.strategy] || params.strategy
                return `${params.operator} shares in ${tokenName} decreased to ${params.shares} due to undelegation from ${params.staker}`
            },
            OperatorSharesIncreased: (params) => {
                const tokenName = strategyMapping[params.strategy] || params.strategy
                return `${params.operator} shares in ${tokenName} increased to ${params.shares} due to delegation from ${params.staker}`
            },
            StakerDelegated: (params) => `${params.staker} delegated stake to ${params.operator}`,
            StakerForceUndelegated: (params) =>
                `${params.staker} has been forcibly undelegated by ${params.operator}.`,
            StakerUndelegated: (params) =>
                `${params.staker} undelegated stake from ${params.operator}`,
            StrategyWithdrawalDelayBlocksSet: (params) => {
                const tokenName = strategyMapping[params.strategy] || params.strategy
                return `WithdrawalDelayBlocks for ${tokenName} changed from ${params.previousWithdrawalDelayBlocks} to ${params.newWithdrawalDelayBlocks}.`
            },
            WithdrawalCompleted: (params) => `Withdrawal completed: ${params.withdrawalRoot}`,
            WithdrawalMigrated: (params) =>
                `Withdrawal migrated from ${params.oldWithdrawalRoot} to ${params.newWithdrawalRoot}.`,
            WithdrawalQueued: (params) =>
                `Withdrawal from ${params.withdrawal.staker} to ${params.withdrawal.withdrawer}`,

            // Events from StrategyManager.sol
            // TODO: 4 more events from this contract
            Deposit: (params) => {
                const tokenName = tokenMapping[params.token] || params.token
                return `${params.staker} deposited ${tokenName} for ${params.shares} shares`
            },
            OwnershipTransferred: (params) =>
                `Ownership of StrategyManager.sol transferred from ${params.previousOwner} to ${params.newOwner}`,

            // Events from EigenPodManager.sol
            BeaconChainETHDeposited: (params) =>
                `${params.podOwner} deposited Beacon Chain ETH of amount ${params.amount}`,
            BeaconChainETHWithdrawalCompleted: (params) =>
                `${params.podOwner} Beacon Chain ETH of amount ${params.amount} completed`,
            BeaconOracleUpdated: (params) =>
                `Beacon Chain Oracle updated to ${params.newOracleAddress}`,
            PodDeployed: (params) =>
                `New EigenPod deployed by ${params.podOwner} at ${params.eigenPod}`,
            PodSharesUpdated: (params) =>
                `EigenPod shares of ${params.podOwner} changed by ${params.sharesDelta}`,

            // Events from AVSDirectory.sol
            OperatorAVSRegistrationStatusUpdated: (params) =>
                `Operator ${params.operator} updated registration status with AVS ${params.avs}`, // add what it changed to
            AVSMetadataURIUpdated: (params) =>
                `${params.avs} (AVS) updated their metadata to ${params.metadataURI}.`,
        }
        return templates[eventName]
    }

    /**
     * Internal method to retreive signature of an event from its contract ABI.
     * @param {Object} contract
     * @param {String} eventName
     * @returns
     */
    _getEventSignature(contract, eventName) {
        const eventABI = contract.options.jsonInterface.find(
            (e) => e.name === eventName && e.type === "event",
        )
        if (!eventABI) return null

        const signature = `${eventName}(${eventABI.inputs.map((input) => input.type).join(",")})`
        return this.web3.utils.sha3(signature)
    }
}

export default EigenEvents
