import React from 'react'

const Modal = ({handleDone, show, children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleDone}>Done</button>
        </section>
      </div>
    )
  }

export default Modal;