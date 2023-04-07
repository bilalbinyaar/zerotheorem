import React, {useState} from 'react'

const LoginPopup = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    // <div className="popup">
    //   <div className="popup__content">
    //     <button className="popup__close" onClick = {togglePopup}>
    //       X
    //     </button>
    //     {children}
    //   </div>
    // </div>

                <div className="popup">
                    <div className="popup-content">
                      <h2>Popup Title</h2>
                      <p>Popup content goes here.</p>
                      <button onClick={handleClosePopup}>Close</button>
                    </div>
                  </div>
  )
}

export default LoginPopup