import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDocumentTitle } from './useDocumentTitle';
import { describe, it, expect } from 'vitest';

const TestComponent = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return null;
};

describe('useDocumentTitle', () => {
  it('should update document title', () => {
    render(
      <MemoryRouter>
        <TestComponent title="Test Title" />
      </MemoryRouter>
    );

    expect(document.title).toBe('Test Title');
  });

  it('should update document title when prop changes', () => {
    const { rerender } = render(
      <MemoryRouter>
        <TestComponent title="Initial Title" />
      </MemoryRouter>
    );

    expect(document.title).toBe('Initial Title');

    rerender(
      <MemoryRouter>
        <TestComponent title="Updated Title" />
      </MemoryRouter>
    );

    expect(document.title).toBe('Updated Title');
  });
});
