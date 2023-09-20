// @ts-nocheck
import { useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
// import { useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import config from '../../config'
import { useAppState } from '../../state/application/hooks'
import { poolLiquidity } from './actions'
import { getUrlData } from '../../utils/tools/axios'
import { getNodeTotalsupply, getBlandTs } from '../../utils/bridge/getBalanceV2'
import { useActiveWeb3React } from '../../hooks'


export default function Updater(): null {
  const dispatch = useDispatch()
  
  const { apiAddress } = useAppState()
  const getPools = useCallback(() => {
    const url = `${apiAddress}/config`

    getUrlData(url)
      .then(async (tokenList: any) => {
        if (tokenList.msg && tokenList.msg == 'Success' && tokenList.data && tokenList.data.length > 0) {
          const callsByChainId = {}
          const tokensByChainsMap = {}

          tokenList.data.forEach((tokenGroup) => {
            tokenGroup.multichainTokens.forEach((mcToken) => {
              //if (mcToken.chainId != 1229) { /* Dont fork for me without VPN - for dev skip it chain */
                callsByChainId[mcToken.chainId] = callsByChainId[mcToken.chainId] || []
                callsByChainId[mcToken.chainId].push({
                  token: mcToken.anyswapToken.ContractAddress,
                  underlying: mcToken.anyswapToken.Underlying,
                  dec: mcToken.anyswapToken.Decimals
                })

                tokensByChainsMap[`${mcToken.chainId}:${mcToken.anyswapToken.ContractAddress}`] = {
                  name: mcToken.anyswapToken.TokenID,
                  symbol: mcToken.anyswapToken.TokenID,
                  decimals: mcToken.anyswapToken.Decimals,
                  anyToken: mcToken.anyswapToken.ContractAddress,
                  underlying: mcToken.anyswapToken.Underlying
                }
              //}
            })
          })

          const promiseList = Object.keys(callsByChainId).map((chainId) => {
            return new Promise((resolve) => {
              try {
                getBlandTs(callsByChainId[chainId], chainId).then((res: any) => {
                  resolve({
                    chainId,
                    data: res
                  })
                })
              } catch (err) {
                console.log('>>> POOL ERROR', err)
              }
            })
          })
          Promise.all(promiseList).then((res) => {
            const retData = {}
            res.forEach(({ chainId, data }) => {
              retData[chainId] = {}
              Object.keys(data).forEach((anyAddress) => {
                retData[chainId][tokensByChainsMap[`${chainId}:${anyAddress}`].underlying] = {
                  ...tokensByChainsMap[`${chainId}:${anyAddress}`],
                  liquidity: data[anyAddress].wei_ts
                }
              })
            })
            dispatch(poolLiquidity({poolLiquidity: retData}))
          })
        }
      })
      .catch(error => {
        console.log('Pool error', error)
      })
    
    dispatch(poolLiquidity({poolLiquidity: {} }))
  }, [dispatch])

  useInterval(getPools, 1000 * 30)
  return null
}
