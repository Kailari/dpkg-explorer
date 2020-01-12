import React from 'react'

const DetailsView = ({ changePage, pkg }) => {
  return <div>
    <h2>{pkg.Package}</h2>
    <h3>Description</h3>
    <p>{pkg.Description
      .split('\n')
      .map((line, index) => <React.Fragment key={index}>
        <span>{line}</span> <br />
      </React.Fragment>)
    }</p>

    <h4>Dependencies</h4>
    <ul>{pkg.Depends
      .split(',')
      .map(dependency => dependency.substring(0, dependency.indexOf('(')).trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((dependency, index) => <li key={index}>{dependency}</li>)
    }</ul>
  </div>
}

export default DetailsView
