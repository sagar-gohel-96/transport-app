import { Button, Card, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useMemo } from "react";
import { Check } from "tabler-icons-react";
import { useAuth } from "../../../../hooks";

import { AreaPayload, FetchAreaData } from "../../../../types";

interface AddAreaProps {
  handleCloseModal: () => void;
  data?: FetchAreaData | null;
  addArea: (value: any) => void;
  updateArea: (value: any) => void;
  refetch: () => void;
}

const formInitialValue: AreaPayload = {
  name: "",
  areaName: "",
  city: "",
  email: "",
};

const setAreaData = (data: FetchAreaData): FetchAreaData => {
  return {
    _id: data?._id ?? "",
    name: data?.name ?? "",
    city: data?.city ?? "",
    email: data?.email ?? "",
    areaName: data?.areaName ?? "",
  };
};

export const AddArea = ({
  handleCloseModal,
  data,
  addArea,
  updateArea,
  refetch,
}: AddAreaProps) => {
  const AreasData = useMemo(() => data, [data]);
  const { user } = useAuth();

  const form = useForm<AreaPayload>({
    initialValues: AreasData ? setAreaData(AreasData) : formInitialValue,

    validate: {},
  });

  const handleSubmit = async (values: AreaPayload) => {
    const _id = values._id;
    try {
      if (values?._id) {
        const updateData: any = await updateArea({
          _id,
          ...values,
          name: user?.name,
          email: user?.email,
        });
        if (updateData.data.success) {
          showNotification({
            id: "load-data",
            loading: true,
            title: "Area",
            message: "Area Updating...",
            autoClose: false,
            disallowClose: true,
          });

          setTimeout(() => {
            updateNotification({
              id: "load-data",
              color: "teal",
              title: "Area",
              message: updateData.data.message,
              icon: <Check size={16} />,
              autoClose: 2000,
            });
          }, 3000);
        }
      } else {
        const addData: any = await addArea({
          ...values,
          name: user?.name,
          email: user?.email,
        });
        if (addData.data.success) {
          showNotification({
            title: "Area",
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      console.log("Error");
    } finally {
      handleCloseModal();
      refetch();
    }
  };

  return (
    <Card withBorder radius="sm">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
        >
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
        </SimpleGrid>
        <Button
          type="submit"
          variant="outline"
          color="primaryBlue"
          sx={(theme) => ({ marginTop: "18px", display: "flex", flex: "1" })}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};
