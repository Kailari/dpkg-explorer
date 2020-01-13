import React from 'react'

import './DetailsView.css'

const DetailsView = ({ changePage, pkg }) => {
  const removeVersionFromDependencyString = dependency => {
    let bracketIndex = dependency.indexOf('(')
    let endIndex = bracketIndex > -1 ? bracketIndex : dependency.length
    return dependency
      .substring(0, endIndex)
      .trim()
  }

  const onlyUnique = (value, index, self) => self.indexOf(value) === index

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
      {(pkg.Depends || 'No dependencies')
        .split(',')
        .map(removeVersionFromDependencyString)
        .filter(onlyUnique)
        .map((dependency, index) => <li key={index}>{dependency}</li>)}
    </ul>
  </div>
}

export default DetailsView
