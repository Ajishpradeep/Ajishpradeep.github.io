import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from './resumePdf';

/** Generates the PDF client-side and returns an object URL ready to download. */
export async function buildResumePdfUrl(): Promise<string> {
  const blob = await pdf(ResumePDF()).toBlob();
  return URL.createObjectURL(blob);
}
