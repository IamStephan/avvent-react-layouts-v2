import React from 'react';
import { Grid, Flex, Box } from '@avvent/react-layouts';

export default {
  title: '02 - examples/01 - Hero'
};


export const JustTesting = () => (
  <Grid
    debug 
    grid={{
      columns: '1fr 1fr',
      rows: 'auto',
      areas: [
        'content media'
      ]
    }}

    grid-tablet={{
      columns: '1fr',
      rows: '1fr 1fr',
      areas: [
        'media',
        'content'
      ]
    }}

    style={{
      minHeight: '100vh',
    }}
  >
    <Box
      area='content'
    >
      <Flex
        debug
        place-items={{align: 'center', justify: 'center'}}
        style={{minHeight: '100%'}}
      >
        <Box
          spacing={{
            padding: 10
          }}
        >
          <h1>
            I am the Hero title
          </h1>
          <p>An i will be the content</p>
          <button onClick={() => alert('lol, you listened😄')}>Press me</button>
        </Box>
      </Flex>
    </Box>

    <Box
      area='media'
    >
      <Flex
        debug
        place-items={{align: 'center', justify: 'center'}}
        style={{minHeight: '100%'}}
      >
        <Box
          spacing={{
            padding: 10
          }}
        >
          <h1>
            HERO IMAGE
          </h1>
        </Box>
      </Flex>
    </Box>
  </Grid>
);