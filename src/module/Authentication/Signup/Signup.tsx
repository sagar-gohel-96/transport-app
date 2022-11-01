import {
  Box,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandFacebook, BrandGoogle } from "tabler-icons-react";
import { useAddUserMutation } from "../../../api";
import { useLocalStorage } from "../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../store";
import { authAction } from "../../../store/auth-slice";
import { AddUserPayload, UserResponse } from "../../../types/userType";
import { config } from "../../../utils";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const getUser = useMemo(() => user, [user]);
  const [addUser] = useAddUserMutation();
  const { setLocalStorageItem } = useLocalStorage<UserResponse>(
    config.userLocalStorageKey as string
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User", getUser);
  }, [getUser]);

  const form = useForm<AddUserPayload>({
    initialValues: {
      role: "",
      name: "",
      email: "",
      // birthDate: "",
      phone: "",
      password: "",
    },

    validate: {
      //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: AddUserPayload) => {
    try {
      const addUserResponce: any = await addUser(values);
      if (addUserResponce.data.success) {
        showNotification({
          title: "Register",
          message: addUserResponce.data.message,
        });
        setLocalStorageItem(addUserResponce.data.user);
        dispatch(
          authAction.setUser({
            user: addUserResponce.data.user,
            token: addUserResponce.data.token,
          })
        );
        navigate("/");
        form.reset();
      }
    } catch (err) {
      showNotification({
        title: "Register",
        message: "Not Register",
      });
      console.log("error", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "100%",
      }}
    >
      <Paper shadow="xs" p="md" sx={{ width: "" }} withBorder>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack spacing={12}>
            <Text align="center" weight={600} size="xl">
              Sign In With
            </Text>
            <Group>
              <Button
                sx={{ flex: 1 }}
                leftIcon={<BrandFacebook />}
                variant="outline"
              >
                Facebook
              </Button>
              <Button
                sx={{ flex: 1 }}
                leftIcon={<BrandGoogle />}
                variant="outline"
              >
                Google
              </Button>
            </Group>
            {/* <TextInput
              placeholder="Your Role"
              label="Role"
              withAsterisk
              {...form.getInputProps("role")}
            /> */}
            <TextInput
              placeholder="Your Name"
              label="Name"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Your Email"
              label="Email"
              type="email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            {/* <DatePicker
              placeholder="Pick date"
              label="Birth Date"
              withAsterisk
              {...form.getInputProps("birthDate")}
            /> */}
            <TextInput
              placeholder="Your Phone Number"
              label="Phone"
              withAsterisk
              {...form.getInputProps("phone")}
            />
            <PasswordInput
              placeholder="*********"
              label="Password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            {/* <PasswordInput
              placeholder="*********"
              label="Confirm Password"
              withAsterisk
              {...form.getInputProps("confirmPassword")}
            /> */}
            <Button color="primaryBlue" type="submit">
              Submit
            </Button>
            <Text size="xs" align="center">
              If you are Member ? <Link to="/Signin">Sign in now</Link>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
