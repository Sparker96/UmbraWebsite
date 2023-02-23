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
    <>
      {!member == null || !media == null ? (
        <h1>Loading</h1>
      ) : (
        <div className="memberPage">
          <h1>{member.name}</h1>
        </div>
      )}
    </>
  );
};

export default Member;
