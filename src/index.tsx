import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Mousetrap from "mousetrap";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import {
  downloadPDFLink,
  personalInfo,
  degrees,
  jobs,
} from "./config/config.json";

// https://chakra-ui.com/docs/features/responsive-styles
const COLUMN_WIDTH = [100, 150, 250, 305];
const ITEM_HEADER_FONT_SIZE = [6, 10, 16, 20];
const SECTION_HEADER_FONT_SIZE = [6, 12, 18, 24];
const LIST_ITEM_FONT_SIZE = [10, 12, 14, 18];
const PERSONAL_INFO_FONT_SIZE = [6, 10, 14, 18];
const NAME_FONT_SIZE = [12, 16, 34, 46];

type Degree = {
  id: string;
  title: string;
  schoolName: string;
  enrollmentDateRange: {
    startDateStr: string;
    endDateStr?: string;
  };
  description: string[]; // Bullet points
};

type Job = {
  id: string;
  role: string;
  companyName: string;
  employmentDateRange: {
    startDateStr: string;
    endDateStr?: string;
  };
  description: string[]; // Bullet points
  technologies?: string[]; // Adds a {technologiesSeparator = 'comma'}-separated list to the bottom
  technologiesSeparator?: string;
  isInternship?: boolean;
  isStudentJob?: boolean;
};

const get3ColumnHeaderElement = (
  first: string,
  second: string,
  third: string
) => (
  <HStack
    align="center"
    justify="space-between"
    fontWeight="bold"
    fontSize={ITEM_HEADER_FONT_SIZE}
    mb="2"
  >
    <Box w={COLUMN_WIDTH} textAlign="left">
      {first}
    </Box>
    <Box w={COLUMN_WIDTH} textAlign="center">
      <Center>{second}</Center>
    </Box>
    <Box w={COLUMN_WIDTH} textAlign="right">
      {third}
    </Box>
  </HStack>
);

const getListElement = (description: string[]) => (
  <List spacing="1" pl="4">
    {description.map((descriptionItem: string) => (
      <ListItem
        key={`${descriptionItem.substr(0, 10).replace(" ", "-")}`}
        fontSize={LIST_ITEM_FONT_SIZE}
      >
        {`- ${descriptionItem}`}
      </ListItem>
    ))}
  </List>
);

const getTechnologiesElement = (
  technologies: string[],
  technologiesSeparator = ", "
) => (
  <Flex pl="4" pt="1" fontWeight="bold" fontSize={LIST_ITEM_FONT_SIZE}>
    Technologies:
    <Text as="i" ml="2">
      {technologies.join(technologiesSeparator)}
    </Text>
  </Flex>
);

const Resume = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    Mousetrap.bind("t", () => toggleColorMode());

    return () => {
      Mousetrap.unbind("t");
    };
  }, [colorMode, toggleColorMode]);

  const { name, email, phone, socialUrls } = personalInfo;
  const personalInfoHeader = (
    <HStack
      align="center"
      justify="space-between"
      fontWeight="semibold"
      fontSize="lg"
    >
      <Box w={COLUMN_WIDTH} textAlign="left">
        <Stack spacing="1px" fontSize={PERSONAL_INFO_FONT_SIZE}>
          <a href={`mailto:${email}`}>
            <Text isTruncated _hover={{ textDecoration: "underline" }}>
              {email}
            </Text>
          </a>
          <Text>{phone}</Text>
        </Stack>
      </Box>
      <Box w={COLUMN_WIDTH} textAlign="center">
        <Center>
          <Text fontSize={NAME_FONT_SIZE}>{name}</Text>
        </Center>
      </Box>
      <Box w={COLUMN_WIDTH} textAlign="right">
        <Stack spacing="1px" fontSize={PERSONAL_INFO_FONT_SIZE}>
          {socialUrls["github"] && (
            <Link href={socialUrls["github"]} isExternal>
              GitHub
              <ExternalLinkIcon mx="2px" mb="3px" />
            </Link>
          )}
          {socialUrls["linkedin"] && (
            <Link href={socialUrls["linkedin"]} isExternal>
              LinkedIn
              <ExternalLinkIcon mx="2px" mb="3px" />
            </Link>
          )}
        </Stack>
      </Box>
    </HStack>
  );

  const dividerColor = useColorModeValue("black", "white");
  const divider = (
    <Box backgroundColor={dividerColor} width="100%" height="2px" mb={2} />
  );

  const employmentSection = (
    <>
      <Heading fontSize={SECTION_HEADER_FONT_SIZE}>Employment</Heading>
      {divider}
      {Object.values(jobs).map((job: Job) => {
        return (
          <Box key={job.id} marginBottom="3">
            {get3ColumnHeaderElement(
              job.role,
              job.companyName,
              `${job.employmentDateRange.startDateStr} - ${
                job.employmentDateRange.endDateStr || "Present"
              }`
            )}
            {getListElement(job.description)}
            {job.technologies && job.technologies.length
              ? getTechnologiesElement(job.technologies, ", ")
              : null}
          </Box>
        );
      })}
    </>
  );

  const educationSection = (
    <>
      <Heading fontSize={SECTION_HEADER_FONT_SIZE}>Education</Heading>
      {divider}
      {Object.values(degrees).map((degree: Degree) => {
        return (
          <Box key={degree.id} marginBottom="3">
            {get3ColumnHeaderElement(
              degree.title,
              degree.schoolName,
              `${degree.enrollmentDateRange.startDateStr} - ${
                degree.enrollmentDateRange.endDateStr || "Present"
              }`
            )}
            {getListElement(degree.description)}
          </Box>
        );
      })}
    </>
  );

  const awardsSection = (
    <>
      <Heading fontSize={SECTION_HEADER_FONT_SIZE}>Awards</Heading>
      {divider}
      <Box key="jp-morgan-code-for-good" marginBottom="3">
        {get3ColumnHeaderElement(
          "1st Place",
          "Code for Good Hackathon",
          "Oct 2015"
        )}
        {getListElement([
          "Won 1st place for developing a website that gamified the Goodwill donation process and displayed real-time updates using Kimonolabs web crawlers",
        ])}
      </Box>
    </>
  );

  const footer = (
    <Center>
      <Button
        aria-label="Download Resume"
        colorScheme="blue"
        onClick={() => {
          window.open(downloadPDFLink, "_blank");
        }}
        value="Resume"
      >
        <DownloadIcon />
        <Text ml={2}>PDF</Text>
      </Button>
    </Center>
  );

  return (
    <Box margin="auto" px={10} py={20} maxW="1200px">
      {personalInfoHeader}
      {employmentSection}
      {educationSection}
      {awardsSection}
      {footer}
    </Box>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Resume />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
