import Link from "next/link";
import ConnectWalletButton from "./connect-wallet-button";

export default function Navbar() {
  return (
    <div className="flex h-[75px] w-full items-center px-8 bg-gray-50">
      <Link className="text-lg font-bold" href="/">
        zkVerify Next.js Example
      </Link>

      <div className="ml-auto">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
