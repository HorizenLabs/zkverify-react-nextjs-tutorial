import { useZKV } from "@/providers/zkv-provider";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { useCallback, useState } from "react";

export type Status = "loading" | "error" | "success" | null;
export type Pallet =
  | "settlementFFlonkPallet"
  | "settlementZksyncPallet"
  | "settlementRisc0Pallet"
  | "settlementGroth16Pallet";
export type Extrinsic = "submitProof";

export type UseExtrinsicArgs = {
  pallet: Pallet;
  extrinsic: Extrinsic;
  args: any[];
};

export default function useExtrinsic({
  pallet,
  extrinsic,
  args,
}: UseExtrinsicArgs) {
  const { connectedAccount, api } = useZKV();
  const [status, setStatus] = useState<Status>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [blockHash, setBlockHash] = useState<string | null>(null);

  const exec = useCallback(async () => {
    if (!api || !connectedAccount) {
      return;
    }

    const injector = await web3FromAddress(connectedAccount.address);

    // Reset states
    setBlockHash(null);
    setErrorText(null);
    setStatus("loading");

    let txSuccessEvent = false;
    let unsub: () => void;

    try {
      unsub = await api?.tx[pallet][extrinsic](...args).signAndSend(
        connectedAccount.address,
        {
          signer: injector.signer,
        },
        ({ status, events, dispatchError, internalError }) => {
          if (dispatchError || internalError) {
            setStatus("error");
            setErrorText(
              `Something went wrong: ${
                internalError ? internalError.message : dispatchError
              }`
            );
            unsub();
          }

          if (events) {
            // Must see the ExtrinsicSuccess event to be sure the tx is successful
            events.forEach(({ event: { data, method, section }, phase }) => {
              if (section == "system" && method == "ExtrinsicSuccess") {
                txSuccessEvent = true;
              }
            });
          }

          if (status.isFinalized) {
            if (txSuccessEvent) {
              setStatus("success");
              setBlockHash(status.asFinalized.toString());
            } else {
              setStatus("error");
              setErrorText("ExtrinsicSuccess has not been seen");
            }

            unsub();
          }
        }
      );
      return unsub;
    } catch (e: unknown) {
      setStatus("error");
      setErrorText(
        `Something went wrong: ${
          e instanceof Error ? e.message : "Could not submit proof"
        }`
      );
    }
  }, [api, connectedAccount, args, pallet, extrinsic]);

  return {
    exec,
    status,
    errorText,
    blockHash,
  };
}
