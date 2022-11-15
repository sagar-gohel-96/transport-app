import {
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
  UnstyledButton,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Photo, PhotoUp, UserCircle } from "tabler-icons-react";
import { Dropzon } from "../../../../components/common";

import { AddCompanyData } from "../../../../types";
import { UserResponse } from "../../../../types/userType";

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
            <Box sx={{ display: "flex", flex: 1, gap: 16 }}>
              <Stack>
                {/* <Text align="left" weight={600} size="md">
                Logo Image
              </Text> */}
                {!logoImageUrl && (
                  <Dropzon
                    folderName={`${user?._id}/company-logo-image`}
                    description={{
                      title: "Logo Image",
                    }}
                    setImgUrl={setLogoImageUrl}
                    setProgresspercent={setProgresspercent}
                    sx={{ borderRadius: 100, width: 200 }}
                    children={
                      <Stack align="center">
                        <Photo size={48} strokeWidth={2} color={"black"} />
                        <Text>Logo Image</Text>
                      </Stack>
                    }
                  />
                )}

                {logoImageUrl && (
                  <Group
                    position="center"
                    sx={(theme) => ({
                      border: "1px solid",
                      borderColor: theme.colors.gray[4],
                      borderRadius: 4,
                    })}
                  >
                    <Image
                      fit="contain"
                      src={logoImageUrl}
                      alt="Logo image"
                      height={200}
                      width={200}
                    />
                    <UnstyledButton sx={{ position: "absolute" }}>
                      <PhotoUp />
                    </UnstyledButton>
                  </Group>
                )}
              </Stack>

              <Stack sx={{ display: "flex", flex: 1 }}>
                {/* <Text align="left" weight={600} size="md">
                Header Image
              </Text> */}
                {!headerImageUrl && (
                  <Dropzon
                    folderName={`${user?._id}/company-header-image`}
                    description={{
                      title: "Upload Company Header Image",
                      aboutImage: "File should not exceed 5mb",
                    }}
                    setImgUrl={setHeaderImageUrl}
                    setProgresspercent={setProgresspercent}
                    radius="lg"
                    children={
                      <Group>
                        <Photo size={48} strokeWidth={2} color={"black"} />
                        <Text>Upload Header Image</Text>
                      </Group>
                    }
                  />
                )}
                {headerImageUrl && (
                  <Group
                    position="center"
                    sx={(theme) => ({
                      border: "1px solid",
                      borderColor: theme.colors.gray[4],
                      borderRadius: 4,
                    })}
                  >
                    <Image
                      fit="contain"
                      radius={4}
                      src={headerImageUrl}
                      alt="Header image"
                      height={200}
                    />
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
              required
              type="number"
              label="Company Code"
              radius="md"
              placeholder="10001"
              {...form.getInputProps("companyCode")}
            />
            <TextInput
              required
              label="Name"
              radius="md"
              placeholder="Comapny Name"
              {...form.getInputProps("companyName")}
            />
            <TextInput
              required
              label="Category"
              radius="md"
              placeholder="Category"
              {...form.getInputProps("category")}
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
              {...form.getInputProps("address")}
            />
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
            >
              <TextInput
                required
                label="City"
                radius="md"
                placeholder="City"
                {...form.getInputProps("city")}
              />
              <NumberInput
                required
                type="number"
                maxLength={6}
                minLength={6}
                label="Pin Code"
                radius="md"
                placeholder="Pin Code"
                {...form.getInputProps("pincode")}
              />

              <TextInput
                required
                label="District"
                radius="md"
                placeholder="District"
                {...form.getInputProps("district")}
              />
              <TextInput
                required
                label="State"
                radius="md"
                placeholder="State"
                {...form.getInputProps("state")}
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
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
            >
              <TextInput
                required
                label="Contact Person"
                radius="md"
                placeholder="Conatct Person"
                {...form.getInputProps("contactPerson")}
              />
              <TextInput
                required
                label="Phone Number"
                radius="md"
                placeholder="Phone Number"
                {...form.getInputProps("phoneNumber")}
              />
            </SimpleGrid>

            <TextInput
              required
              label="Your Email"
              radius="md"
              placeholder="Your Email"
              {...form.getInputProps("email")}
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
            breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
            py="sm"
          >
            <SimpleGrid cols={2}>
              <TextInput
                required
                label="GSTIN"
                radius="md"
                placeholder="GSTIN"
                {...form.getInputProps("GSTIN")}
              />
              <TextInput
                label="PAN"
                radius="md"
                placeholder="PAN"
                {...form.getInputProps("PAN")}
              />
            </SimpleGrid>
            <SimpleGrid
              cols={3}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
            >
              <NumberInput
                required
                label="Credit Limit"
                radius="md"
                placeholder="Credit Limit"
                {...form.getInputProps("creditLimit")}
              />
              <NumberInput
                required
                label="Credit Period"
                radius="md"
                placeholder="Credit Period"
                {...form.getInputProps("creditPeriod")}
              />
              <NumberInput
                required
                label="Credit Invoices"
                radius="md"
                placeholder="Credit Invoices"
                {...form.getInputProps("creditInvoice")}
              />
            </SimpleGrid>
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
