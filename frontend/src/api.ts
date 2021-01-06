import axios from "axios";

import TeamType from "./types/TeamType";
import GameType from "./types/GameType";
import UserType from "./types/UserType";

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
      return apiClient.put(`/team/${id}`, body);
    },
    delete: (id: string) => {
      return apiClient.delete(`/team/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/team`, body);
    },
    fetchTeamMap: () => {
      return apiClient.get(`/team`).then((response) => {
        const teamMap = new Map<string, TeamType>();
        if (Array.isArray(response.data)) {
          response.data.forEach((teamObj) => {
            teamMap.set(teamObj.id, teamObj);
          });
        }
        return teamMap;
      });
    },
    putTeamScore: (id: string, body: object) => {
      return apiClient.put(`/team/${id}`, body);
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
      return apiClient.put(`/game/${id}`, body);
    },
    delete: (id: string) => {
      return apiClient.delete(`/game/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/game`, body);
    },
    fetchGamesByWeek: (week: number) => {
      const query = {
        sort: JSON.stringify(["startTime", "asc"]),
        filter: JSON.stringify({ week: week }),
      };
      return apiClient
        .get<GameType[]>(`/game`, { params: query })
        .then((response) => response.data);
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
      return apiClient
        .get<UserType[]>(`/user/${id}`)
        .then((response) => response.data);
    },
    getList: (orderByField: string = "score") => {
      const query = {
        sort: JSON.stringify([orderByField, "desc"]),
      };
      return apiClient
        .get<UserType[]>(`/user`, { params: query })
        .then((response) => response.data);
    },
    update: (id: string, body: object) => {
      return apiClient.put(`/user/${id}`, body);
    },
    delete: (id: string) => {
      return apiClient.delete(`/user/${id}`);
    },
    create: (body: object) => {
      return apiClient.post(`/user`, body);
    },
    putUserSelections: (id: string, body: object) => {
      return apiClient.put(`/user/${id}`, body);
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
  info: {
    getKickOffDate: () => {
      return apiClient.get(`/info/kickoff`);
    },
  },
};
