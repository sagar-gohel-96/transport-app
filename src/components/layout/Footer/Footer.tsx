import { Footer as MantineFooter, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <MantineFooter height={60} p="md">
      <Text
        sx={(theme) => ({
          color: theme.colorScheme === 'dark' ? 'white' : 'black',
          fontSize: theme.fontSizes.md,
          textAlign: 'center',
        })}
      >
        Transport System &#169; {new Date().getFullYear()}
      </Text>
    </MantineFooter>
  );
};
