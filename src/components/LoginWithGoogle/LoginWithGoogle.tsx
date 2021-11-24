import React from 'react';
import { Button } from 'react-bootstrap';
import { SiGmail } from 'react-icons/si';
import { GoogleLogin } from 'react-google-login';
import { useAppDispatch } from '../../redux/store';
import { getInfo, loginWithGoogle } from '../../redux/slice/appSlice/accountSlice';
import Swal from 'sweetalert2';

export const LoginWithGoogle = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = async (response: any) => {
    const tokenID = response.tokenId;
    const isLogin = (await dispatch(loginWithGoogle({ jwt: tokenID }))).payload;

    if (isLogin) {
      Swal.fire({
        icon: 'success',
        title: 'ĐĂNG NHẬP THÀNH CÔNG',
      });

      dispatch(getInfo({ jwt: localStorage.getItem('jwt') }));

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'ĐĂNG NHẬP THẤT BẠI',
    });
  };
  const handleFalied = (response: any) => {
    Swal.fire({
      icon: 'error',
      title: 'ĐĂNG NHẬP THẤT BẠI',
    });

    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="503078025554-e9df776se6oom7m0vqsoj1gjlkn1maku.apps.googleusercontent.com"
        onSuccess={handleSuccess}
        onFailure={handleFalied}
        cookiePolicy={'single_host_origin'}
        buttonText=""
        render={(renderProps) => (
          <Button variant="info" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <SiGmail></SiGmail>
          </Button>
        )}
      ></GoogleLogin>
    </div>
  );
};
