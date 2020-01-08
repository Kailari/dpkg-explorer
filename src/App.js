import React, { useState } from 'react'

import packageService from './services/packages'

import ListView from './components/list/ListView'
import DetailsView from './components/details/DetailsView'

import './App.css'

const App = () => {
  const [page, setPage] = useState('packages')

  const nav = () => {
    const navLinkClickHandler = page => event => {
      event.preventDefault()
      setPage(page)
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

  const selectContent = () => {
    if (page.startsWith('packages/')) {
      const packageId = page.substring(9)
      const pkg = packageService.findById(packageId)
      return <DetailsView changePage={setPage} package={pkg} />
    }

    const packages = packageService.getAll()
    return <ListView changePage={setPage} packages={packages} />
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

export default App;
