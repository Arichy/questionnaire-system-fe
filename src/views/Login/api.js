import IOCreator from "@/utils/IOCreator";

export default IOCreator({
  login: {
    method: "POST",
    url: "/login",
  },
  signup: {
    method: "POST",
    url: "/signup",
  },
});
