"use client";

import dynamic from "next/dynamic";
import CodeDisplay from "./code-display";
import {
  MOCK_FFLONK_PROOF,
  MOCK_FFLONK_PUBS,
  MOCK_FFLONK_VKEY,
} from "@/constants";
const ExtrinsicButton = dynamic(() => import("@/components/extrinsic-button"), {
  ssr: false,
});

export default function FflonkProof() {
  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Fflonk Proof</h1>

      <CodeDisplay label="vKey">
        {<pre>{JSON.stringify(MOCK_FFLONK_VKEY, null, 2)}</pre>}
      </CodeDisplay>

      <CodeDisplay className="h-48" label="Proof">
        {MOCK_FFLONK_PROOF}
      </CodeDisplay>

      <CodeDisplay label="Public Inputs">{MOCK_FFLONK_PUBS}</CodeDisplay>

      <ExtrinsicButton
        pallet="settlementFFlonkPallet"
        extrinsic="submitProof"
        args={[MOCK_FFLONK_VKEY, MOCK_FFLONK_PROOF, MOCK_FFLONK_PUBS]}
      >
        Submit Proof
      </ExtrinsicButton>
    </div>
  );
}
