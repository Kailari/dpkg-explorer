import React from 'react'

const Breadcrumbs = ({ page, changePage }) => {
  const navLinkClickHandler = page => event => {
    event.preventDefault()
    changePage(page)
  }

  const paths = page.split('/')
  const fullPaths = paths.map((p, index) => paths.slice(0, index + 1).join('/'))

  const currentPath = paths.map((p, index) =>
    <React.Fragment key={p}>
      <a href="/" onClick={navLinkClickHandler(fullPaths[index])}>
        {p}
      </a>
      <span style={{ userSelect: 'none' }}>/</span>
    </React.Fragment>
  )
  return <span>
    home/{currentPath}
  </span>
}

export default Breadcrumbs
