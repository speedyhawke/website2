/// <reference types="vite/client" />
// Dynamically gathers project source files safely with fallbacks

export interface ProjectFile {
  path: string;
  name: string;
  category: 'Components' | 'Data & State' | 'Lib & Config' | 'Root & Setup' | 'Styles & Assets' | 'CMS';
  content: string;
  size: number;
  lines: number;
}

export function getAllProjectFiles(): ProjectFile[] {
  const files: ProjectFile[] = [];

  try {
    let rawSrcFiles: Record<string, string> = {};
    if (typeof import.meta !== 'undefined' && typeof (import.meta as any).glob === 'function') {
      rawSrcFiles = (import.meta as any).glob(
        [
          '../*.{ts,tsx,css,json,html,js,mjs,md}',
          '../src/**/*.{ts,tsx,css,json,html,svg,md}',
          '../public/*.{html,json,svg,txt,xml}'
        ],
        { query: '?raw', import: 'default', eager: true }
      ) as Record<string, string>;
    }

    for (const [rawPath, content] of Object.entries(rawSrcFiles)) {
      // Normalize relative path
      let cleanPath = rawPath.replace(/^\.\.\//, '').replace(/^\//, '');
      const name = cleanPath.split('/').pop() || cleanPath;

      if (cleanPath.includes('node_modules') || cleanPath.includes('dist') || cleanPath.includes('bun.lock') || cleanPath.endsWith('.zip')) {
        continue;
      }

      let category: ProjectFile['category'] = 'Root & Setup';
      if (cleanPath.startsWith('src/components/cms/')) {
        category = 'CMS';
      } else if (cleanPath.startsWith('src/components/')) {
        category = 'Components';
      } else if (cleanPath.startsWith('src/data/')) {
        category = 'Data & State';
      } else if (cleanPath.startsWith('src/lib/')) {
        category = 'Lib & Config';
      } else if (cleanPath.endsWith('.css') || cleanPath.endsWith('.png') || cleanPath.endsWith('.svg')) {
        category = 'Styles & Assets';
      }

      const stringContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
      const lineCount = stringContent ? stringContent.split('\n').length : 0;
      const byteSize = stringContent ? new Blob([stringContent]).size : 0;

      files.push({
        path: cleanPath,
        name,
        category,
        content: stringContent,
        size: byteSize,
        lines: lineCount
      });
    }
  } catch (err) {
    console.warn('[sourceCodeProvider] Non-blocking glob notice:', err);
  }

  return files.sort((a, b) => a.path.localeCompare(b.path));
}

export function getFullProjectMarkdown(): string {
  const files = getAllProjectFiles();
  const totalLines = files.reduce((acc, f) => acc + f.lines, 0);
  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);

  let output = `================================================================================\n`;
  output += `FILL THE GAP (FTG) - COMPLETE WEBSITE SOURCE CODE REPOSITORY\n`;
  output += `Generated: ${new Date().toISOString()}\n`;
  output += `Total Files: ${files.length}\n`;
  output += `Total Lines of Code: ${totalLines.toLocaleString()}\n`;
  output += `Total Uncompressed Size: ${(totalBytes / 1024).toFixed(1)} KB\n`;
  output += `================================================================================\n\n`;

  output += `DIRECTORY INDEX:\n`;
  files.forEach((f, idx) => {
    output += `${(idx + 1).toString().padStart(2, ' ')}. ${f.path.padEnd(45, ' ')} (${f.lines} lines, ${(f.size / 1024).toFixed(1)} KB)\n`;
  });
  output += `\n================================================================================\n\n`;

  for (const file of files) {
    const ext = file.name.split('.').pop() || '';
    output += `\n\n${'='.repeat(80)}\n`;
    output += `FILE: ${file.path}\n`;
    output += `LINES: ${file.lines} | SIZE: ${(file.size / 1024).toFixed(1)} KB | CATEGORY: ${file.category}\n`;
    output += `${'='.repeat(80)}\n`;
    output += `\`\`\`${ext}\n`;
    output += file.content;
    output += `\n\`\`\`\n\n`;
  }

  return output;
}
