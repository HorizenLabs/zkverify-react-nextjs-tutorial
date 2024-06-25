"use client";

import {
  MOCK_RISC_ZERO_PROOF,
  RISC_ZERO_PUBLIC_INPUTS,
  RISC_ZERO_VKEY,
} from "@/constants";
import CodeDisplay from "./code-display";
import dynamic from "next/dynamic";
const ExtrinsicButton = dynamic(() => import("@/components/extrinsic-button"), {
  ssr: false,
});

export default function RiscZeroProof() {
  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Risc Zero Proof</h1>

      <CodeDisplay label="Verification Key">{RISC_ZERO_VKEY}</CodeDisplay>

      <CodeDisplay className="h-48" label="Proof">
        {MOCK_RISC_ZERO_PROOF}
      </CodeDisplay>

      <CodeDisplay label="Public Inputs">{RISC_ZERO_PUBLIC_INPUTS}</CodeDisplay>

      <ExtrinsicButton
        pallet="settlementRisc0Pallet"
        extrinsic="submitProof"
        args={[RISC_ZERO_VKEY, MOCK_RISC_ZERO_PROOF, RISC_ZERO_PUBLIC_INPUTS]}
      >
        Submit Proof
      </ExtrinsicButton>
    </div>
  );
}
