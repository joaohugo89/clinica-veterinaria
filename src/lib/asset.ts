/**
 * Resolve o caminho de um arquivo de `public/` respeitando a base do Vite.
 *
 * Em produção no GitHub Pages o site fica em /<nome-do-repo>/, então um caminho
 * absoluto como "/img/pet.png" quebraria. `import.meta.env.BASE_URL` já carrega
 * a base correta (definida por VITE_BASE no workflow de deploy).
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
