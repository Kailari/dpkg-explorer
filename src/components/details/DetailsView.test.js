import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DetailsView from './DetailsView'

const testPkg = {
  Package: "python-pkg-resources",
  Status: "install ok installed",
  Priority: "optional",
  Section: "python",
  InstalledSize: "175",
  Maintainer: "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
  Architecture: "all",
  Source: "distribute",
  Version: "0.6.24-1ubuntu1",
  Replaces: "python2.3-setuptools, python2.4-setuptools",
  Provides: "python2.6-setuptools, python2.7-setuptools",
  Depends: "python (>= 2.6), python (<< 2.8), someDep (>= 24.42), someAnotherDep (>= 13.37)",
  Suggests: "python-distribute, python-distribute-doc",
  Conflicts: "python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)",
  Description: `Package Discovery and Resource Access using pkg_resources
The pkg_resources module provides an API for Python libraries to
access their resource files, and for extensible applications and
frameworks to automatically discover plugins. It also provides
runtime support for using C extensions that are inside zipfile-format
eggs, support for merging packages that have separately-distributed
modules or subpackages, and APIs for managing Python's current
"working set" of active packages.`,
  OriginalMaintainer: "Matthias Klose <doko@debian.org>",
  Homepage: "http://packages.python.org/distribute",
  PythonVersion: "2.6, 2.7"
}

test('package name is rendered', () => {
  const mockChangePage = jest.fn()

  const { getByText } = render(<DetailsView changePage={mockChangePage} pkg={testPkg} />)
  const element = getByText(testPkg.Package)
  expect(element).toBeInTheDocument()
})

test('package description is rendered', () => {
  const mockChangePage = jest.fn()

  const { getByText } = render(<DetailsView changePage={mockChangePage} pkg={testPkg} />)
  testPkg.Description
    .split('\n')
    .forEach(line => {
      const element = getByText(line)
      expect(element).toBeInTheDocument()
    })
})

test('package dependencies are rendered', () => {
  const mockChangePage = jest.fn()

  const { getByText } = render(<DetailsView changePage={mockChangePage} pkg={testPkg} />)
  const firstElement = getByText("someDep")
  const secondElement = getByText("someAnotherDep")
  expect(firstElement).toBeInTheDocument()
  expect(secondElement).toBeInTheDocument()
})

test('package dependency versions are not rendered', () => {
  const mockChangePage = jest.fn()

  const { queryByText } = render(<DetailsView changePage={mockChangePage} pkg={testPkg} />)
  const element = queryByText(">= 24.42")
  expect(element).toBeNull()
})
