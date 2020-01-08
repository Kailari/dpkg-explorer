import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

const createTestPackageService = () => {
  const packages = [
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

  const getAll = () => packages.concat()

  const findById = id => packages.concat().find(pkg => pkg.id === id)

  return {
    getAll,
    findById
  }
}

test('initially app is on the list page', () => {
  const testPackageService = createTestPackageService()

  const { getByText } = render(<App packageService={testPackageService} />)
  const element = getByText(/List of all packages/i)
  expect(element).toBeInTheDocument()
})
