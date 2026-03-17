/**
 * Lal Kitaab PDF export: year (if Varshphal) + all descriptions and remedies.
 * PDF is always in English (Helvetica) because jsPDF does not support raw TTF
 * for Unicode/Devanagari. When user has Hindi selected we add a compatibility note.
 */

import { jsPDF } from 'jspdf';
import type { HouseData } from '@/lib/lal-kitaab';
import type { DescriptionLanguage, LalKitaabChartType } from '@/lib/lal-kitaab-descriptions';
import {
  getHouseDescription,
  getPlanetInHouseDescription,
  getPlanetInHouseRemedies,
  getPlanetDisplayName,
} from '@/lib/lal-kitaab-descriptions';

const MARGIN = 20;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - 2 * MARGIN;
const FONT_SIZE_TITLE = 16;
const FONT_SIZE_HEADING = 12;
const FONT_SIZE_BODY = 10;
const FONT_SIZE_SMALL = 9;
export interface LalKitaabPdfOptions {
  chartType: LalKitaabChartType;
  selectedYear: number;
  birthYear: number;
  houses: HouseData[];
  descLang: DescriptionLanguage;
}

/** PDF content is always in English (jsPDF default font); avoids Unicode/font errors. */
const pdfLang: DescriptionLanguage = 'en';

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number
): number {
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * 0.35 + 1);
}

export function generateLalKitaabPdf(options: LalKitaabPdfOptions): jsPDF {
  const { chartType, selectedYear, birthYear, houses, descLang } = options;
  const isHindiRequested = descLang === 'hi';

  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  doc.setFont('helvetica', 'normal');
  let y = MARGIN;

  if (isHindiRequested) {
    doc.setFontSize(FONT_SIZE_SMALL);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Exported in English for PDF compatibility. For Hindi, view on screen.',
      MARGIN,
      y
    );
    doc.setTextColor(0, 0, 0);
    y += 8;
  }

  const title =
    chartType === 'birth'
      ? 'Lal Kitaab Birth Chart'
      : `Lal Kitaab Varshphal (${selectedYear})`;
  doc.setFontSize(FONT_SIZE_TITLE);
  doc.text(title, MARGIN, y);
  y += 10;

  if (chartType === 'varshphal') {
    const yearLine = `Year: ${selectedYear} (Age: ${selectedYear - birthYear} years)`;
    doc.setFontSize(FONT_SIZE_BODY);
    doc.text(yearLine, MARGIN, y);
    y += 8;
  }

  if (y > PAGE_H - 40) {
    doc.addPage();
    y = MARGIN;
  }

  const sectionTitle = 'Lal Kitaab Descriptions — Houses & Planets';
  doc.setFontSize(FONT_SIZE_HEADING);
  doc.text(sectionTitle, MARGIN, y);
  y += 10;

  const houseLabel = 'House';
  const bodyPartsLabel = 'Body parts:';
  const rulerLabel = 'Ruler:';
  const significatorLabel = 'Significator:';
  const planetsLabel = 'Planets in this house:';
  const noPlanetsLabel = 'No planets in this house.';

  for (const house of houses) {
    const houseDesc = getHouseDescription(house.houseNumber, pdfLang);
    if (!houseDesc) continue;

    if (y > PAGE_H - 60) {
      doc.addPage();
      y = MARGIN;
    }

    doc.setFontSize(FONT_SIZE_HEADING);
    doc.text(`${houseLabel} ${house.houseNumber}: ${houseDesc.title}`, MARGIN, y);
    y += 8;

    y = addWrappedText(doc, houseDesc.significations, MARGIN, y, CONTENT_W, FONT_SIZE_BODY) + 2;

    if (houseDesc.bodyParts) {
      const meta = `${bodyPartsLabel} ${houseDesc.bodyParts}. ${rulerLabel} ${houseDesc.ruler}, ${significatorLabel} ${houseDesc.significator}.`;
      y = addWrappedText(doc, meta, MARGIN, y, CONTENT_W, FONT_SIZE_SMALL) + 2;
    }

    if (house.planets.length > 0) {
      doc.setFontSize(FONT_SIZE_SMALL);
      doc.text(planetsLabel, MARGIN, y);
      y += 6;

      for (const planetShort of house.planets) {
        if (y > PAGE_H - 35) {
          doc.addPage();
          y = MARGIN;
        }
        const name = getPlanetDisplayName(planetShort, pdfLang);
        const desc =
          getPlanetInHouseDescription(planetShort, house.houseNumber, pdfLang, chartType) ??
          `${name} in house ${house.houseNumber} influences the affairs of this house.`;
        const remedies = getPlanetInHouseRemedies(planetShort, house.houseNumber, pdfLang, chartType);

        doc.setFontSize(FONT_SIZE_SMALL);
        doc.setFont('helvetica', 'bold');
        doc.text(`${name}:`, MARGIN, y);
        doc.setFont('helvetica', 'normal');
        y += 5;
        y = addWrappedText(doc, desc, MARGIN + 3, y, CONTENT_W - 3, FONT_SIZE_SMALL) + 2;
        if (remedies.length > 0) {
          for (const remedy of remedies) {
            if (y > PAGE_H - 15) {
              doc.addPage();
              y = MARGIN;
            }
            y = addWrappedText(doc, `• ${remedy}`, MARGIN + 5, y, CONTENT_W - 5, FONT_SIZE_SMALL) + 1;
          }
        }
        y += 3;
      }
    } else {
      doc.setFontSize(FONT_SIZE_SMALL);
      doc.text(noPlanetsLabel, MARGIN, y);
      y += 6;
    }
    y += 6;
  }

  return doc;
}

export function downloadLalKitaabPdf(options: LalKitaabPdfOptions): void {
  const doc = generateLalKitaabPdf(options);
  const chartType = options.chartType;
  const year = options.selectedYear;
  const base =
    chartType === 'birth'
      ? 'Lal-Kitaab-Birth-Chart'
      : `Lal-Kitaab-Varshphal-${year}`;
  doc.save(`${base}.pdf`);
}
