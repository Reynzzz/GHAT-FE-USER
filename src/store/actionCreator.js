import {
  ADD_TEACHER,
  DELETE_KELAS,
  DELETE_SCHEDULE,
  DELETE_TEACHER,
  LOGIN,
  POST_KELAS,
  POST_SCHEDULE,
  READ_KELAS,
  READ_SCHEDULE,
  READ_SCHEDULE_BY_USER,
  READ_SCHEDULE_NO_USER,
  READ_TEACHER,
  UPDATE_KELAS,
  UPDATE_SCHEDULE,
  UPDATE_TEACHER,
  VALIDATE_GURU_JAGA,
} from "./actionTypes";
import { setUserType, setUsername,setCategory } from "./userSlice";
import CryptoJS from "crypto-js";
const BASE_URL = 'https://api-v1.ghatmtsn1.com'
// const BASE_URL = "http://localhost:4000";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const actionGenerator = (type, payload) => {
  return {
    type,
    payload,
  };
};
export const fetchTeacher = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/guru", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_TEACHER, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const AddTeacher = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });
      dispatch(fetchTeacher(), actionGenerator(ADD_TEACHER));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const deleteTeacher = (id) => {
  // console.log(id,'id');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/guru/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispact(fetchTeacher(), actionGenerator(DELETE_TEACHER));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const updateTeacher = (id, formData) => {
  console.log(id);
  console.log(formData);
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/guru/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });

      dispact(fetchTeacher(), actionGenerator(UPDATE_TEACHER));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAbsen = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("access_token"); 
    try {
      const response = await fetch(BASE_URL + "/scheduleAdmin", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
           'Authorization': `Bearer ${token}`,
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_SCHEDULE, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const AddSchedule = (dataToSumbit) => {
  console.log(dataToSumbit);
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token"); 
      const response = await fetch(BASE_URL + "/absen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(dataToSumbit),
      });
      dispatch(fetchAbsen(), actionGenerator(POST_SCHEDULE));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const fetchKelas = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/kelas", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_KELAS, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "ni");
      throw error;
    }
  };
};
export const updateSchedule = (id, formData) => {
  console.log(id);
  console.log(formData);
  return async (dispact) => {
    try {
      const token = localStorage.getItem("access_token"); 
      const response = await fetch(BASE_URL + `/scheduleAdmin/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
         'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      dispact(fetchAbsen(), actionGenerator(UPDATE_SCHEDULE));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteSchedule = (id) => {
  // console.log(id,'id');
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token"); 
      const response = await fetch(BASE_URL + `/scheduleAdmin/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          
        },
      });
      if (response.ok) {
        // Tampilkan toast sukses jika responsenya OK
        toast.success("Schedule deleted successfully!");
        dispatch(fetchAbsen());
        dispatch(actionGenerator(DELETE_SCHEDULE));
      } else {
        // Tangani respons yang tidak OK (misalnya, status 4xx atau 5xx)
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        throw new Error(`Failed to delete schedule: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const HandleLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw responseJSON;
      }
      const { access_token, user } = responseJSON;

      // Define a secret key for encryption
      const secretKey = "secret-key";

      // Encrypt the data before storing it in localStorage
      const encryptedAccessToken = CryptoJS.AES.encrypt(access_token, secretKey).toString();
      const encryptedUserRole = CryptoJS.AES.encrypt(user.role, secretKey).toString();
      const encryptedUserType = CryptoJS.AES.encrypt(user.type, secretKey).toString();

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", encryptedUserRole);
      localStorage.setItem("user2", encryptedUserType);

      dispatch(setUserType(user.role));
      dispatch(setUsername(user));
      dispatch(setCategory(user.type));
      dispatch(actionGenerator(LOGIN, responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const fetchScheduleByUser = () => {
  return async (dispatch) => {
    try {
      // localStorage.setItem("access_token", access_token);
      const token = localStorage.getItem("access_token"); 
      console.log(token,'ni log');// Ambil token dari localStorage
      const response = await fetch(BASE_URL + `/schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          // access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch absensi");
      }
      dispatch(actionGenerator(READ_SCHEDULE_BY_USER, data));
    } catch (error) {
      console.log(error, "<<<<<<<<<");
      throw error;
    }
  };
};
export const fetchScheduleNoUser = () => {
  return async (dispatch) => {
    try {
      // localStorage.setItem("access_token", access_token);
      const token = localStorage.getItem("access_token"); 
      console.log(token,'ni log');// Ambil token dari localStorage
      const response = await fetch(BASE_URL + `/absen`, {
        method: "GET",
        headers: { 'authorization': `Bearer ${token}`,},
      });
      const data = await response.json();
      console.log(data,'nidata');
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch absensi");
      }
      dispatch(actionGenerator(READ_SCHEDULE_NO_USER, data));
    } catch (error) {
      console.log(error, "<<<<<<<<<");
      throw error;
    }
  };
};
export const validasiGuruJaga = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      // localStorage.setItem("access_token", access_token);
      const token = localStorage.getItem("access_token"); 
      // console.log(token,'ni log');// Ambil token dari localStorage
      const response = await fetch(BASE_URL + `/validasiGuruJaga/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          // access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "eror update");
      }
      dispatch(fetchAbsen,(actionGenerator(VALIDATE_GURU_JAGA, data)));
    } catch (error) {
      console.log(error, "<<<<<<<<<");
      throw error;
    }
  };
};
export const AddKelas = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/kelas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });
      dispatch(fetchKelas(), actionGenerator(POST_KELAS));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const updateKelasAdmin = (id, data) => {
 
  // const test = JSON.stringify(data)
  // console.log(test);
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/kelas/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      dispact(fetchKelas(), actionGenerator(UPDATE_KELAS));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteKelas = (id) => {
  // console.log(id,'id');
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token"); 
      const response = await fetch(BASE_URL + `/kelas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          
        },
      });
      if (response.ok) {
        toast.success("Kelas deleted successfully!");
        dispatch(fetchKelas());
        dispatch(actionGenerator(DELETE_KELAS));
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        throw new Error(`Failed to delete schedule: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};