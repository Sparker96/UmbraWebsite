import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMember, fetchMemberAsync } from "./memberSlice";
import {
  selectMemberMedia,
  fetchMemberMediaAsync,
} from "../memberMedia/memberMediaSlice";
import { useParams } from "react-router-dom";

const Member = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(fetchMemberAsync(name));
    dispatch(fetchMemberMediaAsync(name));
  }, [dispatch]);

  const member = useSelector(selectMember);

  const media = useSelector(selectMemberMedia);

  console.log("member", member);
  console.log("media", media);

  return (
    <div className="memberPage">
      {member.name && media.assets ? (
        <div className="memberContainer">
          <div className="memberHeader">
            <div className="memberSummary">
              <div id="memberAvatar"><img src={media.assets[1].value} /></div>
              <div id="memberDetails">
                <ul>
                  <li>
                  {member.name}
                  </li>
                  <li>
                  {member.character_class.name} 
                  </li>
                  <li>
                  Lvl: {member.level}
                  </li>
                  <li>
                  iLvl: {member.average_item_level}
                  </li>
                </ul>
              </div>
              </div>
            <div className="memberLinks">
              <a id="raider_io" href={`https://raider.io/characters/us/illidan/${name}`}><img src="https://cdnassets.raider.io/images/fb_app_image.jpg?2019-11-18" /></a>
              <a id="warcraft_logs" href={`https://www.warcraftlogs.com/character/us/illidan/${name}`}><img src="https://pbs.twimg.com/profile_images/1550453257947979784/U9D70T0S_400x400.jpg" /></a>
              <a id="wow_armory" href={`https://worldofwarcraft.blizzard.com/en-us/character/us/illidan/${name}`}><img src="https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/4d/f9/e4/4df9e494-e6be-8c34-1ef1-a81e40c0f8e0/source/512x512bb.jpg" /></a>
            </div>
          </div>
          <div
            className="memberContent"
            // style={{
            //   backgroundImage: `url(${media.assets[2].value})`,
            // }}
          >
            <img src={media.assets[2].value} />
          </div>
          <div className="memberFooter"></div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default Member;
