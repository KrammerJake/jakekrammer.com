import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
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
} from '@chakra-ui/react';
import Mousetrap from 'mousetrap';
import React, { useEffect } from 'react';

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

const DEGREES: { [degreeId: string]: Degree } = {
  bs_cs_asu: {
    id: 'bs_cs_asu',
    schoolName: 'Arizona State University',
    title: 'B.S. in Computer Science',
    enrollmentDateRange: {
      startDateStr: 'Aug 2012',
      endDateStr: 'Dec 2016',
    },
    description: [
      'Undergraduate teaching assistant for CSE 205 (Object-Oriented Programming and Data Structures with Java) ',
      'Capstone Project: Integrating TweetTracker with Humanitarian Data Exchange Data Sets',
      'GPA: 3.55',
    ],
  },
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

const JOBS: { [jobId: string]: Job } = {
  gk: {
    id: 'gk',
    role: 'Senior Software Developer',
    companyName: 'GitKraken',
    employmentDateRange: {
      startDateStr: 'Aug 2017',
      endDateStr: 'Dec 2020',
    },
    description: [
      'Securely integrated multiple third-party APIs including GitHub, GitLab, AWS, and Google',
      'Designed reusable and easy-to-use React components as part of our component library',
      'Developed an LRU cache and tab system that allowed GitKraken to open multiple repositories simultaneously',
      'Architected a performance monitoring system using a "Canary" machine to report regressions found in staging builds',
      'Worked directly with product owners, marketing, and sales to develop and launch the GitKraken referrals program',
      'Led daily stand-up meetings and communicated status updates and blockers to stakeholders early and often',
    ],
    technologies: 'Typescript, Node.js, React, Redux, Electron.js, AWS, mongoDB, Git, GitKraken'.split(
      ', '
    ),
  },
  rp: {
    id: 'rp',
    role: 'Software Developer',
    companyName: 'RevolutionParts, Inc.',
    employmentDateRange: {
      startDateStr: 'Sep 2016',
      endDateStr: 'Aug 2017',
    },
    description: [
      'Developed a suite of REST APIs to allow internal and external applications to access auto parts data',
      'Created numerous wrappers around third-party APIs including eBay, HubSpot, and AWS',
      'Implemented internal CRM integration with HubSpot',
    ],
    technologies: 'PHP, Node.js, MySQL, AWS, Git, GitHub, Postman, Kibana, SQS'.split(
      ', '
    ),
  },
  cap1: {
    id: 'cap1',
    role: 'Software Developer (Intern)',
    companyName: 'Capital One',
    employmentDateRange: {
      startDateStr: 'Jun 2016',
      endDateStr: 'Aug 2016',
    },
    description: [
      'Built microservices to automate performance tests on mobile and web applications',
      'Developed pipeline to simplify the building, testing, deployment, and documentation of microservices',
      'Created web application to manage the results of performance tests run on internal applications',
    ],
    technologies: 'Java/Spring, mongoDB, Git, Swagger, Docker, ECS'.split(', '),
    isInternship: true,
  },
  asu: {
    id: 'asu',
    role: 'Software Developer (Student)',
    companyName: 'Arizona State University',
    employmentDateRange: {
      startDateStr: 'Oct 2015',
      endDateStr: 'Apr 2016',
    },
    description: [
      'Developed a responsive web application to track graduate student progress within ASU’s Department of Speech and Hearing',
      'Designed database table schemas and used Entity Framework to represent database relationships',
      'Worked closely with product managers and end users to understand product requirements and deliver an engaging user experience',
    ],
    technologies: ' C#/.NET, Entity Framework, .NET Web API, Bootstrap, AngularJS, Microsoft SQL Server'.split(
      ', '
    ),
    isStudentJob: true,
  },
  xom: {
    id: 'xom',
    role: 'Software Developer (Intern)',
    companyName: 'ExxonMobil',
    employmentDateRange: {
      startDateStr: 'May 2015',
      endDateStr: 'Aug 2015',
    },
    description: [
      'Built an internal web application that automated troubleshooting devices on ExxonMobil’s network',
      'Constructed a data warehouse and performed E.T.L. to combine data from log files, documents, and internal databases',
      'Deployed application to IIS',
    ],
    technologies: 'C#/.NET, Entity Framework, Bootstrap, Microsoft SQL Server, SQL Server Integration Services'.split(
      ', '
    ),
    isInternship: true,
  },
};

const getHeaderElement = (first: string, second: string, third: string) => (
  <HStack
    align="center"
    justify="space-between"
    fontWeight="bold"
    fontSize="lg"
    mb="2"
  >
    <Box w={350} textAlign="left">
      {first}
    </Box>
    <Box w={350} textAlign="center">
      <Center>{second}</Center>
    </Box>
    <Box w={350} textAlign="right">
      {third}
    </Box>
  </HStack>
);

const getListElement = (description: string[]) => (
  <List spacing="1" pl="4">
    {description.map((descriptionItem: string) => (
      <ListItem key={`${descriptionItem.substr(0, 10).replace(' ', '-')}`}>
        {`- ${descriptionItem}`}
      </ListItem>
    ))}
  </List>
);

const getTechnologiesElement = (
  technologies: string[],
  technologiesSeparator = ', '
) => (
  <Flex pl="4" py="1" fontWeight="bold">
    Technologies:
    <Text as="i" ml="2">
      {technologies.join(technologiesSeparator)}
    </Text>
  </Flex>
);

const Resume = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    Mousetrap.bind('t', () => toggleColorMode());

    return () => {
      Mousetrap.unbind('t');
    };
  }, [colorMode, toggleColorMode]);

  const personalInfo = (
    <HStack
      align="center"
      justify="space-between"
      fontWeight="semibold"
      fontSize="lg"
    >
      <Box w={350} textAlign="left">
        <Stack spacing="1px">
          <Text>jake.krammer1@gmail.com</Text>
          <Text>(602) 501-5116</Text>
        </Stack>
      </Box>
      <Box w={350} textAlign="center">
        <Center>
          <Text fontSize="34px">Jake Krammer</Text>
        </Center>
      </Box>
      <Box w={350} textAlign="right">
        <Stack spacing="1px">
          <Link href="https://github.com/KrammerJake" isExternal>
            GitHub <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jake-krammer-b2909397/"
            isExternal
          >
            LinkedIn <ExternalLinkIcon mx="2px" />
          </Link>
        </Stack>
      </Box>
    </HStack>
  );

  const dividerColor = useColorModeValue('black', 'white');

  const divider = (
    <Box backgroundColor={dividerColor} width="100%" height="2px" />
  );

  const awards = (
    <>
      <Heading fontSize={24}>Awards</Heading>
      {divider}
      <Box key="jp-morgan-code-for-good" marginBottom="3">
        {getHeaderElement('1st Place', 'Code for Good Hackathon', 'Oct 2015')}
        {getListElement([
          'Won 1st place for developing a website that gamified the Goodwill donation process and displayed real-time updates using Kimonolabs web crawlers',
        ])}
      </Box>
    </>
  );

  return (
    <>
      <Center px={40} py={20} maxW="95vw" spacing={5}>
        <Stack>
          {personalInfo}
          <Stack>
            <Heading fontSize={24}>Employment</Heading>
            {divider}
            {Object.values(JOBS).map((job: Job) => {
              return (
                <Box key={job.id} marginBottom="3">
                  {getHeaderElement(
                    job.role,
                    job.companyName,
                    `${job.employmentDateRange.startDateStr} - ${
                      job.employmentDateRange.endDateStr || 'Present'
                    }`
                  )}
                  {getListElement(job.description)}
                  {job.technologies && job.technologies.length
                    ? getTechnologiesElement(job.technologies, ', ')
                    : null}
                </Box>
              );
            })}
            <Heading fontSize={24}>Education</Heading>
            {divider}
            {Object.values(DEGREES).map((degree: Degree) => {
              return (
                <Box key={degree.id} marginBottom="3">
                  {getHeaderElement(
                    degree.title,
                    degree.schoolName,
                    `${degree.enrollmentDateRange.startDateStr} - ${
                      degree.enrollmentDateRange.endDateStr || 'Present'
                    }`
                  )}
                  {getListElement(degree.description)}
                </Box>
              );
            })}
            {awards}
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default Resume;
