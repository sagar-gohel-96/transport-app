import {
  Button,
  Card,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { AreaPayload } from "../../../../types";

interface AreaFormProps {
  form: UseFormReturnType<AreaPayload>;
  handleSubmit: (values: AreaPayload) => void;
}

export const AreaForm = ({ form, handleSubmit }: AreaFormProps) => {
  return (
    <form onSubmit={form.onSubmit((values) => console.log("val", values))}>
      <Stack spacing="md">
        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Basic Details
            </Text>
          </Card.Section>
          <SimpleGrid cols={3} py="sm">
            <TextInput
              required
              label="Area Name"
              placeholder="Area Name"
              {...form.getInputProps("areaName")}
            />
            <TextInput
              required
              label="City"
              placeholder="City"
              {...form.getInputProps("city")}
            />
            <TextInput
              required
              label="Contact Person"
              placeholder="Contact Person"
              {...form.getInputProps("name")}
            />
          </SimpleGrid>
          <Button
            type="submit"
            variant="outline"
            color="primaryBlue"
            sx={(theme) => ({
              marginTop: "18px",
              display: "flex",
              flex: "1",
            })}
          >
            Submit
          </Button>
        </Card>
      </Stack>
    </form>
  );
};
