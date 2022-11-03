import { Button, Card, Group, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserResponse } from "../../../../types/userType";

interface UserContactInfoData {
  address: string;
  city: string;
  state: string;
  phone: string;
}

interface UserContactInfoProps {
  user: UserResponse;
  upadteUser: (_id: string, values: UserContactInfoData) => void;
}

export const UserContactInfo = ({ user, upadteUser }: UserContactInfoProps) => {
  const form = useForm<UserContactInfoData>({
    initialValues: {
      address: user.address ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
      phone: user.phone ?? "",
    },

    validate: {},
  });

  const handleSubmit = async (values: UserContactInfoData) => {
    const _id = user._id;
    upadteUser(_id, values);
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
              {...form.getInputProps("address")}
            />
            <TextInput
              placeholder="City"
              label="City"
              {...form.getInputProps("city")}
            />
            <TextInput
              placeholder="State"
              label="State"
              {...form.getInputProps("state")}
            />
            <TextInput
              placeholder="Phone"
              label="Phone"
              {...form.getInputProps("phone")}
            />
          </div>
        </Card.Section>
      </Card>
    </form>
  );
};
