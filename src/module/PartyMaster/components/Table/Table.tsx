import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  Table as MantineTable,
  Text,
} from '@mantine/core';
import { useDisclosure, usePagination } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { AddParty } from '../AddParty/AddParty';

interface TableProps {
  data: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }[];
}

export const Table = ({ data }: TableProps) => {
  const [page, onChange] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, handlers] = useDisclosure(false, {
    onOpen() {},
  });

  const totalPages = useMemo(() => data.length, [data.length]);

  const rowsPerPage = 10;

  const pagination = usePagination({
    total: totalPages / rowsPerPage,
    boundaries: 2,
    initialPage: 1,
    onChange,
    page,
    siblings: 2,
  });

  setInterval(function () {
    setIsLoading(false);
  }, 3000);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = page * rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, page]);

  const rows = useMemo(() => {
    return paginatedData.map((element) => (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.userId}</td>
        <td>{element.title}</td>
        <td>{element.completed ? 'Success' : 'Cancel'}</td>
      </tr>
    ));
  }, [paginatedData]);

  return (
    <Card withBorder radius="sm">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Party Master</Text>
          <Button variant="outline" color="green" onClick={handlers.open}>
            Add New
          </Button>
          <Modal
            opened={isOpened}
            onClose={handlers.close}
            title="Add new Party"
            size="xl"
          >
            <AddParty
              handleCloseModal={handlers.close}
              setIsLoading={setIsLoading}
            />
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
          </Modal>
        </Group>
      </Card.Section>

      <MantineTable
        horizontalSpacing="sm"
        verticalSpacing="sm"
        striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
      <Card.Section withBorder inheritPadding py="xs">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
          }}
        >
          <Pagination
            total={totalPages / rowsPerPage}
            page={page}
            onChange={pagination.setPage}
          />
          <Text>Totle Pages: {totalPages}</Text>
        </div>
      </Card.Section>
    </Card>
  );
};
