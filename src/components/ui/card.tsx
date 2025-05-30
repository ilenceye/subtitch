import { cn } from "@/lib/classnames";

export function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-border flex flex-col gap-[1px] overflow-hidden rounded-md border">
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card relative px-4 py-3", className)}>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-medium text-slate-800">
      {children}
    </div>
  );
}

function CardMenu({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute top-1/2 right-4 -translate-y-1/2">{children}</div>
  );
}

function CardBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card grow px-4 py-3", className)}>{children}</div>
  );
}

function CardFooter({ children }: { children?: React.ReactNode }) {
  return <div className="bg-card px-4 py-3">{children}</div>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Menu = CardMenu;
Card.Body = CardBody;
Card.Footer = CardFooter;
