import React from 'react';
import { Form } from 'react-bootstrap';
import { BsFillPencilFill, BsKeyboardFill, BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { adminRegister, registerWithEmail } from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import './CreateAdminAccount.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateAdminAccount = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
      full_name: Yup.string()
        .matches(
          /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
          'Họ và tên không hợp lệ',
        )
        .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Vui lòng nhập đầy đủ họ tên')
        .min(3, 'Tối thiểu 2 ký tự')
        .max(100, 'Tối đa 100 ký tự')
        .required('Vui lòng nhập họ tên'),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Phải đủ 8 ký tự, có ký tự hoa, thường, số và ký tự đặc biệt',
        ),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
    }),
    onSubmit: async (values) => {
      toast('Đang xử lý', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const isRegister = (await dispatch(adminRegister(values))).payload;

      if (isRegister) {
        toast.success('Đăng ký tài khoản thành công', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      toast.warning('Email đăng ký đã tồn tại', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  return (
    <div className="create-admin-account">
      <ToastContainer />
      <div className="create-admin-account box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="create-admin-account box content">
          <div className="create-admin-account__content">
            <div className="create-admin-account__title">
              <h1>Tạo tài khoản admin</h1>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <div className="create-admin-account__form">
                <div className="create-admin-account__group">
                  <input
                    type="text"
                    name="email"
                    placeholder="Nhập email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <i className="create-admin-account__icon">
                    <MdEmail></MdEmail>
                  </i>
                </div>
                {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
                <div className="create-admin-account__group">
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Nhập họ và tên"
                    value={formik.values.full_name}
                    onChange={formik.handleChange}
                  />
                  <i className="create-admin-account__icon">
                    <BsFillPencilFill></BsFillPencilFill>
                  </i>
                </div>
                {formik.errors.full_name && formik.touched.full_name && (
                  <p>{formik.errors.full_name}</p>
                )}
                <div className="create-admin-account__group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <i className="create-admin-account__icon">
                    <BsKeyFill></BsKeyFill>
                  </i>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p>{formik.errors.password}</p>
                )}
                <div className="create-admin-account__group">
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Nhập lại mật khẩu"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                  />
                  <i className="create-admin-account__icon">
                    <BsKeyboardFill></BsKeyboardFill>
                  </i>
                </div>
                {formik.errors.confirm_password && formik.touched.confirm_password && (
                  <p>{formik.errors.confirm_password}</p>
                )}
                <button className="create-admin-account__btn" type="submit">
                  Tạo tài khoản
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
