import React from 'react';
import { Heading } from 'theme-ui';
import { Logo } from './Logo';
import { FadeInText } from './FadeInText';
import { LoginButton } from './Login/LoginButton';
import { gql, useQuery } from '@apollo/client';

const GET_INTRO_NARRATION = gql`
  query GetIntroNarration {
    narrations(where: { name: "test" }) {
      id
      text
    }
  }
`;

const App = () => {
  const { loading, data } = useQuery(GET_INTRO_NARRATION);

  const loadingText = <FadeInText>Loading...</FadeInText>;
  const narrationText = (
    <FadeInText
      done={() => {
        console.log('narration done');
      }}
    >
      {data?.narrations?.[0]?.text || ''}
    </FadeInText>
  );

  const text = loading ? loadingText : narrationText;

  return (
    <header
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Logo />
      <Heading as="h1" sx={{ fontSize: 7 }}>
        Project Dusk
      </Heading>
      <Heading as="h2">{text}</Heading>
      <LoginButton />
    </header>
  );
};

export default App;
