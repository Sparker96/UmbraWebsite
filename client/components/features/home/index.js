import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGuild, fetchGuildAsync } from "../guild/guildSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuildAsync());
  }, [dispatch]);

  const guild = useSelector(selectGuild);

  return (
    <div className="homePage">
    <h1>{guild.name} Guild</h1>
    <h2>{guild.server}</h2>
    <p>{guild.description}</p>
    </div>
  );
};

export default Home;
