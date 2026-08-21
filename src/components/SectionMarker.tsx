export function SectionMarker({
  sheetNumber,
  title,
}: {
  sheetNumber: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-baseline gap-3 font-mono text-xs tracking-widest text-ink-muted uppercase">
      <span aria-hidden="true">HOJA {sheetNumber}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      <span>{title}</span>
    </div>
  );
}
