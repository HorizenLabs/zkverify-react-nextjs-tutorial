import { BLOCK_EXPLORER_BASE_URL } from "@/constants";
import useExtrinsic, { type UseExtrinsicArgs } from "@/hooks/use-extrinsic";
import { useZKV } from "@/providers/zkv-provider";
import { Button, Link } from "@nextui-org/react";

interface Props extends UseExtrinsicArgs {
  children: React.ReactNode;
}

export default function ExtrinsicButton({
  args,
  extrinsic,
  pallet,
  children,
}: Props) {
  const { connectedAccount } = useZKV();
  const { exec, status, errorText, blockHash } = useExtrinsic({
    pallet,
    extrinsic,
    args,
  });

  return (
    <>
      <Button
        onClick={exec}
        type="button"
        className=" bg-emerald-400 mt-3"
        isDisabled={status === "loading" || !connectedAccount}
        isLoading={status === "loading"}
      >
        {children}
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
    </>
  );
}
