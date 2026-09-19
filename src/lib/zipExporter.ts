import JSZip from 'jszip';
import { getAllProjectFiles } from './sourceCodeProvider';
import confetti from 'canvas-confetti';

export interface ZipExportProgress {
  status: 'idle' | 'preparing' | 'packaging' | 'downloading' | 'completed' | 'error';
  message: string;
  progressPercent: number;
}

export async function downloadEntireWebsiteZip(
  onProgress?: (progress: ZipExportProgress) => void
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    if (onProgress) {
      onProgress({ status: 'preparing', message: 'Gathering project source files...', progressPercent: 15 });
    }

    const zip = new JSZip();
    const files = getAllProjectFiles();

    // 1. Add all project source files gathered by sourceCodeProvider
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      zip.file(file.path, file.content);
    }

    if (onProgress) {
      onProgress({ status: 'packaging', message: 'Packaging root configuration, documentation & assets...', progressPercent: 45 });
    }

    // 2. Add complete README.md with setup and deployment instructions
    const readmeContent = `# Fill The Gap (FTG) — Complete Web Application Source Code

Welcome to the complete source code repository for **Fill The Gap (FTG)** Newfoundland & Labrador!

## 🚀 Quick Start (Local Development)

1. **Install Node.js** (v18 or v20+ recommended).
2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
3. **Start the Local Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   \`\`\`bash
   npm run build
   \`\`\`
   The production-ready static assets will be in the \`dist/\` folder.

## 📦 What's Included

- **Frontend Application**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion animations.
- **Admin Dashboard**: Live Survey Analysis, Google Sheets & Forms integration, Analytics, Donors & Messages.
- **Surveys**: 46-question community survey & 12-question frontline provider survey.
- **CMS Module**: Custom page builder and dynamic announcements.
- **Offline & Cross-Device Storage Engine**: Resilient client and cloud data synchronization.

---
© ${new Date().getFullYear()} Fill The Gap (FTG) Newfoundland & Labrador. All rights reserved.
`;
    zip.file('README.md', readmeContent);

    // 3. Try to fetch and include public images/assets
    const assetUrls = [
      'puffin_mascot.svg',
      'puffin.png',
      'ftg_hero.png',
      'logo_mark.png',
      'scenic_nl.jpg',
      'FTG picture.png',
      'vercel.json',
      '_redirects',
      '404.html'
    ];

    for (let i = 0; i < assetUrls.length; i++) {
      const asset = assetUrls[i];
      try {
        const res = await fetch(`/${asset}`);
        if (res.ok) {
          const blob = await res.blob();
          zip.file(`public/${asset}`, blob);
        }
      } catch (err) {
        // Non-blocking asset fetch
      }
    }

    if (onProgress) {
      onProgress({ status: 'downloading', message: 'Generating compressed ZIP archive...', progressPercent: 80 });
    }

    // 4. Generate the ZIP blob
    const zipBlob = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      },
      (metadata) => {
        if (onProgress) {
          const pct = Math.min(95, Math.round(80 + metadata.percent * 0.15));
          onProgress({
            status: 'downloading',
            message: `Compressing files (${Math.round(metadata.percent)}%)...`,
            progressPercent: pct
          });
        }
      }
    );

    // 5. Trigger browser download
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `fillthegapnl-website-complete-${dateStr}.zip`;

    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 20000);

    // 6. Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    if (onProgress) {
      onProgress({ status: 'completed', message: `Downloaded ${filename}!`, progressPercent: 100 });
    }

    return { success: true, filename };
  } catch (error: any) {
    console.error('Error generating website ZIP:', error);
    if (onProgress) {
      onProgress({ status: 'error', message: error?.message || 'Failed to generate ZIP archive', progressPercent: 0 });
    }
    return { success: false, error: error?.message || 'Failed to generate ZIP' };
  }
}
