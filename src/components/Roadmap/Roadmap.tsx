import { CheckIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import { Level, RoadmapItem } from "../../entity/RoadmapItem";
import LevelItem from "../Level/LevelItem";


type Props = {
    data: Level[];
    title: string;
}

export default function Roadmap(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();

  return (
    <>
      <h2 className="text-center font-bold text-3xl c-yellow my-6 txt-handwritten c-dark-brown">
        {props.title}
      </h2>

      <div>
        {props.data.map((level, index, data) => {
          return (
            <LevelItem
              key={index}
              level={level}
              index={index}
              levelsQty={data.length}
              onOpen={onOpen}
              setActiveItem={setActiveItem}
            />
          );
        })}
      </div>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bd-handwritten">
          <ModalHeader>{activeItem?.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="mb-4">{activeItem?.description}</p>
            <Accordion allowToggle>
              {activeItem?.children?.map((child, index) => {
                return (
                  <AccordionItem key={child.label}>
                    
                    <h2 className="font-semibold">
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {child.label}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {child.links?.length
                        ? child.links?.map((link, index) => {
                            return (
                              <>
                                <Flex className="my-2">
                                  <Link href={link.url} isExternal>
                                    {link.label}
                                  </Link>
                                  <Spacer />
                                  <Badge
                                    cursor={"pointer"}
                                    colorScheme="green"
                                    p={1}
                                    rounded={"md"}
                                    className="h-7"
                                  >
                                    <CheckIcon mr={2} />
                                    <span>{link.votes ? link.votes : "0"}</span>
                                  </Badge>
                                </Flex>
                              </>
                            );
                          })
                        : "Ainda não possuimos conteúdo."}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
