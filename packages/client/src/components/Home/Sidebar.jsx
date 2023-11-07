import { Button } from "@chakra-ui/button";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Circle,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from ".";
import AddFriendModal from "./AddFriendModal";
import { useDisclosure } from "@chakra-ui/react";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList} w="100%">
          {friendList.map((friend) => (
            <HStack
              as={Tab}
              w="100%"
              justify="start"
              borderBottom="1px solid gray"
            >
              <Circle
                bg={friend.connected ? "green.700" : "red.500"}
                w="10px"
                h="10px"
              />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      {isOpen && <AddFriendModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Sidebar;
