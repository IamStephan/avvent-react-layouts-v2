import React from 'react';
import { Flex } from '../../dist/index';

export default {
  title: '02 - Playground/01 - Flex'
};


export const Flex1 = () => (
  <Flex
    debug
    gap={10}

    style={{
      height: '100vh'
    }}
  >
    <Flex.Box
      col={6}
    >
      One Of Two
    </Flex.Box>

    <Flex.Box
      col={6}
    >
      Two of Two
    </Flex.Box>

    <Flex.Box
      col={2}
    >
      <Flex
        debug
        gap={10}
      >
        <Flex.Box
          col={12}
        >
          ygubj
        </Flex.Box>
      </Flex>
    </Flex.Box>
  </Flex>
);