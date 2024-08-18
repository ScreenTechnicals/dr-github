"use client";

import { auth } from "@/configs";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const [userReadme, setUserReadme] = useState("");

  const getUserReadme = async () => {
    try {
      const username = (user as any)?.reloadUserInfo?.screenName;
      let config = {
        method: "get",
        url: `https://raw.githubusercontent.com/${username}/${username}/main/README.md`,
      };

      axios
        .request(config)
        .then((response) => {
          setUserReadme(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      getUserReadme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const options = {
    overrides: {
      p: {
        props: {
          className: "leading-7",
        },
      },
      h2: {
        props: {
          className: "text-3xl font-semibold my-2",
        },
      },
      h3: {
        props: {
          className: "text-xl font-semibold my-2",
        },
      },
      ul: {
        props: {
          className: "mb-2 underline",
        },
      },
      img: {
        props: {
          className: "w-full my-2 h-full",
        },
      },
      div: {
        props: {
          className: "w-full grid md:grid-cols-2",
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center pt-5">
      <div className="mx-auto w-[90%] md:w-[80%] font-light">
        <Markdown options={options}>{userReadme}</Markdown>
      </div>
    </div>
  );
};

export default ProfilePage;
