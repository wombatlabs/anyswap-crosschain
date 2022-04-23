import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EVM_ADDRESS_REGEXP, ZERO_ADDRESS } from '../../constants'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useRouterConfigContract } from '../../hooks/useContract'
import { useAppState } from '../../state/application/hooks'
import { deployCrosschainERC20 } from '../../utils/contract'
import { Button } from './Contracts'

export default function DeployCrosschainToken({
  routerAddress,
  underlying
}: {
  routerAddress: string
  underlying: { [k: string]: any }
}) {
  const { library, account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const { routerConfigChainId, routerConfigAddress } = useAppState()

  const routerConfig = useRouterConfigContract(routerConfigAddress, routerConfigChainId || 0)

  const [pending, setPending] = useState(false)

  const [vault, setVault] = useState(account)
  const [minter, setMinter] = useState('')

  useEffect(() => setVault(account), [account])
  useEffect(() => setMinter(routerAddress), [routerAddress])

  const [crosschainTokenAddress, setCrosschainTokenAddress] = useState<string | undefined>(undefined)
  const [canDeployCrosschainToken, setCanDeployCrosschainToken] = useState(false)

  useEffect(() => {
    setCanDeployCrosschainToken(
      Boolean(
        underlying.address && underlying.name && underlying.symbol && underlying.decimals > -1 && vault && minter
      ) && !crosschainTokenAddress
    )
  }, [underlying.address, underlying.name, underlying.symbol, underlying.decimals, vault, minter])

  useEffect(() => {
    const fetchUnderlyingInfo = async () => {
      if (!underlying.address || !underlying.networkId || !routerConfig) return

      try {
        const tokenConfig = await routerConfig.methods.getTokenConfig(underlying.address, underlying.networkId).call()

        if (tokenConfig.ContractAddress && tokenConfig.ContractAddress !== ZERO_ADDRESS) {
          setCrosschainTokenAddress(tokenConfig.ContractAddress)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (chainId && underlying.address.match(EVM_ADDRESS_REGEXP)) {
      fetchUnderlyingInfo()
    }
  }, [chainId, underlying.address, underlying.networkId])

  const onTokenDeployment = async () => {
    if (!chainId || !account || !vault) return

    setPending(true)

    try {
      await deployCrosschainERC20({
        chainId,
        library,
        account,
        underlying: underlying.address,
        name: `Crosschain${underlying.name}`,
        symbol: `CC${underlying.symbol}`,
        decimals: underlying.decimals,
        vault,
        minter,
        onDeployment: ({
          address,
          chainId,
          hash,
          name
        }: {
          address: string
          chainId: number
          hash: string
          name: string
        }) => {
          addTransaction(
            { hash },
            {
              summary: `Deployment: chain ${chainId}; CROSSCHAIN TOKEN ${name} ${address}`
            }
          )
        }
      })
    } catch (error) {
      console.error(error)
    }

    setPending(false)
  }

  return (
    <>
      <Button disabled={!canDeployCrosschainToken || pending} onClick={onTokenDeployment}>
        {t('deployCrossChainToken')}
      </Button>
    </>
  )
}