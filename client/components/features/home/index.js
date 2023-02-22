import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGuild, fetchGuildAsync } from "../guild/guildSlice";
import { selectMember, fetchMembersAsync } from "../member/memberSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuildAsync());
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const guild = useSelector(selectGuild);
  const members = useSelector(selectMember);

  console.log(members.members);

  return (
    <>
      <h1>{guild}</h1>
      {!members.members ? (
        <h1>Loading</h1>
      ) : (
      <ul>
          {members.members.map((member) => {
            return (
              <li key={member.character.id}>
                <h2>
                  {member.character.name}
                </h2>
                <p>Level: {member.character.level}</p>
              </li>
            );
          })}
        </ul>
  )}
    </>
  );
};

export default Home;
