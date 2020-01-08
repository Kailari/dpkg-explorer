import React from 'react'

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

export default ListView;

