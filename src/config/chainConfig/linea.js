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
    wrappedToken: '0x4200000000000000000000000000000000000006',
    tokenListUrl: tokenListUrl + LINEA_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0xa53685b101644Bcc36723fe58606B8981E45D13B',
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
    name: 'ethereum',
    networkName: 'LINEA Mainnet',
    networkLogo: 'LINEA',
    type: 'main',
    label: LINEA_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'ETH',
    anyToken: ''
  },
}