import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useRef } from 'react';
import {
  Category,
  Mail,
  MapPin,
  Phone,
  Photo,
  PhotoUp,
  User,
  Users,
} from 'tabler-icons-react';
import { Dropzon } from '../../../components/common';
import { AddCompanyData } from '../../../types';
import { UserResponse } from '../../../types/userType';

interface FileUploadProps {
  headerImageUrl: string;
  logoImageUrl: string;
  setHeaderImageUrl: (value: string) => void;
  setLogoImageUrl: (value: string) => void;
  setProgresspercent: (value: number) => void;
}

interface CompanyFormProps {
  form: UseFormReturnType<AddCompanyData>;
  handleSubmit: (values: AddCompanyData) => void;
  fileUpload: FileUploadProps;
  user: UserResponse;
}

export const CompanyForm = ({
  form,
  handleSubmit,
  fileUpload,
  user,
}: CompanyFormProps) => {
  const {
    headerImageUrl,
    logoImageUrl,
    setHeaderImageUrl,
    setLogoImageUrl,
    setProgresspercent,
  } = fileUpload;

  const openHeaderImageRef = useRef<() => void>(null);
  const openLogoImageRef = useRef<() => void>(null);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing="md">
        <Card withBorder radius="sm" py="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Header Images
            </Text>
          </Card.Section>
          <Card.Section withBorder inheritPadding py="xs">
            <Box sx={{ display: 'flex', flex: 1, gap: 16 }}>
              <Stack>
                {/* <Text align="left" weight={600} size="md">
                Logo Image
              </Text> */}
                {!logoImageUrl && (
                  <Dropzon
                    openRef={openLogoImageRef}
                    folderName={`${user?._id}/company-logo-image`}
                    description={{
                      title: 'Logo Image',
                    }}
                    setImgUrl={setLogoImageUrl}
                    setProgresspercent={setProgresspercent}
                    sx={{ borderRadius: 100, width: 200 }}
                    children={
                      <Stack align="center">
                        <Photo size={48} strokeWidth={2} color={'black'} />
                        <Text>Logo Image</Text>
                      </Stack>
                    }
                  />
                )}

                {logoImageUrl && (
                  <Group
                    position="center"
                    sx={(theme) => ({
                      border: '1px solid',
                      borderColor: theme.colors.gray[4],
                      borderRadius: 4,
                      position: 'relative',
                    })}
                  >
                    <Image
                      fit="contain"
                      src={logoImageUrl}
                      alt="Logo image"
                      height={200}
                      width={200}
                    />

                    <ActionIcon
                      variant="filled"
                      sx={{ position: 'absolute', top: 4, right: 4 }}
                      onClick={() => openLogoImageRef.current!()}
                    >
                      <PhotoUp />
                    </ActionIcon>
                  </Group>
                )}
              </Stack>

              <Stack sx={{ display: 'flex', flex: 1 }}>
                {/* <Text align="left" weight={600} size="md">
                Header Image
              </Text> */}
                {!headerImageUrl && (
                  <Dropzon
                    openRef={openHeaderImageRef}
                    folderName={`${user?._id}/company-header-image`}
                    description={{
                      title: 'Upload Company Header Image',
                      aboutImage: 'File should not exceed 5mb',
                    }}
                    setImgUrl={setHeaderImageUrl}
                    setProgresspercent={setProgresspercent}
                    radius="lg"
                    children={
                      <Group>
                        <Photo size={48} strokeWidth={2} color={'black'} />
                        <Text>Upload Header Image</Text>
                      </Group>
                    }
                  />
                )}
                {headerImageUrl && (
                  <Group
                    position="center"
                    sx={(theme) => ({
                      border: '1px solid',
                      borderColor: theme.colors.gray[4],
                      borderRadius: 4,
                      position: 'relative',
                    })}
                  >
                    <Image
                      fit="contain"
                      radius={4}
                      src={headerImageUrl}
                      alt="Header image"
                      height={200}
                    />

                    <ActionIcon
                      variant="filled"
                      sx={{ position: 'absolute', top: 4, right: 4 }}
                      onClick={() => openHeaderImageRef.current!()}
                    >
                      <PhotoUp />
                    </ActionIcon>
                  </Group>
                )}
              </Stack>
            </Box>
          </Card.Section>
        </Card>
        <Card withBorder radius="sm">
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={600} size="lg">
              Basic Details
            </Text>
          </Card.Section>
          <SimpleGrid cols={1} py="sm">
            <TextInput
              readOnly
              type="number"
              label="Company Code"
              radius="md"
              placeholder="10001"
              {...form.getInputProps('companyCode')}
            />
            <TextInput
              icon={<Users />}
              required
              label="Name"
              radius="md"
              placeholder="Comapny Name"
              {...form.getInputProps('companyName')}
            />
            <TextInput
              icon={<Category />}
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
                icon={<MapPin />}
                required
                label="City"
                radius="md"
                placeholder="City"
                {...form.getInputProps('city')}
              />
              <NumberInput
                icon={<MapPin />}
                type="number"
                maxLength={6}
                minLength={6}
                label="Pin Code"
                radius="md"
                placeholder="Pin Code"
                hideControls
                {...form.getInputProps('pincode')}
              />

              <TextInput
                icon={<MapPin />}
                label="District"
                radius="md"
                placeholder="District"
                {...form.getInputProps('district')}
              />
              <TextInput
                icon={<MapPin />}
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
                icon={<User />}
                required
                label="Contact Person"
                radius="md"
                placeholder="Conatct Person"
                {...form.getInputProps('contactPerson')}
              />
              <TextInput
                icon={<Phone />}
                required
                label="Phone Number"
                radius="md"
                placeholder="Phone Number"
                {...form.getInputProps('phoneNumber')}
              />
            </SimpleGrid>

            <TextInput
              icon={<Mail />}
              required
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
                required
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
                hideControls
                {...form.getInputProps('creditLimit')}
              />
              <NumberInput
                label="Credit Period"
                radius="md"
                placeholder="Credit Period"
                hideControls
                {...form.getInputProps('creditPeriod')}
              />
              <NumberInput
                label="Credit Invoices"
                radius="md"
                placeholder="Credit Invoices"
                hideControls
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
