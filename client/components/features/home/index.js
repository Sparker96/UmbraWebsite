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
    <h1>Umbra Guild</h1>
    <h2>Illidan</h2>
    <p>We are a Top 100 raiding and Mythic+ guild that is CE (cutting edge) focused. Progression is currently 4/8 Mythic and 8/8 Heroic. We are Looking for RetPal/Hpriest/PresEvoker/Mage/Competitive DPS players

Right now we are striving to be a top 100 2 day raiding guild and are working hard to achieve that end goal.

If you are interested in joining us, please add Rageyy#1452 bnet / rageyy#4684 discord or apply to Umbra on Illidan through the guild app in-game. 

Thank you and we look forward to hear from you!</p>
    </div>
  );
};

export default Home;
