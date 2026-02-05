import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function decodeJwt(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_SOLID_API_URL;

      const res = await fetch(`${API_URL}/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      const token = data.data.token;

      const decoded = decodeJwt(token);

      return {
        token,
        role: decoded.role,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  user: null,
  getUserStatus: {
    user: {
      isLoading: false,
      isSuccess: false,
      isFailed: false,
    },
  },
  errors: {
    data: null,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.getUserStatus.user.isSuccess = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    return builder.addAsyncThunk(loginThunk, {
      pending: (prevState) => {
        prevState.getUserStatus.user.isLoading = true;
        prevState.getUserStatus.user.isSuccess = false;
        prevState.getUserStatus.user.isFailed = false;
      },
      fulfilled: (prevState, action) => {
        prevState.getUserStatus.user.isLoading = false;
        prevState.getUserStatus.user.isSuccess = true;
        prevState.user = {
          email: action.meta.arg.email, // dari form login
          token: action.payload.token,
          role: action.payload.role,
        };
        // console.log("PAYLOAD LOGIN:", payload);
      },
      rejected: (prevState, { payload }) => {
        prevState.getUserStatus.user.isLoading = false;
        prevState.getUserStatus.user.isFailed = true;
        prevState.errors.data = payload;
      },
    });
  },
});

export const { signOut } = loginSlice.actions;
export const loginAction = { ...loginSlice.actions, loginThunk };
export default loginSlice.reducer;
