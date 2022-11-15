import { Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "tabler-icons-react";
import { useParties } from "../../../hooks";
import { AddPartyData, FetchPartiesData } from "../../../types";
import { PartyForm } from "./PartyForm";

const formInitialValue: AddPartyData = {
  partyCode: "",
  name: "",
  category: "",
  address: "",
  city: "",
  pincode: 0,
  district: "",
  state: "",
  contactPerson: "",
  phoneNumber: "",
  email: "",
  GSTIN: "",
  PAN: "",
  creditLimit: 0,
  creditPeriod: 0,
  creditInvoice: 0,
};

const getPartyData = (data: FetchPartiesData): FetchPartiesData => {
  return {
    _id: data._id,
    partyCode: "12345",
    name: data?.name ?? "",
    category: data?.category ?? "",
    address: data?.address ?? "",
    city: data?.city ?? "",
    pincode: data?.pincode ?? 0,
    district: data?.district ?? "",
    state: data?.state ?? "",
    contactPerson: data?.contactPerson ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    email: data?.email ?? "",
    GSTIN: data?.GSTIN ?? "",
    PAN: data?.PAN ?? "",
    creditLimit: data?.creditLimit ?? 0,
    creditPeriod: data?.creditPeriod ?? 0,
    creditInvoice: data?.creditInvoice ?? 0,
  };
};

export const PartyDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { addParty, getParties, updateParty } = useParties(param.id!);

  const { data, isLoading, refetch } = getParties;
  const isUpdate = parseInt(param.id!);
  const PartiesData = useMemo(() => data, [data]);

  const form = useForm<AddPartyData>({
    initialValues: formInitialValue,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!!isUpdate) {
      formRef.current.setValues(getPartyData(PartiesData));
    }
  }, [PartiesData, data, isUpdate]);

  const handleSubmit = async (values: AddPartyData) => {
    const _id = values._id;
    try {
      if (values?._id) {
        const updateData: any = await updateParty({ _id, ...values });
        if (updateData.data.success) {
          showNotification({
            id: "load-data",
            loading: isLoading,
            title: "Party",
            message: "Party Updating...",
            autoClose: false,
            disallowClose: true,
          });

          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Party",
            message: updateData.data.message,
            icon: <Check size={16} />,
            autoClose: 2000,
          });
        }
      } else {
        const addData: any = await addParty(values);
        if (addData.data.success) {
          showNotification({
            title: "Party",
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      console.log("Error");
    } finally {
      navigate("/parties");
      refetch();
    }
  };

  return (
    <Stack>
      <Text weight={700} size="xl">
        Partiy Details
      </Text>
      <PartyForm form={form} handleSubmit={handleSubmit} />
    </Stack>
  );
};
