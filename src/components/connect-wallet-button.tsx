"use client";

import { useZKV } from "@/providers/zkv-provider";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function ConnectWalletButton() {
  const { connectedAccount, handleConnectWallet, handleDisconnectWallet } =
    useZKV();
  return (
    <>
      {!connectedAccount && (
        <Button onClick={handleConnectWallet} className="bg-emerald-400">
          Connect Wallet
        </Button>
      )}
      {connectedAccount && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              {getAbbreviatedHash(connectedAccount.address)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown actions">
            <DropdownItem
              onClick={handleDisconnectWallet}
              color="danger"
              className="text-danger"
            >
              Disconnect
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

function getAbbreviatedHash(hash: string) {
  return `${hash.substring(0, 4)}...${hash.substring(
    hash.length - 4,
    hash.length
  )}`;
}
