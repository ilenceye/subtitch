export function EmptyState({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      {children}
    </div>
  );
}

function EmptyStateHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
      {children}
    </div>
  );
}

function EmptyStateTitle({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mb-2 text-lg font-medium text-slate-800">{children}</div>
  );
}

function EmptyStateDescription({ children }: { children?: React.ReactNode }) {
  return <p className="max-w-xs text-sm text-slate-500">{children}</p>;
}

EmptyState.Header = EmptyStateHeader;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
