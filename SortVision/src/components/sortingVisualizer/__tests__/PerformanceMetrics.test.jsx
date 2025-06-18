import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PerformanceMetrics from '../PerformanceMetrics';

describe('PerformanceMetrics', () => {
  const mockProps = {
    algorithm: 'bubbleSort',
    arraySize: 100,
    executionTime: 150,
    comparisons: 4950,
    swaps: 2475,
    isRunning: false,
    isComplete: true,
    onReset: vi.fn(),
  };

  it('renders basic metrics correctly', () => {
    render(<PerformanceMetrics {...mockProps} />);
    expect(screen.getByText(/Execution Time:/i)).toBeInTheDocument();
    expect(screen.getByText(/150 ms/i)).toBeInTheDocument();
    expect(screen.getByText(/Comparisons:/i)).toBeInTheDocument();
    expect(screen.getByText(/4950/i)).toBeInTheDocument();
    expect(screen.getByText(/Swaps:/i)).toBeInTheDocument();
    expect(screen.getByText(/2475/i)).toBeInTheDocument();
  });

  it('shows estimated time complexity', () => {
    render(<PerformanceMetrics {...mockProps} />);
    expect(screen.getByText(/Time Complexity:/i)).toBeInTheDocument();
    expect(screen.getByText(/O\(n²\)/i)).toBeInTheDocument();
  });

  it('displays memory usage information', () => {
    render(<PerformanceMetrics {...mockProps} />);
    expect(screen.getByText(/Memory Usage:/i)).toBeInTheDocument();
    expect(screen.getByText(/O\(1\)/i)).toBeInTheDocument();
  });

  it('shows performance recommendations', () => {
    render(<PerformanceMetrics {...mockProps} />);
    expect(screen.getByText(/Performance Recommendations:/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider using a more efficient algorithm for large datasets/i)).toBeInTheDocument();
  });

  it('handles different array sizes appropriately', () => {
    const smallArrayProps = {
      ...mockProps,
      arraySize: 10,
      executionTime: 5,
      comparisons: 45,
      swaps: 20,
    };
    render(<PerformanceMetrics {...smallArrayProps} />);
    expect(screen.getByText(/5 ms/i)).toBeInTheDocument();
    expect(screen.getByText(/45/i)).toBeInTheDocument();
    expect(screen.getByText(/20/i)).toBeInTheDocument();
  });

  it('shows loading state when algorithm is running', () => {
    render(<PerformanceMetrics {...mockProps} isRunning={true} />);
    expect(screen.getByText(/Running.../i)).toBeInTheDocument();
  });

  it('shows completion message when algorithm is complete', () => {
    render(<PerformanceMetrics {...mockProps} isComplete={true} />);
    expect(screen.getByText(/Sorting Complete!/i)).toBeInTheDocument();
  });

  it('provides appropriate recommendations for different algorithms', () => {
    const quickSortProps = {
      ...mockProps,
      algorithm: 'quickSort',
    };
    render(<PerformanceMetrics {...quickSortProps} />);
    expect(screen.getByText(/O\(n log n\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider using insertion sort for small datasets/i)).toBeInTheDocument();
  });
}); 