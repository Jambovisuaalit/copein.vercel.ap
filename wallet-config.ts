'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc.ankr.com/eth`,
      }),
    }),
    publicProvider()
  ]
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet({ chains, projectId }),
        coinbaseWallet({ appName: '$COPEIN App', chains }),
        walletConnectWallet({ chains, projectId })
      ]
    }
  ]),
  publicClient
})
