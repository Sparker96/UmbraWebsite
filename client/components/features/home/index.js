import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHome, fetchGuildAsync } from "./homeSlice";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuildAsync());
  }, [dispatch]);

  const guild = useSelector(selectHome)

  //console.log(guild);

  return <h1>{guild}</h1>;
};

export default Home;
