import {
  Card,
  Group,
  Button,
  TextInput,
  Image,
  Text,
  Box,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Photo } from "tabler-icons-react";
import { UserResponse } from "../../../../types/userType";

export interface UserBasicInfoData {
  name: string;
  email: string;
  birthDate: string;
}

interface UserBasicInfoProps {
  user: UserResponse;
  upadteUser: (_id: string, values: UserBasicInfoData) => void;
}

export const UserBasicInfo = (props: UserBasicInfoProps) => {
  const { user, upadteUser } = props;

  const form = useForm<UserBasicInfoData>({
    initialValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      birthDate: user.birthDate ?? "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: UserBasicInfoData) => {
    const _id = user._id;
    upadteUser(_id, values);
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
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "250px",
              }}
            >
              <Group grow>
                <TextInput
                  placeholder="Name"
                  label="Name"
                  value={user.name}
                  {...form.getInputProps("name")}
                />
              </Group>

              <TextInput
                type="email"
                placeholder="Email"
                label="Email"
                {...form.getInputProps("email")}
              />

              {/* <DatePicker
                placeholder="Birth Date"
                label="Birth Date"
                {...form.getInputProps("dob")}
              /> */}
              <TextInput
                // type="email"
                placeholder=""
                label="Birth Date"
                {...form.getInputProps("birthDate")}
              />
            </div>

            <Box
              sx={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack sx={{ textAlign: "center" }}>
                <div style={{ position: "relative" }}>
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
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[4]
                          : theme.colors.gray[2],
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
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
