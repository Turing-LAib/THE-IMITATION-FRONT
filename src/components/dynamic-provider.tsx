import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "906b1cef-1137-46d0-9390-599800bdca04",
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
