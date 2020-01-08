import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Breadcrumbs from './Breadcrumbs'

test('all individual parts of the path can be found as text in some form', () => {
  const mockChangePage = jest.fn()
  const page = 'some/path/to/a/resource'

  const { getByText } = render(<Breadcrumbs page={page} changePage={mockChangePage} />)
  page
    .split('/')
    .map(path => getByText(path))
    .forEach(element => expect(element).toBeInTheDocument())
})

test('there is "home/" at the beginning of the breadcrumbs', () => {
  const mockChangePage = jest.fn()
  const page = 'some/path/to/a/resource'

  const { getByText } = render(<Breadcrumbs page={page} changePage={mockChangePage} />)
  const navElement = getByText(/home\//i)
  expect(navElement).toBeInTheDocument()
})

test('not clicking path link does not call changePage callback', () => {
  const mockChangePage = jest.fn()
  const page = 'some/path/to/xxx/a/resource'

  render(<Breadcrumbs page={page} changePage={mockChangePage} />)
  expect(mockChangePage.mock.calls.length).toBe(0)
})

test('clicking path link calls changePage callback once', () => {
  const mockChangePage = jest.fn()
  const page = 'some/path/to/xxx/a/resource'

  const { getByText } = render(<Breadcrumbs page={page} changePage={mockChangePage} />)
  const element = getByText('xxx')
  fireEvent.click(element)

  expect(mockChangePage.mock.calls.length).toBe(1)
})

test('clicking path link calls changePage callback with correct full path', () => {
  const mockChangePage = jest.fn()
  const page = 'some/path/to/xxx/a/resource'

  const { getByText } = render(<Breadcrumbs page={page} changePage={mockChangePage} />)
  const element = getByText('xxx')
  fireEvent.click(element)

  expect(mockChangePage.mock.calls[0][0]).toBe('some/path/to/xxx')
})
