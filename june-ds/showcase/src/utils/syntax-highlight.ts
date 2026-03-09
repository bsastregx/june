// Syntax highlighting for HTML code snippets

export function hlHTML(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Tags
    .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="ck">$2</span>')
    // Attributes
    .replace(/\s([\w-]+)=/g, ' <span class="cv">$1</span>=')
    // Strings
    .replace(/"([^"]*)"/g, '"<span class="cs">$1</span>"')
    // Comments
    .replace(/(&lt;!--.*?--&gt;)/g, '<span class="cc">$1</span>');
}
