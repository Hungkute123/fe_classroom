import axiosClient from './axiosClient';

const memberClassroomApi = {
  getTeacherByCodeClass: async (params: any) => {
    const url = 'member/teacher';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  getStudentByCodeClass: async (params: any) => {
    const url = 'member/student';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  joinClassroom: async (params: any) => {
    const url = 'member/join';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  getMyInfo: async (params: any) => {
    const url = 'member/my-info';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  joinClassroomByCodeClass: async (params: any) => {
    const url = 'member/join-codeclass';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
};

export default memberClassroomApi;
