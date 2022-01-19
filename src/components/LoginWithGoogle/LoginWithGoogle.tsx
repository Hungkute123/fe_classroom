import React from 'react';
import { Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login';
import { useAppDispatch } from '../../redux/store';
import { getInfo, loginWithGoogle } from '../../redux/slice/appSlice/accountSlice';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export const LoginWithGoogle = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleSuccess = async (response: any) => {
    const tokenID = response.tokenId;
    const isLogin = (await dispatch(loginWithGoogle({ jwt: tokenID }))).payload;

    if (isLogin) {
      const data = (await dispatch(getInfo({ jwt: localStorage.getItem('jwt') }))).payload;

      if (!data.Status) {
        window.localStorage.clear();
        Swal.fire({
          icon: 'error',
          title: 'TÀI KHOẢN ĐÃ BỊ KHÓA',
        });
      } else {
        if (history.action === 'PUSH') {
          history.goBack();
        } else {
          history.push({
            pathname: `/`,
          });
        }
        Swal.fire({
          icon: 'success',
          title: 'ĐĂNG NHẬP THÀNH CÔNG',
        });

        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ĐĂNG NHẬP THẤT BẠI',
      });
      return;
    }
  };
  const handleFalied = (response: any) => {
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
          <Button variant="" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <FcGoogle></FcGoogle>
          </Button>
        )}
      ></GoogleLogin>
    </div>
  );
};
