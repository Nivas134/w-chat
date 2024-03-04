import { useSelector } from "react-redux";

function tokenHelper() {
  const token = useSelector((state) => state.user.token);
  return {
    token,
  };
}

export default tokenHelper;
