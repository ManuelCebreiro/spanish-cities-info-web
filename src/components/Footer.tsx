import { SectionMarker } from "@/components/SectionMarker";
import { REPO_URL, NPM_URL, AUTHOR_URL } from "@/lib/content";

export function Footer() {
  return (
    <footer id="footer" className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <SectionMarker sheetNumber="08" title="Créditos" />
        <div className="flex flex-col gap-6 font-mono text-xs tracking-wide uppercase sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
              GitHub
            </a>
            <a href={NPM_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
              npm
            </a>
            <a
              href={`${REPO_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              Licencia ISC
            </a>
          </div>
          <div className="text-ink-muted normal-case">
            Manuel Cebreiro — Full Stack Developer, A Coruña / Ferrol ·{" "}
            <a href={AUTHOR_URL} target="_blank" rel="noreferrer" className="underline hover:text-accent">
              manuelcebreiro.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
