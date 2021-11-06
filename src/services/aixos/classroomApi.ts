import axiosClient from "./axiosClient";

const classroomApi = {
  getClassByIDUser: async () => {
    
    const url = 'class';
    const {data} = await axiosClient.get(url)
    return data;
  },

  createClass: (requestOption: any) => {
    const url = 'class';
    return axiosClient.post(url,requestOption);
  }
}

export default classroomApi;