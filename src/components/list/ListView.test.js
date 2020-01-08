import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListView from './ListView';

const createTestPackages = () => [
  {
    id: 1,
    Package: "Some Package #1"
  },
  {
    id: 2,
    Package: "libws-commons-util-java"
  },
  {
    id: 3,
    Package: "libtext-wrapi18n-perl"
  }
]

test('renders names of all provided packages', () => {
  const packages = createTestPackages()
  const { getByText } = render(<ListView packages={packages} changePage={() => {}} />)

  packages.forEach(pkg => {
    const linkElement = getByText(pkg.Package)
    expect(linkElement).toBeInTheDocument()
  })
})

test('rendered names are links', () => {
  const packages = createTestPackages()
  const { getByText } = render(<ListView packages={packages} changePage={() => {}} />)

  packages.forEach(pkg => {
    const linkElement = getByText(pkg.Package)
    expect(linkElement).toHaveClass('package-link')
  })
})

test('clicking links calls change page callback once', () => {
  const packages = createTestPackages()
  const mockChangePage = jest.fn()

  const { getByText } = render(<ListView packages={packages} changePage={mockChangePage} />)

  const link = getByText(/libws-commons-util-java/i)
  fireEvent.click(link)

  expect(mockChangePage.mock.calls.length).toBe(1)
})
