import JSZip from 'jszip';
import { FLUTTER_FILES } from '../data/flutterFiles';

export async function downloadFlutterProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root folder in the zip
  const root = zip.folder('news_hub');
  if (!root) return;

  // Add all files
  for (const file of FLUTTER_FILES) {
    root.file(file.path, file.code);
  }

  // Generate binary zip
  const blob = await zip.generateAsync({ type: 'blob' });

  // Trigger download in browser
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'news_hub_flutter_college_project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
