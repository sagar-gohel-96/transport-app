import {
  Button,
  Card,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { AddPartyData } from '../../../../types';

interface PartyFormProps {
  form: UseFormReturnType<AddPartyData>;
  handleSubmit: (values: AddPartyData) => void;
}

export const PartyForm = ({ form, handleSubmit }: PartyFormProps) => {
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="md">
        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Basic Details
            </Text>
          </Card.Section>
          <SimpleGrid cols={1} py="sm">
            <TextInput
              type="number"
              label="Party Code"
              radius="md"
              placeholder="10001"
              {...form.getInputProps('partyCode')}
            />
            <TextInput
              required
              label="Name"
              radius="md"
              placeholder="Party Name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Category"
              radius="md"
              placeholder="Category"
              {...form.getInputProps('category')}
            />
          </SimpleGrid>
        </Card>
        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Address Details
            </Text>
          </Card.Section>
          <SimpleGrid py="sm">
            <Textarea
              required
              label="Street / Area"
              radius="md"
              placeholder="Street / Area"
              {...form.getInputProps('address')}
            />
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
            >
              <TextInput
                required
                label="City"
                radius="md"
                placeholder="City"
                {...form.getInputProps('city')}
              />
              <NumberInput
                type="number"
                maxLength={6}
                minLength={6}
                label="Pin Code"
                radius="md"
                placeholder="Pin Code"
                {...form.getInputProps('pincode')}
              />

              <TextInput
                label="District"
                radius="md"
                placeholder="District"
                {...form.getInputProps('district')}
              />
              <TextInput
                label="State"
                radius="md"
                placeholder="State"
                {...form.getInputProps('state')}
              />
            </SimpleGrid>
          </SimpleGrid>
        </Card>
        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Contact Details
            </Text>
          </Card.Section>
          <SimpleGrid py="sm">
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
            >
              <TextInput
                label="Contact Person"
                radius="md"
                placeholder="Conatct Person"
                {...form.getInputProps('contactPerson')}
              />
              <TextInput
                required
                label="Phone Number"
                radius="md"
                placeholder="Phone Number"
                {...form.getInputProps('phoneNumber')}
              />
            </SimpleGrid>

            <TextInput
              label="Your Email"
              radius="md"
              placeholder="Your Email"
              {...form.getInputProps('email')}
            />
          </SimpleGrid>
        </Card>

        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Billing Details
            </Text>
          </Card.Section>
          <SimpleGrid
            breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
            py="sm"
          >
            <SimpleGrid cols={2}>
              <TextInput
                required
                label="GSTIN"
                radius="md"
                placeholder="GSTIN"
                {...form.getInputProps('GSTIN')}
              />
              <TextInput
                label="PAN"
                radius="md"
                placeholder="PAN"
                {...form.getInputProps('PAN')}
              />
            </SimpleGrid>
            <SimpleGrid
              cols={3}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
            >
              <NumberInput
                label="Credit Limit"
                radius="md"
                placeholder="Credit Limit"
                {...form.getInputProps('creditLimit')}
              />
              <NumberInput
                label="Credit Period"
                radius="md"
                placeholder="Credit Period"
                {...form.getInputProps('creditPeriod')}
              />
              <NumberInput
                label="Credit Invoices"
                radius="md"
                placeholder="Credit Invoices"
                {...form.getInputProps('creditInvoice')}
              />
            </SimpleGrid>
          </SimpleGrid>
          <Button
            type="submit"
            variant="outline"
            color="primaryBlue"
            sx={(theme) => ({
              marginTop: '18px',
              display: 'flex',
              flex: '1',
            })}
          >
            Submit
          </Button>
        </Card>
      </Stack>
    </form>
  );
};
