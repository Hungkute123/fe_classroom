import axiosClient from './axiosClient';

const classStructureApi = {
  getClassStructure: async (params: any) => {
    const url = `class-structure/get`;
    return await axiosClient.get(url, { params });
  },
  saveClassStructure: async (requestOption: any) => {
    const url = `class-structure/save`;
    return await axiosClient.post(url, requestOption);
  },
  patchClassStructure: async (requestOption: any) => {
    const url =  `class-structure/update`;
    return await axiosClient.patch(url, requestOption);
  },
  deleteClassStructure: async (params: any) => {
    const url = `class-structure/remove`;
    return await axiosClient.delete(url, { params });
  },
};

export default classStructureApi;
