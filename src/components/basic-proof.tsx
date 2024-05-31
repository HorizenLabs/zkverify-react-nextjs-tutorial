"use client";

import { BLOCK_EXPLORER_BASE_URL } from "@/constants";
import { useZKV } from "@/providers/zkv-provider";
import { Button, Link, ScrollShadow } from "@nextui-org/react";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { useCallback, useState } from "react";

type Props = {
  mockProof: string;
  proofType: "Fflonk" | "Boojum";
  pallet: "settlementFFlonkPallet" | "settlementZksyncPallet";
};

export default function BasicProof({ mockProof, proofType, pallet }: Props) {
  const { connectedAccount, api } = useZKV();
  const [status, setStatus] = useState<"loading" | "error" | "success" | null>(
    null
  );
  const [errorText, setErrorText] = useState<string | null>(null);
  const [blockHash, setBlockHash] = useState<string | null>(null);

  const submitProof = useCallback(async () => {
    if (!api || !connectedAccount) {
      return;
    }

    const injector = await web3FromAddress(connectedAccount.address);

    // Reset states
    setBlockHash(null);
    setErrorText(null);
    setStatus("loading");

    let unsub: () => void;
    let txSuccessEvent = false;

    try {
      unsub = await api?.tx[pallet].submitProof(mockProof).signAndSend(
        connectedAccount.address,
        {
          signer: injector.signer,
        },
        ({ status, events, dispatchError }) => {
          if (dispatchError) {
            setStatus("error");
            setErrorText(`Something went wrong: ${dispatchError}`);
            unsub();
          }

          // Must see the ExtrinsicSuccess event to be sure the tx is successful
          events.forEach(({ event: { data, method, section }, phase }) => {
            if (section == "system" && method == "ExtrinsicSuccess") {
              txSuccessEvent = true;
            }
          });

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
  }, [api, connectedAccount, mockProof, pallet]);

  return (
    <div className="w-full">
      <h1 className="text-large font-bold mb-2">Submit {proofType} Proof</h1>
      <ScrollShadow className="w-[600px] h-[400px] break-all">
        {mockProof}
      </ScrollShadow>

      <Button
        onClick={submitProof}
        type="button"
        className=" bg-emerald-400 mt-3"
        isDisabled={status === "loading" || !connectedAccount}
        isLoading={status === "loading"}
      >
        Submit Proof
      </Button>
      {status === "success" && blockHash && (
        <div className="mt-2">
          Proof Verified! Tx included in block.{" "}
          <Link
            target="_blank"
            href={`${BLOCK_EXPLORER_BASE_URL}/v0/block/${blockHash}`}
          >
            View on Block Explorer
          </Link>
        </div>
      )}
      {status === "error" && errorText && (
        <div className="mt-2 text-red-900">{errorText}</div>
      )}
    </div>
  );
}
