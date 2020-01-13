import React from 'react'

import './DetailsView.css'

const DetailsView = ({ changePage, pkg }) => {
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
      {(pkg.Depends || ['No dependencies'])
        .map((dependency, index) => <li key={index}>{dependency}</li>)}
    </ul>
  </div>
}

export default DetailsView
