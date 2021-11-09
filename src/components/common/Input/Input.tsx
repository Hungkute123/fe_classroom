import React, { useEffect, useRef, useState } from 'react';
import './Input.scss';

export const Input = React.forwardRef<any, IInput>(
  (
    {
      label,
      placeholder,
      maxLength,
      value,
      onChange,
      onBlur,
      onkeypress,
      onkeyup,
      type,
      borderRadius,
      width,
      height,
      background,
      className,
      name,
      error,
      colorText,
      marginLabel,
      onKeyDown,
      showPassword = false,
      zIndex,
      titleAction,
      handleAction,
      isDisable,
      buttonAction,
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className={`input`}>
        {label && (
          <p className="input__label" style={{ margin: `${marginLabel}` }}>
            {label}
          </p>
        )}
        <div style={{ position: 'relative' }}>
          <div
            className={`input__container ${className} ${
              isDisable ? 'input__container--disable' : ''
            }`}
            style={{ borderRadius, height, width, background, zIndex }}
          >
            <input
              placeholder={placeholder}
              name={name}
              maxLength={maxLength}
              onKeyPress={onkeypress}
              defaultValue={value}
              disabled={isDisable}
              onChange={onChange}
              style={{
                color: `${colorText}`,
              }}
              type={show ? 'input' : type}
              onBlur={onBlur}
              onKeyUp={onkeyup}
              ref={ref}
              autoComplete="off"
              onKeyDown={onKeyDown}
              className={showPassword ? 'input__input input__input--show' : 'input__input'}
            />
            {showPassword && (
              <div
                className="input__showPass"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? 'Ẩn' : 'Hiện'}
              </div>
            )}
            {titleAction && (
              <div className="input__showPass" onClick={handleAction}>
                {titleAction}
              </div>
            )}

            {buttonAction && (
              <div className="input__showPass" onClick={handleAction}>
                {buttonAction}
              </div>
            )}
          </div>
          {error && <div className="input__error">{error}</div>}
        </div>
      </div>
    );
  },
);
