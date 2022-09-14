import { ReactNode } from 'react';
import { Bulb, DatabaseOff } from 'tabler-icons-react';
import NoDataFound from '../../../../assets/images/data-not-found.png';

export type EmptyStatesList = 'noParties' | 'noData' | 'noDataLoad';

export interface EmptyStateItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export type EmptyStateRecord = Record<EmptyStatesList, EmptyStateItem>;

export const emptyStates: EmptyStateRecord = {
  noDataLoad: {
    icon: <DatabaseOff size={130} />,
    title: 'No Data Load',
    description: 'Oops.. Currently no data Fetch.',
  },
  noParties: {
    icon: <Bulb size={130} />,
    title: 'No parties found',
    description: 'No parties match your current filter',
  },
  noData: {
    icon: (
      <img
        src={NoDataFound}
        alt="logo"
        height={130}
        style={{
          filter:
            'invert(100%) sepia(100%) saturate(1%) hue-rotate(158deg) brightness(103%) contrast(101%)',
        }}
      />
    ),
    title: 'No parties found',
    description: 'No parties match your current filter',
  },
};
