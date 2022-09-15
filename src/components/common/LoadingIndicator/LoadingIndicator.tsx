import { Loader, LoadingOverlay } from '@mantine/core';

export type LoadingPosition = 'relative' | 'overlay' | 'absolute';
export type PositionAlign =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

interface LoadingIndicatorProps {
  isLoading: boolean;
  position: LoadingPosition;
  align?: PositionAlign;
}

export const positionStyle = {
  topLeft: {
    top: 10,
    left: 10,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
  },
  topRight: {
    top: 10,
    right: 10,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
};

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { align, position, isLoading } = props;

  return position === 'relative' ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
      }}
    >
      <Loader size="lg" sx={{ display: 'flex', flex: '1' }} />
    </div>
  ) : position === 'absolute' ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        position: 'relative',
      }}
    >
      <Loader
        size="md"
        sx={[
          { display: 'flex', flex: '1', position: 'absolute' },
          positionStyle[align ?? 'topLeft'],
        ]}
      />
    </div>
  ) : (
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
  );
};
