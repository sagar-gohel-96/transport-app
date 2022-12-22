import { Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'tabler-icons-react';
import { useAreas } from '../../../hooks';
import { AreaPayload, FetchAreaData } from '../../../types';
import { AreaForm } from './AreaForm';

const setAreaData = (data: FetchAreaData): FetchAreaData => {
  return {
    _id: data?._id ?? '',
    city: data?.city ?? '',
    areaName: data?.areaName ?? '',
  };
};

export const AreaDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { addArea, getAreas, updateArea } = useAreas(param.id!);

  const { data, isLoading, refetch } = getAreas;
  const isUpdate = parseInt(param.id!);
  const AreasData = useMemo(() => data, [data]);

  const form = useForm<AreaPayload>({
    initialValues: {
      areaName: '',
      city: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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
    console.log('isUpdate', isUpdate);
    if (!!isUpdate) {
      formRef.current.setValues(setAreaData(AreasData));
    }
  }, [AreasData, data, isUpdate]);

  const handleSubmit = async (values: Partial<AreaPayload>) => {
    const _id = values._id as string;
    try {
      if (values?._id) {
        const updateData: any = await updateArea({
          _id,
          ...values,
        });
        if (updateData.data.success) {
          showNotification({
            id: 'load-data',
            loading: isLoading,
            title: 'Area',
            message: 'Area Updating...',
            autoClose: false,
            disallowClose: true,
          });

          updateNotification({
            id: 'load-data',
            color: 'teal',
            title: 'Area',
            message: updateData.data.message,
            icon: <Check size={16} />,
            autoClose: 2000,
          });
        }
      } else {
        const addData: any = await addArea({
          ...values,
        });
        if (addData.data.success) {
          showNotification({
            title: 'Area',
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      console.log('Error');
    } finally {
      navigate('/areas');
      refetch();
    }
  };

  return (
    <Stack>
      <Text weight={700} size="xl">
        Area Details
      </Text>
      <AreaForm form={form} handleSubmit={handleSubmit} />
    </Stack>
  );
};
