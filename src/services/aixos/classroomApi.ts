import axiosClient from './axiosClient';

const classroomApi = {
  getClassByIDUser: async (params: any) => {
    const url = 'class';
    const { data } = await axiosClient.get(url, {params});
    return data;
  },

  createClass: (requestOption: any) => {
    const url = 'class';
    return axiosClient.post(url,requestOption);
  },
  getClassByCodeClass: async (params: any) => {
    
    const url = 'class/codeclass';
    const {data} = await axiosClient.get(url, {params});
    return data;
  },
  inviteClassroom: async (params: any) =>{
    const url = 'class/invite';
    const {data} = await axiosClient.get(url, {params});
    return data;
  },
  isOwnerClass: async (params: any) =>{
    const url = 'class/owner';
    const {data} = await axiosClient.get(url, {params});
    return data;
  }
}

export default classroomApi;
