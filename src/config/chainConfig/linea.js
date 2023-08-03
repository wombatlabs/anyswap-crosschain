import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const LINEA_MAIN_CHAINID = 59144
export const LINEA_MAINNET = getLocalRPC(LINEA_MAIN_CHAINID, 'https://linea-mainnet.infura.io/v3/')
export const LINEA_MAIN_EXPLORER = 'https://lineascan.build'

export const tokenList = []
export const testTokenList = []

const symbol = 'ETH'

const bridgeToken = {
  [VERSION.V1]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
  },
  [VERSION.V5]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
  [VERSION.V7]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
}

export default {
  [LINEA_MAIN_CHAINID]: {
    wrappedToken: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    tokenListUrl: tokenListUrl + LINEA_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0x5D155A04De5bB501f022E44AEd7FF23A6Ff2C1F1',
    v1FactoryToken: '',
    v2FactoryToken: '',
    timelock: '',
    nodeRpc: LINEA_MAINNET,
    nodeRpcList: [LINEA_MAINNET],
    chainID: LINEA_MAIN_CHAINID,
    lookHash: LINEA_MAIN_EXPLORER + '/tx/',
    lookAddr: LINEA_MAIN_EXPLORER + '/address/',
    lookBlock: LINEA_MAIN_EXPLORER + '/block/',
    explorer: LINEA_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Linea',
    networkName: 'LINEA Mainnet',
    networkLogo: 'LINEA',
    type: 'main',
    label: LINEA_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'ETH',
    anyToken: ''
  },
}
