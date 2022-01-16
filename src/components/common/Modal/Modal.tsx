import React from 'react';
import './Modal.scss';
interface IModal {
  id?: any;
  button: any;
  title: string;
  body: any;
  handleClick: any;
}
export const Modal: React.FC<IModal> = ({ id, button, title, body, handleClick }) => {
  return (
    <>
      <div className="App">
        <div className="openbtn text-center">
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={[`#${id}`]}>
            {button}
          </button>
          <div className="modal" tabIndex={-1} id={`${id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" style={{fontSize: '20px', fontWeight: '600'}}>{title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {body}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleClick}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
