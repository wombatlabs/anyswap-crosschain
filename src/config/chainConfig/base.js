import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const BASE_MAIN_CHAINID = 8453
export const BASE_MAINNET = getLocalRPC(BASE_MAIN_CHAINID, 'https://base.rpc.thirdweb.com/')
export const BASE_MAIN_EXPLORER = 'https://basescan.org/'

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
  [BASE_MAIN_CHAINID]: {
    wrappedToken: '0x4200000000000000000000000000000000000006',
    tokenListUrl: tokenListUrl + BASE_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0xa53685b101644Bcc36723fe58606B8981E45D13B',
    v1FactoryToken: '',
    v2FactoryToken: '',
    timelock: '',
    nodeRpc: BASE_MAINNET,
    nodeRpcList: [BASE_MAINNET],
    chainID: BASE_MAIN_CHAINID,
    lookHash: BASE_MAIN_EXPLORER + '/tx/',
    lookAddr: BASE_MAIN_EXPLORER + '/address/',
    lookBlock: BASE_MAIN_EXPLORER + '/block/',
    explorer: BASE_MAIN_EXPLORER,
    symbol: symbol,
    name: 'ethereum',
    networkName: 'BASE Mainnet',
    networkLogo: 'BASE',
    type: 'main',
    label: BASE_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'ETH',
    anyToken: ''
  },
}
