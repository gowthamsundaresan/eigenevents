import Web3 from "web3"
import AVSDirectoryABI from "./abi/AVSDirectoryABI.json" assert { type: "json" }
import DelegationManagerABI from "./abi/DelegationManagerABI.json" assert { type: "json" }
import StrategyManagerABI from "./abi/StrategyManagerABI.json" assert { type: "json" }
import EigenPodManagerABI from "./abi/EigenPodManagerABI.json" assert { type: "json" }

class EigenEvents {
    constructor(rpcUrl) {
        this.web3 = new Web3(rpcUrl)
        this.contracts = this.loadContracts()
    }

    loadContracts() {
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

    async getEvents(contractName, eventName, fromBlock, toBlock) {
        const contract = this.contracts[contractName]
        const events = await contract.getPastEvents(eventName, {
            fromBlock: fromBlock || 0,
            toBlock: toBlock || "latest",
        })

        return events.map((event) => this.formatEventOutput(event, contract))
    }

    formatEventOutput(event, contract) {
        const eventParams = contract.options.jsonInterface.find(
            (e) => e.name === event.event && e.type === "event",
        ).inputs

        const logOutput = Object.entries(event.returnValues)
            .filter(([key, _]) => eventParams.some((param) => param.name === key))
            .map(([key, value]) => {
                const paramDetail = eventParams.find((p) => p.name === key)
                if (paramDetail && paramDetail.type.includes("tuple")) {
                    const tupleOutput = Object.entries(value)
                        .filter(([subKey, _]) =>
                            paramDetail.components.map((c) => c.name).includes(subKey),
                        )
                        .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                        .join(", ")
                    return `${key}: { ${tupleOutput} }`
                } else {
                    return `${key}: ${value}`
                }
            })
            .join(", ")
        return `{ ${logOutput} }`
    }

    // Events from DelegationManager
    async getOperatorRegisteredEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "OperatorRegistered", fromBlock, toBlock)
    }

    async getOperatorMetadataURIUpdatedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "OperatorMetadataURIUpdated", fromBlock, toBlock)
    }

    async getMinWithdrawalDelayBlocksSetEvents(fromBlock, toBlock) {
        return this.getEvents(
            "DelegationManager",
            "MinWithdrawalDelayBlocksSet",
            fromBlock,
            toBlock,
        )
    }

    async getOperatorDetailsModifiedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "OperatorDetailsModified", fromBlock, toBlock)
    }

    async getOperatorSharesDecreasedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "OperatorSharesDecreased", fromBlock, toBlock)
    }

    async getOperatorSharesIncreasedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "OperatorSharesIncreased", fromBlock, toBlock)
    }

    async getStakerDelegatedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "StakerDelegated", fromBlock, toBlock)
    }

    async getStakerForceUndelegatedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "StakerForceUndelegated", fromBlock, toBlock)
    }

    async getStakerUndelegatedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "StakerUndelegated", fromBlock, toBlock)
    }

    async getStrategyWithdrawalDelayBlocksSetEvents(fromBlock, toBlock) {
        return this.getEvents(
            "DelegationManager",
            "StrategyWithdrawalDelayBlocksSet",
            fromBlock,
            toBlock,
        )
    }

    async getWithdrawalCompletedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "WithdrawalCompleted", fromBlock, toBlock)
    }

    async getWithdrawalMigratedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "WithdrawalMigrated", fromBlock, toBlock)
    }

    async getWithdrawalQueuedEvents(fromBlock, toBlock) {
        return this.getEvents("DelegationManager", "WithdrawalQueued", fromBlock, toBlock)
    }

    // Events from StrategyManager
    async getDepositEvents(fromBlock, toBlock) {
        return this.getEvents("StrategyManager", "Deposit", fromBlock, toBlock)
    }

    async getOwnershipTransferredEvents(fromBlock, toBlock) {
        return this.getEvents("StrategyManager", "OwnershipTransferred", fromBlock, toBlock)
    }

    async getStrategyAddedToDepositWhitelistEvents(fromBlock, toBlock) {
        return this.getEvents(
            "StrategyManager",
            "StrategyAddedToDepositWhitelist",
            fromBlock,
            toBlock,
        )
    }

    async getStrategyRemovedFromDepositWhitelistEvents(fromBlock, toBlock) {
        return this.getEvents(
            "StrategyManager",
            "StrategyRemovedFromDepositWhitelist",
            fromBlock,
            toBlock,
        )
    }

    async getStrategyWhitelisterChangedEvents(fromBlock, toBlock) {
        return this.getEvents("StrategyManager", "StrategyWhitelisterChanged", fromBlock, toBlock)
    }

    async getUpdatedThirdPartyTransfersForbiddenEvents(fromBlock, toBlock) {
        return this.getEvents(
            "StrategyManager",
            "UpdatedThirdPartyTransfersForbidden",
            fromBlock,
            toBlock,
        )
    }

    // Events from EigenPodManager
    async getBeaconChainETHDepositedEvents(fromBlock, toBlock) {
        return this.getEvents("EigenPodManager", "BeaconChainETHDeposited", fromBlock, toBlock)
    }

    async getBeaconChainETHWithdrawalCompletedEvents(fromBlock, toBlock) {
        return this.getEvents(
            "EigenPodManager",
            "BeaconChainETHWithdrawalCompleted",
            fromBlock,
            toBlock,
        )
    }

    async getBeaconOracleUpdatedEvents(fromBlock, toBlock) {
        return this.getEvents("EigenPodManager", "BeaconOracleUpdated", fromBlock, toBlock)
    }

    async getPodDeployedEvents(fromBlock, toBlock) {
        return this.getEvents("EigenPodManager", "PodDeployed", fromBlock, toBlock)
    }

    async getPodSharesUpdatedEvents(fromBlock, toBlock) {
        return this.getEvents("EigenPodManager", "PodSharesUpdated", fromBlock, toBlock)
    }

    // Events from AVSDirectory
    async getOperatorAVSRegistrationStatusUpdatedEvents(fromBlock, toBlock) {
        return this.getEvents(
            "AVSDirectory",
            "OperatorAVSRegistrationStatusUpdated",
            fromBlock,
            toBlock,
        )
    }

    async getAVSMetadataURIUpdatedEvents(fromBlock, toBlock) {
        return this.getEvents("AVSDirectory", "AVSMetadataURIUpdated", fromBlock, toBlock)
    }
}

export default EigenEvents
