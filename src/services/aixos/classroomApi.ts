import axiosClient from './axiosClient';

const classroomApi = {
  getClassByIDUser: async (params: any) => {
    const url = 'class';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },

  createClass: (requestOption: any) => {
    const url = 'class';
    return axiosClient.post(url, requestOption);
  },
  getClassByCodeClass: async (params: any) => {

    const url = 'class/codeclass';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  inviteClassroom: async (params: any) => {
    const url = 'class/invite';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  isOwnerClass: async (params: any) => {
    const url = 'class/owner';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  getListClass: async (params: any) => {
    const url = 'class/list-class';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  updateClass: async (requestOption: any) => {
    const url = `class/update-class`;
    return await axiosClient.patch(url, requestOption);
  },
  deleteClass: async (params: any) => {
    const url = `class/delete-class`;
    return await axiosClient.delete(url, { params });
  },
}

export default classroomApi;
