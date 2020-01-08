import React, { useState } from 'react'
import './App.css'
import packageService from './services/packages'

const App = () => {
  const [page, setPage] = useState('packages')

  const changePage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const nav = () => {
    const paths = page.split('/')
    const fullPaths = paths.map((p, index) => paths.slice(0, index + 1).join('/'))

    const currentPath = paths.map((p, index) =>
      <React.Fragment key={p}>
        <a href="/" onClick={changePage(fullPaths[index])}>
          {p}
        </a>
        <span style={{ userSelect: 'none' }}>/</span>
      </React.Fragment>
    )
    return <span>
      home/{currentPath}
    </span>
  }

  const selectContent = () => {
    if (page.startsWith('packages/')) {
      const packageId = page.substring(9)
      const pkg = packageService.findById(packageId)
      return <PackageView changePage={changePage} package={pkg} />
    }

    const packages = packageService.getAll()
    return <ListView changePage={changePage} packages={packages} />
  }

  return (
    <div className='app'>
      <header>
        <h1>DPKG-Explorer</h1>
        <nav>
          {nav()}
        </nav>
      </header>
      <section className='content-container'>
        {selectContent()}
      </section>
      <footer>
        Footer.
      </footer>
    </div>
  )
}

const PackageView = ({ changePage, pkg }) => {
  return <span>Hello World!</span>
}

const ListView = ({ changePage, packages }) => {
  return <>
    <h2>List of all packages</h2>
    <p>
      This page lists all packages available in the current package manifest.
    </p>
    <p>
      Click on package titles to get more information of each package.
    </p>
    <PackageList packages={packages} onClickPackage={pkgURL => changePage(pkgURL)} />
  </>
}

const PackageList = ({ packages, onClickPackage }) => {
  return <ul>
    {packages
      .sort((a, b) => a.Package.localeCompare(b.Package))
      .map(pkg =>
        <li key={pkg.id}>
          <PackageLink pkg={pkg} onClickPackage={onClickPackage} />
        </li>
      )}
  </ul>
}

const PackageLink = ({ pkg, onClickPackage }) => {
  const pkgURL = `packages/${pkg.id}`

  return <a href="/" onClick={onClickPackage(pkgURL)}>
    {pkg.Package}
  </a>
}

export default App;
