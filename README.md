# EigenEvents Library Documentation

## Overview

Provides an easy interface for querying historical transaction data or listening to real-time blockchain data from EigenLayer contracts on Ethereum Mainnet based on emitted events from the proxy contracts of DelegationManager, AVSDirectory, StrategyManager, and EigenPodManager. ABIs and contract addresses included.

## Installation

Clone the repo

```bash
git clone https://github.com/gowthamsundaresan/eigenevents.git
cd eigenevents
```

Install the necessary Node.js dependencies:

```bash
yarn install
```

## How to Use

Every event defined in DelegationManager.sol, AVSDirectory.sol, StrategyManager.sol, and EigenPodManager.sol has a corresponding function you can call to query for either historical data or real-time feeds (via websocket).
<br>
Look at the list in the next section to view all callable functions.

### Calling a function

Every function has the same parameters and return data structure.
<br>
Params:

1. fromBlock (number) - Starting block number to fetch events (optional, not required for real-time data)
2. toBlock (number) - Ending block number to fetch events (optional, not required for real-time data)
3. realTime (bool) - Whether to listen to events in real-time
4. callback (function) - (Optional) callback to handle the events (optional, use this to handle real-time data)

### Fetching data in real time

```bash
import EigenEvents from "path/to/EigenEvents.js"

function listenToEvents() {
    const wsURL = "wss://<YOUR_URL>"
    const eigenEventsRealTime = new EigenEvents(
        wsURL,
        "ws",
        handleConnection,
    )

    function handleConnection() {
      console.log("Initializing event listeners...")
      setEventListeners(eigenEventsRealTime)
    }
}

function setEventListeners(eigenEventsRealTime) {
        eigenEventsRealTime.getOperatorRegisteredEvents(null, null, true, handleEventResponse)
        eigenEventsRealTime.getOperatorMetadataURIUpdatedEvents(null, null, true, handleEventResponse)
        console.log("All listeners initialized...")
}

function handleEventResponse(err, data) {
    if (err) {
        console.error("Error receiving data:", err)
    } else {
        console.log(data)
    }
}

listenToEvents()
```

### Fetching historical data

```bash
import EigenEvents from "path/to/EigenEvents.js"

const rpcUrl = "https://<YOUR_URL>"
const eigenEventsHistoric = new EigenEvents(rpcUrl, "http")

const fromBlock = 19492759
const toBlock = 19692759

try {
    console.log("Fetching historical data...")
    const historicalData = await eigenEventsHistoric.getStakerDelegatedEvents(fromBlock, toBlock)
    console.log(historicalData)
} catch (error) {
    console.error("Error fetching events:", error)
}
```

Example outputs:

```bash
{
  transactionHash: '0x57efb8f76321a2a2c5bb4219bef3147593ab177ae067d30b4178114aa7f43e18',
  blockNumber: 19733953n,
  event: 'StakerDelegated',
  returnValues: {
    staker: '0xeeba069d1d131428145c337212E42c9e2f0FCa07',
    operator: '0xDbEd88D83176316fc46797B43aDeE927Dc2ff2F5'
  },
  message: '0xeeba069d1d131428145c337212E42c9e2f0FCa07 delegated stake to 0xDbEd88D83176316fc46797B43aDeE927Dc2ff2F5.'
}
```

```bash
{
  transactionHash: '0xcaac0ff38f399af949517e1d8c32ce9788cfb31fbb29c02f8f30ff03fb557530',
  blockNumber: 19733959n,
  event: 'OperatorMetadataURIUpdated',
  returnValues: {
    operator: '0x3dd86570a944D9fFAaEB0297b8B54531367D7521',
    metadataURI: 'https://raw.githubusercontent.com/GateOmega/eigenlayer-metadata/main/metadata.json'
  },
  message: '0x3dd86570a944D9fFAaEB0297b8B54531367D7521 updated their metadata URI to https://raw.githubusercontent.com/GateOmega/eigenlayer-metadata/main/metadata.json.'
}
```

## Events That Can Be Retrieved

### DelegationManager.sol

| Function and Description                                                                                                                                                                                                                                                                                              | Output Parameters                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`getOperatorRegisteredEvents`**<br/>Emitted when a caller registers as an operator in EigenLayer.                                                                                                                                                                                                                   | `operator: address, operatorDetails: { earningsReceiver: address, delegationApprover: address, stakerOptOutWindowBlocks: uint256 }`                                                  |
| **`getOperatorMetadataURIUpdatedEvents`**<br/>Emitted when an operator updates their metadata URI, typically to reflect changes in operational status or offerings.                                                                                                                                                   | `operator: address, metadataURI: string`                                                                                                                                             |
| **`getMinWithdrawalDelayBlocksSetEvents`**<br/>Emitted when the minimum withdrawal delay blocks are set. This configuration defines the minimum number of blocks that must be waited from the time of queuing a withdrawal to when it can be executed.                                                                | `previousMinWithdrawalDelayBlocks: uint256, newMinWithdrawalDelayBlocks: uint256`                                                                                                    |
| **`getOperatorDetailsModifiedEvents`**<br/>Emitted when an operator's details are modified. This can involve changes to parameters like the earnings receiver or details about the staker's options.                                                                                                                  | `operator: address, newOperatorDetails: { earningsReceiver: address, delegationApprover: address, stakerOptOutWindowBlocks: uint256 }`                                               |
| **`getOperatorSharesDecreasedEvents`**<br/>Emitted when an operator's share count in a strategy is decreased, which typically occurs when a staker undelegates or withdraws their stake.                                                                                                                              | `operator: address, staker: address, strategy: address, shares: uint256`                                                                                                             |
| **`getOperatorSharesIncreasedEvents`**<br/>Emitted when an operator's share count in a strategy is increased. This can happen when a new staker delegates to them, or existing stakes are increased.                                                                                                                  | `operator: address, staker: address, strategy: address, shares: uint256`                                                                                                             |
| **`getStakerDelegatedEvents`**<br/>Emitted when a staker delegates their stake to an operator. This event marks the initiation of the delegation relationship.                                                                                                                                                        | `staker: address, operator: address`                                                                                                                                                 |
| **`getStakerForceUndelegatedEvents`**<br/>Emitted in cases where a staker is forcibly undelegated by an operator or due to other administrative actions. This event is important for audit and tracking purposes to ensure transparency in delegation management.                                                     | `staker: address, operator: address`                                                                                                                                                 |
| **`getStakerUndelegatedEvents`**<br/>Emitted when a staker voluntarily undelegates from an operator. This might occur if a staker decides to withdraw their stake or simply end their delegation agreement.                                                                                                           | `staker: address, operator: address`                                                                                                                                                 |
| **`getStrategyWithdrawalDelayBlocksSetEvents`**<br/>Emitted when the withdrawal delay blocks for a strategy are set or updated. This delay is crucial for security and operational flexibility, allowing operators to prepare for potential liquidity adjustments.                                                    | `strategy: address, previousWithdrawalDelayBlocks: uint256, newWithdrawalDelayBlocks: uint256`                                                                                       |
| **`getWithdrawalCompletedEvents`**<br/>Emitted when a withdrawal process is completed. This finalizes the withdrawal action, transferring the staked assets back to the staker or to a new designated receiver.                                                                                                       | `withdrawalRoot: bytes32`                                                                                                                                                            |
| **`getWithdrawalMigratedEvents`**<br/>Emitted during the migration of a queued withdrawal from one contract to another, particularly in cases of upgrades or changes in contract architecture. This event is critical for ensuring that all stakeholders are aware of the movement and status of pending withdrawals. | `oldWithdrawalRoot: bytes32, newWithdrawalRoot: bytes32`                                                                                                                             |
| **`getWithdrawalQueuedEvents`**<br/>Emitted when a withdrawal is queued, marking the initiation of the withdrawal process. This event is used to track the start of the withdrawal's waiting period, governed by the previously set withdrawal delay blocks.                                                          | `withdrawalRoot: bytes32, withdrawal: { staker: address, delegatedTo: address, withdrawer: address, nonce: uint256, startBlock: uint256, strategies: [address], shares: [uint256] }` |

### StrategyManager.sol

| Function and Description                                                                                                                                                                                                                                                                              | Output Parameters                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **`getDepositEvents`**<br/>Emitted when a deposit is made into a strategy. This event logs the details of the deposit including the staker, the token used, the strategy, and the amount of shares created by the deposit.                                                                            | `staker: address, token: IERC20, strategy: IStrategy, shares: uint256` |
| **`getOwnershipTransferredEvents`**<br/>Emitted when ownership of the contract is transferred. This is a common event in upgradable contracts and ownership models to signify change in control or upgradeability.                                                                                    | `previousOwner: address, newOwner: address`                            |
| **`getStrategyAddedToDepositWhitelistEvents`**<br/>Emitted when a strategy is added to the whitelist that allows deposits. This event is used to log the inclusion of new strategies that users can deposit into, reflecting changes in the contract's operational parameters.                        | `strategy: IStrategy`                                                  |
| **`getStrategyRemovedFromDepositWhitelistEvents`**<br/>Emitted when a strategy is removed from the deposit whitelist. This event logs the removal of strategies from being eligible for deposits, which could be due to various operational or strategic reasons.                                     | `strategy: IStrategy`                                                  |
| **`getStrategyWhitelisterChangedEvents`**<br/>Emitted when the `strategyWhitelister` address is changed. This event reflects a change in the control or administration of strategy whitelisting, which can affect how strategies are managed within the platform.                                     | `oldStrategyWhitelister: address, newStrategyWhitelister: address`     |
| **`getUpdatedThirdPartyTransfersForbiddenEvents`**<br/>Emitted when the `thirdPartyTransfersForbidden` status is updated for a strategy. This event logs changes to the policy regarding third-party transfers, which can affect how shares are managed and withdrawn in the context of the strategy. | `strategy: IStrategy, newValue: bool`                                  |

### EigenPodManager.sol

| Function and Description                                                                                                                                                                                                                                                                                                                                                       | Output Parameters                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| **`getBeaconChainETHDepositedEvents`**<br/>Emitted when ETH is deposited into a Beacon Chain validator through an EigenPod. This event logs the deposit details including the amount of ETH deposited, which is crucial for tracking staking activities and the corresponding changes in the balance of Beacon Chain ETH.                                                      | `podOwner: address, amount: uint256`     |
| **`getBeaconChainETHWithdrawalCompletedEvents`**<br/>Emitted after a withdrawal of ETH from a Beacon Chain validator is completed. This event is crucial for tracking when staked ETH is returned to a pod owner, representing a significant lifecycle event in the staking process.                                                                                           | `podOwner: address, amount: uint256`     |
| **`getBeaconOracleUpdatedEvents`**<br/>Emitted when the Beacon Chain Oracle is updated. This event signifies a change in the oracle address that provides data from the Beacon Chain, which is a critical piece of infrastructure for ensuring the correct operation of the staking logic.                                                                                     | `newOracleAddress: address`              |
| **`getPodDeployedEvents`**<br/>Emitted when a new EigenPod is deployed. This event logs the creation of a new pod, which is a key event in the lifecycle of pod management as it represents the setup of a new entity capable of participating in staking operations on the Beacon Chain.                                                                                      | `podAddress: address, podOwner: address` |
| **`getPodSharesUpdatedEvents`**<br/>Emitted when there is an update to the shares associated with a pod owner. This event is used to log changes in the number of shares a pod owner has, which can affect their participation in staking and the corresponding rewards. Changes in shares can occur due to various actions like stakes, withdrawals, or rewards distribution. | `podOwner: address, sharesDelta: int256` |

### AVSDirectory.sol

| Function and Description                                                                                                                                                                                                                                                                                                                                                                 | Output Parameters                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **`getOperatorAVSRegistrationStatusUpdatedEvents`**<br/>Emitted when an operator's registration status to AVS is updated. This could be due to a new registration or deregistration. The event logs the change and is crucial for tracking the registration lifecycle of operators within the AVS ecosystem, helping to manage and verify operator permissions and statuses effectively. | `operator: address, avs: address, status: OperatorAVSRegistrationStatus` |
| **`getAVSMetadataURIUpdatedEvents`**<br/>Emitted when the metadata URI for an AVS is updated. This event is used to log updates to the metadata associated with an AVS, which can include changes in service descriptions or operational details. This is essential for maintaining current and accessible service information for users of the AVS.                                     | `avs: address, metadataURI: string`                                      |

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repo.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.
