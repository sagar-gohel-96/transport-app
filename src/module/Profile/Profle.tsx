import {
  Button,
  Card,
  Group,
  Text,
  TextInput,
  Box,
  Image,
  Stack,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Photo } from 'tabler-icons-react';

interface UserBasicInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

interface UserContactInfoData {
  address: string;
  city: string;
  state: string;
}

export const UserBasicInfo = () => {
  const form = useForm<UserBasicInfoData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = (values: UserBasicInfoData) => {
    console.log(values);
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>Basic Info</Text>
            <Button variant="subtle" type="submit">
              Save
            </Button>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="md">
          <Group>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                minWidth: '250px',
              }}
            >
              <Group grow>
                <TextInput
                  placeholder="First Name"
                  label="First Name"
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  placeholder="Last Name"
                  label="Last Name"
                  {...form.getInputProps('lastName')}
                />
              </Group>

              <TextInput
                type="email"
                placeholder="Email"
                label="Email"
                {...form.getInputProps('email')}
              />
              <TextInput
                placeholder="Phone"
                label="Phone"
                {...form.getInputProps('phone')}
              />
              <TextInput
                placeholder="Birth Date"
                label="Birth Date"
                {...form.getInputProps('dob')}
              />
            </div>

            <Box
              sx={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack sx={{ textAlign: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <Image
                    height={160}
                    width={160}
                    radius={80}
                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    withPlaceholder
                  />
                  <Button
                    variant="subtle"
                    radius="xl"
                    px={3}
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[4]
                          : theme.colors.gray[2],
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      '&:hover': {
                        backgroundColor:
                          theme.colorScheme === 'dark'
                            ? theme.colors.dark[5]
                            : theme.colors.gray[2],
                      },
                    })}
                  >
                    <Photo size={24} strokeWidth={1.5} />
                  </Button>
                </div>

                <Text size="sm">Change Image</Text>
              </Stack>
            </Box>
          </Group>
        </Card.Section>
      </Card>
    </form>
  );
};

export const UserContactInfo = () => {
  const form = useForm<UserContactInfoData>({
    initialValues: {
      address: '',
      city: '',
      state: '',
    },

    validate: {},
  });

  const handleSubmit = (values: UserContactInfoData) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section inheritPadding py="xs" withBorder>
          <Group position="apart">
            <Text weight={500}> Contact Info</Text>
            <Button variant="subtle" type="submit">
              Save
            </Button>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="md">
          <div>
            <Textarea
              placeholder="Address"
              label="Address"
              {...form.getInputProps('address')}
            />
            <TextInput
              placeholder="City"
              label="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              placeholder="State"
              label="State"
              {...form.getInputProps('state')}
            />
          </div>
        </Card.Section>
      </Card>
    </form>
  );
};

export const Profile = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <UserBasicInfo />
      <UserContactInfo />
    </div>
  );
};
