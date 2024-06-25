"use client";

import { GROTH16_INPUT, GROTH16_VKEY, MOCK_GROTH16_PROOF } from "@/constants";
import CodeDisplay from "./code-display";
import dynamic from "next/dynamic";
const ExtrinsicButton = dynamic(() => import("@/components/extrinsic-button"), {
  ssr: false,
});

export default function Groth16Proof() {
  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Groth16 Proof</h1>

      <CodeDisplay label="Proof">
        <pre>{JSON.stringify(MOCK_GROTH16_PROOF, null, 2)}</pre>
      </CodeDisplay>

      <CodeDisplay label="vKey">
        <pre>{JSON.stringify(GROTH16_VKEY, null, 2)}</pre>
      </CodeDisplay>

      <CodeDisplay label="Inputs">
        <pre>{JSON.stringify(GROTH16_INPUT, null, 2)}</pre>
      </CodeDisplay>

      <ExtrinsicButton
        pallet="settlementGroth16Pallet"
        extrinsic="submitProof"
        args={[MOCK_GROTH16_PROOF, GROTH16_VKEY, GROTH16_INPUT]}
      >
        Submit Proof
      </ExtrinsicButton>
    </div>
  );
}
