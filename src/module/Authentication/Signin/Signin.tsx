import {
  Box,
  Button,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../../api";
import { useLocalStorage } from "../../../hooks";
import SignUpCover from "../../../../src/assets/images/signup.jpg";
import { useAppDispatch } from "../../../store";
import { authAction } from "../../../store/auth-slice";
import { config } from "../../../utils";
import Typewriter from "typewriter-effect";

export const Signin = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setLocalStorageItem: setUserData } = useLocalStorage(
    config.userLocalStorageKey as string
  );

  const form = useForm({
    initialValues: {
      name: "",
      password: "",
    },

    validate: {},
  });

  const handleSubmit = async (values: any) => {
    try {
      const SigninData: any = await signin(values);

      if (SigninData.data.success) {
        const userAuth = {
          initialized: true,
          user: SigninData.data.user,
          token: SigninData.data.token,
        };

        const addLocalStorage = {
          user: SigninData.data.user,
          token: SigninData.data.token,
        };

        dispatch(authAction.setUser(userAuth));

        setUserData(JSON.stringify(addLocalStorage));

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
  const data = [
    "Party Management",
    "Manage your daily transaction bill",
    "Access from anywhere",
    "Export data in excellent PDF",
    "Easy to send payment reminder",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        backgroundColor: "#faf9f7",
      }}
    >
      <div style={{ height: "100vh", flex: 6, position: "relative" }}>
        <div
          style={{
            height: "20%",
            backgroundImage: "url(../../../../src/assets/images/signup.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <ul
            style={{
              fontSize: "35px",
              paddingLeft: "4%",
              fontFamily: "Fantasy",
              position: "absolute",
            }}
          >
            <Typewriter
              options={{
                strings: data,
                autoStart: true,
                loop: true,
                skipAddStyles: true,
              }}
              onInit={(typewriter) => {
                typewriter.pauseFor(1000).deleteAll().start();
              }}
            />
          </ul>
        </div>
        <div style={{ height: "78vh" }}>
          <img
            style={{ height: "100%", width: "100%" }}
            alt="Sorry"
            src={SignUpCover}
          />
        </div>
      </div>
      <div
        style={{
          padding: "50px",
          display: "flex",
          flex: 3.5,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5c8c2",
        }}
      >
        <Paper
          shadow="xl"
          p="50px"
          radius="md"
          style={{
            backgroundColor: "rgb(0,0,0,0.1)",
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          withBorder
        >
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={20}>
              <Text align="left" weight={900} size="xl" color="red">
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
                placeholder="User Name"
                label="User Name"
                withAsterisk
                {...form.getInputProps("name")}
              />

              <PasswordInput
                placeholder="*********"
                label="Password"
                withAsterisk
                {...form.getInputProps("password")}
              />
              <Button color="red" type="submit" p="sm" radius="md">
                {isLoading ? <Loader size="sm" color="white" /> : "Submit"}
              </Button>
              {/* <Text size="xs" align="center">
                Not a Member Signup? <Link to="/Signup">Sign up now</Link>
              </Text> */}
            </Stack>
          </form>
        </Paper>
      </div>
    </Box>
  );
};
