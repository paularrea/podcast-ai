import React, { createContext, useContext, useState } from "react";

const defaultForm = {
  email: "",
  password: "",
  name: "",
  dob: { day: "", month: "", year: "" },
  gender: "",
  optInNews: false,
  optInMarketing: false,
};

const SignupFormContext = createContext(null);

export const SignupFormProvider = ({ children }) => {
  const [data, setData] = useState(defaultForm);
  return (
    <SignupFormContext.Provider value={{ data, setData }}>
      {children}
    </SignupFormContext.Provider>
  );
};

export const useSignupForm = () => {
  const ctx = useContext(SignupFormContext);
  if (!ctx) throw new Error("SignupFormProvider missing");
  return ctx;
};
