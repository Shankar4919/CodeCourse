import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {

  const { state } = useContext(Context);
  const { user } = state;


  return (
    <UserRoute>
        <h1 className="jumbotron text-center">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
    </UserRoute>
  );
};
export default UserIndex;
