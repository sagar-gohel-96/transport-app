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
import { Link, useNavigate } from "react-router-dom";
import { BrandFacebook, BrandGoogle } from "tabler-icons-react";
import { useSigninMutation } from "../../../api";
import { useLocalStorage } from "../../../hooks";

import { useAppDispatch } from "../../../store";
import { authAction } from "../../../store/auth-slice";
import { config } from "../../../utils";

export const Signin = () => {
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setLocalStorageItem: setUserData } = useLocalStorage(
    config.userLocalStorageKey as string
  );

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const SigninData: any = await signin(values);
      if (SigninData.data.success) {
        const userAuth = {
          user: SigninData.data.user,
          token: SigninData.data.token,
        };

        dispatch(authAction.setUser(userAuth));

        setUserData(JSON.stringify(userAuth));

        showNotification({
          title: "Sign in",
          message: SigninData.data.message,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("error", error);

      showNotification({
        title: "Sign in",
        message: "User Not Exist",
      });
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
      <Paper shadow="xs" p="md" withBorder>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack spacing={12}>
            <Text align="center" weight={600} size="xl">
              Sign In
            </Text>
            {/* <Group>
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
            </Group> */}
            <TextInput
              placeholder="Your Email"
              label="Email"
              type="email"
              withAsterisk
              {...form.getInputProps("email")}
            />

            <PasswordInput
              placeholder="*********"
              label="Password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Button color="primaryBlue" type="submit">
              Submit
            </Button>
            {/* <Text size="xs" align="center">
              Not a Member Signup? <Link to="/Signup">Sign up now</Link>
            </Text> */}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
