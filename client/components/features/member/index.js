import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGuild, fetchGuildAsync, fetchMembersAsync } from "./homeSlice";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuildAsync());
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const guild = useSelector(selectGuild)

  //console.log(guild);

  return <h1>{guild}</h1>;
};

export default Home;
