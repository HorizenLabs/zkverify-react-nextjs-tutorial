"use client";

import { MOCK_BOOJUM_PROOF, MOCK_FFLONK_PROOF } from "@/constants";
import { Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
const BasicProof = dynamic(() => import("@/components/basic-proof"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-[800px] mx-auto py-8">
      <Tabs size="lg" aria-label="Tabs for Proof Types">
        <Tab key="fflonk" title="Fflonk">
          <BasicProof
            mockProof={MOCK_FFLONK_PROOF}
            pallet="settlementFFlonkPallet"
            proofType="Fflonk"
          />
        </Tab>
        <Tab key="boojum" title="Boojum">
          <BasicProof
            mockProof={MOCK_BOOJUM_PROOF}
            pallet="settlementZksyncPallet"
            proofType="Boojum"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
