import React from 'react'

import './DetailsView.css'

const PackageLink = ({ changePage, packageService, pkgName }) => {
  const target = packageService.findByName(pkgName)

  const clickPackage = event => {
    event.preventDefault()
    changePage(`packages/${target.id}`)
  }

  return target
    ? <a href="/" onClick={clickPackage}>{pkgName}</a>
    : <span>{pkgName}</span>
}

const DetailsView = ({ changePage, packageService, pkg }) => {
  return <div className='package-details'>
    <h2>{pkg.Package}</h2>
    <p className='description'>
      {(pkg.Description || 'Description not available.')
        .split('\n')
        .map((line, index) => <React.Fragment key={index}>
          <span>{line}</span> <br />
        </React.Fragment>)}
    </p>

    <h4>Dependencies</h4>
    <ul className='depends'>
      {pkg.Depends
        ? pkg.Depends
          .map(dependencyGroup => dependencyGroup.split('|').map(string => string.trim()))
          .map((dependencyGroup, index) => <li key={index}>{
            dependencyGroup.map(dependency => <PackageLink changePage={changePage} packageService={packageService} pkgName={dependency} />)
              .reduce((a, b) => <>{a} <span> or </span> {b}</>)
          }</li>)
        : <li>No dependencies</li>
      }
    </ul>

    <h4>Dependents</h4>
    <ul className='dependents'>
      {(pkg.Dependents || ['No dependent packages'])
        .map((reverseDependency, index) => <li key={index}>
          <PackageLink changePage={changePage} packageService={packageService} pkgName={reverseDependency} />
        </li>)}
    </ul>
  </div>
}

export default DetailsView
