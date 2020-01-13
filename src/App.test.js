import React from 'react'
import { render, wait } from '@testing-library/react'
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

  const fetch = onFinished => onFinished()

  const getAll = () => packages.concat()

  const findById = id => packages.concat().find(pkg => pkg.id === id)

  return {
    fetch,
    getAll,
    findById
  }
}

test('initially app is on the list page', async () => {
  const testPackageService = createTestPackageService()
  const { getByText } = render(<App packageService={testPackageService} />)
  await wait(() => expect(getByText(/List of all packages/i)).toBeInTheDocument())
})
