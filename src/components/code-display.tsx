import { Code, ScrollShadow } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  label: string;
};

export default function CodeDisplay({ className, label, children }: Props) {
  return (
    <>
      <h2 className="font-bold text-small mb-2">{label}</h2>
      <ScrollShadow className={`w-full break-all mb-3 ${className || ""}`}>
        <Code className="min-w-full text-wrap">{children}</Code>
      </ScrollShadow>
    </>
  );
}
