import React from 'react'

const DetailsView = ({ changePage, pkg }) => {
  const parseDependency = dependency => {
    let bracketIndex = dependency.indexOf('(')
    let endIndex = bracketIndex > -1 ? bracketIndex : dependency.length
    return dependency
      .substring(0, endIndex)
      .trim()
  }

  return <div>
    <h2>{pkg.Package}</h2>
    <h3>Description</h3>
    <p>{(pkg.Description || 'Description not available.')
      .split('\n')
      .map((line, index) => <React.Fragment key={index}>
        <span>{line}</span> <br />
      </React.Fragment>)
    }</p>

    <h4>Dependencies</h4>
    <ul>{(pkg.Depends || 'No dependencies')
      .split(',')
      .map(parseDependency)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((dependency, index) => <li key={index}>{dependency}</li>)
    }</ul>
  </div>
}

export default DetailsView
