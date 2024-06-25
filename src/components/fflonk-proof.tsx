"use client";

import dynamic from "next/dynamic";
import CodeDisplay from "./code-display";
const ExtrinsicButton = dynamic(() => import("@/components/extrinsic-button"), {
  ssr: false,
});

type Props = {
  mockProof: string;
  vKey?: string;
};

export default function FflonkProof({ mockProof, vKey }: Props) {
  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Fflonk Proof</h1>
      {vKey && (
        <CodeDisplay label="vKey">
          {<pre>{JSON.stringify(vKey, null, 2)}</pre>}
        </CodeDisplay>
      )}

      <CodeDisplay className="h-48" label="Proof">
        {mockProof}
      </CodeDisplay>

      <ExtrinsicButton
        pallet="settlementFFlonkPallet"
        extrinsic="submitProof"
        args={[mockProof, vKey || null]}
      >
        Submit Proof
      </ExtrinsicButton>
    </div>
  );
}
