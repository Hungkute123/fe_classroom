import axiosClient from "./axiosClient";

const memberClassroomApi = {
  
  getTeacherByCodeClass: async (params: any) => {
    const url = 'member/teacher';
    const {data} = await axiosClient.get(url, {params});
    return data;
  },
  getStudentByCodeClass: async (params: any) => {
    const url = 'member/student';
    const {data} = await axiosClient.get(url, {params});
    return data;
  },
}

export default memberClassroomApi;