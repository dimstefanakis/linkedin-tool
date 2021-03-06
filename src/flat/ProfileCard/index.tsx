import { useState, useContext } from "react";
import { Flex, Box, Text, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import {
  AiFillLinkedin,
  AiFillMail,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { ProfileInterface } from "../Profile/interface";
import { ProfileContext } from "../../context/ProfileContext";

interface ProfileCardProps {
  profile: ProfileInterface;
  profiles: ProfileInterface[];
  setProfiles: (profiles: ProfileInterface[]) => void;
}

function ProfileCard({ profile, profiles, setProfiles }: ProfileCardProps) {
  const profileContext = useContext(ProfileContext);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [denyLoading, setDenyLoading] = useState<boolean>(false);

  async function handleMarkProfileInSheet(profile: ProfileInterface) {
    let url = `https://api.sheety.co/6db0166e73d47e215afcb6675c9f83d9/test/sheet/${profile.id}`;
    let body = {
      sheet: profile,
    };
    let response = await fetch(url, {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(body),
    });
    let data = await response.json();
    setApproveLoading(false);
    setDenyLoading(false);
  }

  async function handleMark(id: number, approved: boolean) {
    let updatedProfiles = profiles.map((profile) => {
      if (profile.id === id) {
        profile.approved = approved;
      }
      return profile;
    });

    if (approved) {
      setApproveLoading(true);
    } else {
      setDenyLoading(true);
    }
    // update in sheet
    let updatedProfile = profiles.find((oldProfile) => oldProfile.id == id);
    let updatedProfileIndex = profiles.findIndex(
      (oldProfile) => oldProfile.id == id
    );

    if (updatedProfile) {
      await handleMarkProfileInSheet(updatedProfile);
    }
    // update in state
    setProfiles(updatedProfiles);
    profileContext.setIndex(Math.min(updatedProfileIndex + 1, profiles.length));
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      p={4}
      py={10}
      m={2}
      w="100%"
      maxW="500px"
      boxShadow="lg"
    >
      <Flex
        w="100%"
        flexFlow="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          name={profile.firstName}
          size="xl"
          src="https://bit.ly/broken-link"
          boxShadow="lg"
        ></Avatar>
        <Box mt={6}>
          <Text fontWeight="bold" fontSize="xl">
            {profile.firstName} {profile.lastName}
          </Text>
        </Box>
        <Box mt={1}>
          <Text color="gray.500">
            {profile.title} @ {profile.company}
          </Text>
        </Box>
        <Flex w="100%" mt={16} flexFlow="column">
          {profile.profile && (
            <Link
              href={profile.profile}
              target="_blank"
              display="flex"
              alignItems="center"
            >
              <AiFillLinkedin size="1.4em" />
              <Text ml={2}>{profile.profile}</Text>
            </Link>
          )}
          {profile.email && (
            <Flex alignItems="center" mt={2}>
              <AiFillMail size="1.4em" />
              <Text ml={2}>{profile.email}</Text>
            </Flex>
          )}
          {profile.note && (
            <Flex mt={2}>
              <AiFillExclamationCircle size="1.4em" />
              <Text ml={2}>{profile.note}</Text>
            </Flex>
          )}
        </Flex>
        <Flex mt={16} w="100%" justifyContent="space-evenly">
          <Button
            isLoading={approveLoading}
            colorScheme="linkedin"
            onClick={() => handleMark(profile.id, true)}
          >
            Approve
          </Button>
          <Button
            isLoading={denyLoading}
            onClick={() => handleMark(profile.id, false)}
          >
            Deny
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProfileCard;
