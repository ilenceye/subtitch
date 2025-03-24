export function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-border flex flex-col gap-[1px] overflow-hidden rounded-md border">
      {children}
    </div>
  );
}

function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className="bg-card px-4 py-3">{children}</div>;
}

function CardTitle({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-medium text-slate-800">
      {children}
    </div>
  );
}

function CardBody({ children }: { children?: React.ReactNode }) {
  return <div className="bg-card grow px-4 py-3">{children}</div>;
}

function CardFooter({ children }: { children?: React.ReactNode }) {
  return <div className="bg-card px-4 py-3">{children}</div>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
