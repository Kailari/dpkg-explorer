import React, { useState } from 'react'

import packageService from './services/packages'

import Breadcrumbs from './components/Breadcrumbs'
import ListView from './components/list/ListView'
import DetailsView from './components/details/DetailsView'

import './App.css'

const App = () => {
  const [page, setPage] = useState('packages')

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
          <Breadcrumbs page={page} changePage={setPage} />
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
