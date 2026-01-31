import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SurahCard from './SurahCard';
import { describe, it, expect } from 'vitest';
import type { SurahSummary } from '@/types/quran.types';

const mockSurah: SurahSummary = {
  number: 1,
  name_latin: 'Al-Fatihah',
  name_arabic: 'الفاتحة',
  translation: 'Pembukaan',
  number_of_ayahs: 7,
};

describe('SurahCard', () => {
  it('renders surah information correctly', () => {
    render(
      <BrowserRouter>
        <SurahCard surah={mockSurah} />
      </BrowserRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Al-Fatihah')).toBeInTheDocument();
    expect(screen.getByText(/Pembukaan/)).toBeInTheDocument();
    expect(screen.getByText(/7 Ayat/)).toBeInTheDocument();
    expect(screen.getByText('الفاتحة')).toBeInTheDocument();
  });

  it('links to the correct surah detail page', () => {
    render(
      <BrowserRouter>
        <SurahCard surah={mockSurah} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/surah/1');
  });
});
