import React from 'react';

const ButtonUpload = ({
  buttonName,
  color,
  onChange,
  hoverColor,
  clickedColor,
  disabled,
  uploadType,
  ...props
}) => {
  return (
    <div >
      <label
        disabled={disabled}
        className={disabled ? 'disabledBtn' : 'btn'}
        type="submit"
        >
        {buttonName}
        <input type="file" onChange={onChange} name={uploadType} accept={`${uploadType}/*`} hidden />
      </label>
      <style jsx>{`
        .disabledBtn {
          color: #777;
          background: lightblue;
          padding: 7px 20px;
          font-size: 17px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          background: ${color};
          transition: 0.4s ease-in;
        }
        .btn {
          background-color: aqua;
          padding: 7px 20px;
          font-size: 17px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          box-shadow: inset 0 0px 3px rgba(0, 0, 0, 0.2);
          transition: 0.4s ease-in;
          color: rgb(255, 255, 255);
          background: ${color};
        }
        .btn:hover:active {
          background-color: rgb(32, 141, 141);
          box-shadow: inset 0 0px 3px rgba(0, 0, 0, 0.2);
          transition: 0s ease-in;
          color: rgb(26, 82, 82);
          background: ${clickedColor};
        }
      `}</style>
    </div>
  );
};

export default ButtonUpload;
