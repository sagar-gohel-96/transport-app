import { Box, Divider, Group, Text, TextInput } from '@mantine/core';
import { Fragment, memo, useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import { TableToolbarProps } from '../../Table';

export const TableToolbar: React.FC<TableToolbarProps> = memo((props) => {
  const { title, leftContent, rightContent, showSearch } = props;
  const { value, setValue } = useContext(TableContext);

  return (
    <Box>
      {!!title && (
        <Fragment>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            px="sm"
          >
            <Group>
              <Text weight={500} py="md">
                {title}
              </Text>
              {leftContent}
            </Group>
            <Group>
              {rightContent}
              {showSearch && (
                <Box>
                  <TextInput
                    defaultValue={value}
                    placeholder="Search..."
                    style={{ flex: 1 }}
                    onChange={(event) => setValue(event.currentTarget.value)}
                  />
                </Box>
              )}
            </Group>
          </Box>
          <Divider />
        </Fragment>
      )}
    </Box>
  );
});
