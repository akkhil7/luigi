import React from 'react';
import { Spring } from 'react-motion'

class Issue extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <Spring defaultValue={{val: 1000}} endValue={{val: 0}}>
          {interpolated => 
            <div className="issue-sidebar"
              style={{transform: `translate3d(${interpolated.val}px, 0, 0`}}>
              Hello
            </div>  
          }
        </Spring>
      </div>
    );
  }
}

module.exports = Issue;
