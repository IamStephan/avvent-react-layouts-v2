import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { FlexGrid as Flex } from '../../dist/index';

export default {
  title: '01 - Playground/01 - Flex',
  decorators: [withKnobs]
};


export const Flex1 = () => {
  const gap1 = number('Horizontal Gap', 10, {}, 'Parent Layout')
  const gapV1 = number('Vertical Gap', 10, {}, 'Parent Layout')
  const columns1 = number('Columns', 12, {}, 'Parent Layout')

  const gap2 = number('Horizontal Gap', 10, {}, 'Nested Layout')
  const gapV2 = number('Vertical Gap', 10, {}, 'Nested Layout')
  const columns2 = number('Columns', 12, {}, 'Nested Layout')

  return (
    <Flex
      debug
      gap={gap1}
      gapV={gapV1}
      columns={columns1}

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
        col={6}
      >
        <Flex
          debug
          gap={gap2}
          gapV={gapV2}
          columns={columns2}
        >
          <Flex.Box
            col={12}
          >
            Nested Layout box
          </Flex.Box>
        </Flex>
      </Flex.Box>
    </Flex>
  )
};