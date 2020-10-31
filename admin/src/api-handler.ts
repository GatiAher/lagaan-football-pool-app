import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default {
  team: {
    clearTable: () => {
      return apiClient.delete(`/team/clear`);
    },
    resetTable: () => {
      return apiClient.delete(`/team/reset`);
    },
    getOne: (id: string) => {
      return apiClient.get(`/team/${id}`);
    },
    getList: () => {
      return apiClient.get(`/team`);
    },
    update: (id: string, body: object) => {
      return apiClient.put(`/team/${id}`);
    },
    delete: (id: string) => {
      return apiClient.delete(`/team/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/team`);
    },
  },
  game: {
    clearTable: () => {
      return apiClient.delete(`/game/clear`);
    },
    resetTable: () => {
      return apiClient.delete(`/game/reset`);
    },
    getOne: (id: string) => {
      return apiClient.get(`/game/${id}`);
    },
    getList: () => {
      return apiClient.get(`/game`);
    },
    update: (id: string, body: object) => {
      return apiClient.put(`/game/${id}`);
    },
    delete: (id: string) => {
      return apiClient.delete(`/game/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/game`);
    },
  },
  user: {
    clearTable: () => {
      return apiClient.delete(`/user/clear`);
    },
    resetTable: () => {
      return apiClient.delete(`/user/reset`);
    },
    getOne: (id: string) => {
      return apiClient.get(`/user/${id}`);
    },
    getList: () => {
      return apiClient.get(`/user`);
    },
    update: (id: string, body: object) => {
      return apiClient.put(`/user/${id}`);
    },
    delete: (id: string) => {
      return apiClient.delete(`/user/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/user`);
    },
  },
  score: {
    recalculateTeamScore: () => {
      return apiClient.get(`/score/team`);
    },
    recalculateUserScore: () => {
      return apiClient.get(`/score/user`);
    },
  },
};
