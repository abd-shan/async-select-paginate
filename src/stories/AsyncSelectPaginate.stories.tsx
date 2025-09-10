import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AsyncSelectPaginate from '../components/AsyncSelectPaginate';
import { AsyncSelectPaginateProps } from '../types';

export default {
  title: 'Components/AsyncSelectPaginate',
  component: AsyncSelectPaginate,
} as Meta;

const Template: StoryFn<AsyncSelectPaginateProps<any>> = (args:any) => (
  <AsyncSelectPaginate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  loadOptions: async (search:any, page:any) => {
    return {
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      hasMore: false
    };
  },
  getOptionLabel: (item:any) => item.name,
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  ...Default.args,
  styles: {
    control: (base:any) => ({
      ...base,
      border: '2px solid #1890ff',
      borderRadius: '10px'
    })
  }
};
