import { createContext, useContext, useState } from "react";
import * as userType from "../user";
import { users } from "../service/api/smb/users.api.service";
import { deleteCookie, setCookie } from "../utilities/defaults";

const UsersContext = createContext({
  usersData: null as userType.ResponseType | null,
  userByIdData: null as userType.ResponseType | null,
  userByEmailData: null as userType.ResponseType | null,
  myselfData: null as userType.ResponseType | null,
  updatedUserByIdData: null as userType.ResponseType | null,
  updatedUserByEmailData: null as userType.ResponseType | null,
  updatedMyselfData: null as userType.ResponseType | null,
  deletedUserByIdData: null as userType.ResponseType | null,
  deletedUserByEmailData: null as userType.ResponseType | null,
  deletedMyselfData: null as userType.ResponseType | null,
  registerData: null as userType.ResponseType | null,
  loginData: null as userType.ResponseType | null,
  verifyData: null as userType.ResponseType | null,
  resendTokenVerificationData: null as userType.ResponseType | null,
  forgotPasswordData: null as userType.ResponseType | null,
  resendForgotPasswordData: null as userType.ResponseType | null,
  resetPasswordData: null as userType.ResponseType | null,
  getUsers: async () => {},
  getUserById: async (id: string) => {
    id;
  },
  getUserByEmail: async (email: string) => {
    email;
  },
  getMyself: async () => {},
  updateUserById: async (id: string, user: userType.User) => {
    id;
    user;
  },
  updateUserByEmail: async (email: string, user: userType.User) => {
    email;
    user;
  },
  updateMyself: async (user: userType.User) => {
    user;
  },
  deleteUserById: async (id: string) => {
    id;
  },
  deleteUserByEmail: async (email: string) => {
    email;
  },
  deleteMyself: async () => {},
  register: async (user: userType.UserRegister) => {
    user;
  },
  login: async (user: userType.UserLogin) => {
    user;
  },
  logout: () => {},
  verify: async (token: string) => {
    token;
  },
  resendTokenVerification: async (email: string) => {
    email;
  },
  forgotPassword: async (email: string) => {
    email;
  },
  resendForgotPasswordToken: async (email: string) => {
    email;
  },
  resetPassword: async (email: string, token: string, password: string) => {
    email;
    token;
    password;
  },
});

export const useUsers = () => useContext(UsersContext);

const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<userType.ResponseType | null>(
    null
  );
  const [userByIdData, setUserByIdData] =
    useState<userType.ResponseType | null>(null);
  const [userByEmailData, setUserByEmailData] =
    useState<userType.ResponseType | null>(null);
  const [myselfData, setMyselfData] = useState<userType.ResponseType | null>(
    null
  );
  const [updatedUserByIdData, setUpdatedUserByIdData] =
    useState<userType.ResponseType | null>(null);
  const [updatedUserByEmailData, setUpdatedUserByEmailData] =
    useState<userType.ResponseType | null>(null);
  const [updatedMyselfData, setUpdatedMyselfData] =
    useState<userType.ResponseType | null>(null);
  const [deletedUserByIdData, setDeletedUserByIdData] =
    useState<userType.ResponseType | null>(null);
  const [deletedUserByEmailData, setDeletedUserByEmailData] =
    useState<userType.ResponseType | null>(null);
  const [deletedMyselfData, setDeletedMyselfData] =
    useState<userType.ResponseType | null>(null);
  const [registerData, setRegisterData] =
    useState<userType.ResponseType | null>(null);
  const [loginData, setLoginData] = useState<userType.ResponseType | null>(
    null
  );
  const [verifyData, setVerifyData] = useState<userType.ResponseType | null>(
    null
  );
  const [resendTokenVerificationData, setResendTokenVerificationData] =
    useState<userType.ResponseType | null>(null);
  const [forgotPasswordData, setForgotPasswordData] =
    useState<userType.ResponseType | null>(null);
  const [resendForgotPasswordData, setResendForgotPasswordData] =
    useState<userType.ResponseType | null>(null);
  const [resetPasswordData, setResetPasswordData] =
    useState<userType.ResponseType | null>(null);

  const getUsers = async () => {
    try {
      setUsersData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.getAll();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUsersData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        if (response) {
          setUsersData({
            isLoading: false,
            isError: false,
            data: response as userType.User[],
            errorResponse: null,
          });
        }
      }
    } catch (error) {
      setUsersData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const getUserById = async (id: string) => {
    try {
      setUserByIdData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.getById(id);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUserByIdData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setUserByIdData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setUserByIdData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const getUserByEmail = async (email: string) => {
    try {
      setUserByEmailData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.getByEmail(email);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUserByEmailData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setUserByEmailData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setUserByEmailData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const getMyself = async () => {
    try {
      setMyselfData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.getMyself();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setMyselfData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setMyselfData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setMyselfData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const updateUserById = async (id: string, user: userType.User) => {
    try {
      setUpdatedUserByIdData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.updateById(id, user);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdatedUserByIdData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setUpdatedUserByIdData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setUpdatedUserByIdData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const updateUserByEmail = async (email: string, user: userType.User) => {
    try {
      setUpdatedUserByEmailData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.updateByEmail(email, user);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdatedUserByEmailData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setUpdatedUserByEmailData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setUpdatedUserByEmailData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const updateMyself = async (user: userType.User) => {
    try {
      setUpdatedMyselfData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.updateMyself(user);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdatedMyselfData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
        return;
      } else {
        setUpdatedMyselfData({
          isLoading: false,
          isError: false,
          data: response as userType.User,
          errorResponse: null,
        });
      }
    } catch (error) {
      setUpdatedMyselfData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const deleteUserById = async (id: string) => {
    try {
      setDeletedUserByIdData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.deleteById(id);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeletedUserByIdData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setDeletedUserByIdData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setDeletedUserByIdData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const deleteUserByEmail = async (email: string) => {
    try {
      setDeletedUserByEmailData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.deleteByEmail(email);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeletedUserByEmailData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setDeletedUserByEmailData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setDeletedUserByEmailData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const deleteMyself = async () => {
    try {
      setDeletedMyselfData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.deleteMyself();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeletedMyselfData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setDeletedMyselfData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setDeletedMyselfData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const register = async (user: userType.UserRegister) => {
    try {
      setRegisterData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.register(user);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setRegisterData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setRegisterData({
          isLoading: false,
          isError: false,
          data: response as userType.TokenResponse,
          errorResponse: null,
        });
        if ("token" in response) {
          setCookie("authToken", response.token);
        }
      }
    } catch (error) {
      setRegisterData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const login = async (user: userType.UserLogin) => {
    try {
      setLoginData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.login(user);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setLoginData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setLoginData({
          isLoading: false,
          isError: false,
          data: response,
          errorResponse: null,
        });
        if ("token" in response) {
          setCookie("authToken", response.token);
        }
      }
    } catch (error) {
      setLoginData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const logout = () => {
    setTimeout(() => {
      deleteCookie("authToken");
    }, 1000);
  };

  const verify = async (token: string) => {
    try {
      setVerifyData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.verify(token);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setVerifyData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      }
      if (response) {
        setVerifyData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setVerifyData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const resendTokenVerification = async () => {
    try {
      setResendTokenVerificationData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.resendTokenVerification();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setResendTokenVerificationData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setResendTokenVerificationData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setResendTokenVerificationData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  const forgotPassword = async (email: string) => {
    try {
      setForgotPasswordData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.forgotPassword(email);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setForgotPasswordData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setForgotPasswordData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setForgotPasswordData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const resendForgotPasswordToken = async (email: string) => {
    try {
      setResendForgotPasswordData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.resendForgotPasswordToken(email);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setResendForgotPasswordData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setResendForgotPasswordData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setResendForgotPasswordData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    password: string
  ) => {
    try {
      setResetPasswordData({
        isLoading: true,
        isError: false,
        data: null,
        errorResponse: null,
      });
      const response = await users.resetPassword(email, token, password);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setResetPasswordData({
          isLoading: false,
          isError: true,
          data: null,
          errorResponse: response.response.data as userType.Message,
        });
      } else {
        setResetPasswordData({
          isLoading: false,
          isError: false,
          data: response as userType.Message,
          errorResponse: null,
        });
      }
    } catch (error) {
      setResetPasswordData({
        isLoading: false,
        isError: true,
        data: null,
        errorResponse: error,
      });
    }
  };
  return (
    <UsersContext.Provider
      value={{
        usersData,
        userByIdData,
        verifyData,
        resendTokenVerificationData,
        forgotPasswordData,
        resendForgotPasswordData,
        resetPasswordData,
        deletedMyselfData,
        deletedUserByEmailData,
        deletedUserByIdData,
        deleteMyself,
        deleteUserByEmail,
        deleteUserById,
        forgotPassword,
        getMyself,
        getUserByEmail,
        getUserById,
        getUsers,
        login,
        loginData,
        logout,
        myselfData,
        register,
        registerData,
        resendForgotPasswordToken,
        resendTokenVerification,
        resetPassword,
        updatedMyselfData,
        updatedUserByEmailData,
        updatedUserByIdData,
        updateMyself,
        updateUserByEmail,
        updateUserById,
        userByEmailData,
        verify,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
