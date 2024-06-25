"use client";

import { MOCK_BOOJUM_PROOF } from "@/constants";
import CodeDisplay from "./code-display";
import dynamic from "next/dynamic";
const ExtrinsicButton = dynamic(() => import("@/components/extrinsic-button"), {
  ssr: false,
});

export default function BoojumProof() {
  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Boojum Proof</h1>

      <CodeDisplay className="h-48" label="Proof">
        {MOCK_BOOJUM_PROOF}
      </CodeDisplay>

      <ExtrinsicButton
        pallet="settlementZksyncPallet"
        extrinsic="submitProof"
        args={[MOCK_BOOJUM_PROOF]}
      >
        Submit Proof
      </ExtrinsicButton>
    </div>
  );
}
