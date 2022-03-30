import React from 'react'
import './Preloader.css'

function Preloader(props) {
  return (
      <div className={props.isPreloader ? "preloader" : "preloader_invisble" }>
        <div className="preloader__container">
            <span className="preloader__round"></span>
        </div>
      </div>
  )
};

export default Preloader
