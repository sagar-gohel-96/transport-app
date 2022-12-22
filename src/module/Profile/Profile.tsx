import { Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { Check } from 'tabler-icons-react';
import { useUpdateUserMutation } from '../../api';
import { useAuth, useLocalStorage } from '../../hooks';
import { useAppDispatch } from '../../store';
import { authAction } from '../../store/auth-slice';
import { UserResponse } from '../../types/userType';
import { config } from '../../utils';
import { UserBasicInfo, UserContactInfo } from './components';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { setLocalStorageItem: setUser } = useLocalStorage(
    config.userLocalStorageKey as string
  );

  const { user, token } = useAuth();

  const onLogout = () => {
    if (user) {
      setUser('');
      dispatch(authAction.setUser({ user: null, token: null }));
      navigate('/');
    }
  };

  const upadteUser = async (_id: string, values: Partial<UserResponse>) => {
    const updateData: any = await updateUser({ _id, ...values });

    if (updateData.data.success) {
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'User',
        message: 'User Updating...',
        autoClose: false,
        disallowClose: true,
      });

      setTimeout(() => {
        updateNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Profile',
          message: updateData.data.message,

          icon: <Check size={16} />,
          autoClose: 2000,
        });
      }, 3000);

      const data = { ...user, ...updateData.data.data };

      const addLocalStorage = {
        user: updateData.data.data,
        token: token,
      };

      dispatch(authAction.setUser({ user: data, token: token }));

      setUser(JSON.stringify(addLocalStorage));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {user && <UserBasicInfo user={user} upadteUser={upadteUser} />}
      {user && <UserContactInfo user={user} upadteUser={upadteUser} />}

      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};
