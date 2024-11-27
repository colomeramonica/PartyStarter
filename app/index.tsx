import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect, SetStateAction, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { create } from "zustand";
import { saveUser } from "@/utils/api";

export default function Login() {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/profile');
      }
    };
    checkSession();
  }, [router]);

  const handleChange = useCallback((key: any, value: any) => {
    setState({
      ...state,
      [key]: value,
    });
  }, [state]);

  // async function signInWithEmail() {
  //   setLoading(true)
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: state.email,
  //     password: state.password,
  //   })

  //   if (error) {
  //     setError(error.message)
  //   }
  //   setLoading(false)
  // }

  async function signUpWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });

    if (data.user) {
      await saveUser({ username: state.username, email: state.email, user_id: data.user.id });
      router.push('/profile');
    }
    if (error) {
      setError(error.message)
    }

    if (!data.session) {
      setWarning('Please, check your email for verification.');
    }
    setLoading(false)
  }

  return (
    <Center className="bg-white">
      <div className="lg:grid lg:grid-cols-12 lg:min-h-screen">
        <aside className="block h-16 lg:col-span-5 lg:h-full lg:order-last relative xl:col-span-6">
          <Image
            alt=""
            source={{
              uri: "https://images.unsplash.com/photo-1650024520299-4383f4520fc2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            className="absolute h-full inset-0 object-cover w-full"
          />
        </aside>
        <Box
          className="flex items-center justify-center lg:col-span-7 lg:px-16 lg:py-12 px-8 py-8 sm:px-12 xl:col-span-6">
          <div className="lg:max-w-3xl max-w-xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <Heading className="font-bold md:text-4xl mt-6 sm:text-3xl text-2xl text-gray-900">
              Welcome to Party Starter!
            </Heading>
            <Text className="leading-relaxed mt-4 text-gray-500">
              We're glad to have you here and we can't wait to see what you create. Let's get started!
            </Text>
            {error && (
              <Alert action="error" variant="solid" className="bg-opacity-45 bg-yellow-300 text-yellow-600">
                <AlertIcon as={InfoIcon} />
                <AlertText>{error}</AlertText>
              </Alert>
            )}
            <VStack>
              <FormControl className="mt-8">
                <FormControlLabel className="block font-medium text-gray-700 text-sm">
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={state.username}
                    onChange={(e) => handleChange("username", e.nativeEvent.text)}
                    className="bg-white border-gray-200 mt-1 text-gray-700 text-sm w-full"
                  />
                </Input>
              </FormControl>
              <FormControl className="mt-8">
                <FormControlLabel className="block font-medium text-gray-700 text-sm">
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    id="Email"
                    value={state.email}
                    onChange={(e) => handleChange("email", e.nativeEvent.text)}
                    className="bg-white border-gray-200 mt-1 text-gray-700 text-sm w-full"
                  />
                </Input>
              </FormControl>
              <FormControl className="mt-8">
                <FormControlLabel className="block font-medium text-gray-700 text-sm">
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    id="Password"
                    value={state.password}
                    onChange={(e) => handleChange("password", e.nativeEvent.text)}
                    className="bg-white border-gray-200 mt-1 text-gray-700 text-sm w-full"
                  />
                </Input>
              </FormControl>
            </VStack>
            <Box className="mt-6 sm:flex sm:gap-4 sm:items-center">
              <Button
                disabled={loading}
                onPress={() => signUpWithEmail()}
                className="active:[#432E54] align-middle bg-[#432E54] border border-[#432E54] flex focus:outline-none focus:ring font-medium hover:bg-transparent hover:text-[#432E54] justify-center px-12 py-3 rounded-md shrink-0 text-sm text-white transition"
              >
                <Text>Create an account</Text>
              </Button>
              {/* <Button
                variant="link"
                disabled={loading}
                onPress={() => signInWithEmail()}
                className="text-gray-700 underline">
                <Text>Log in</Text>
              </Button> */}
            </Box>
          </div>
        </Box>
      </div>
    </Center>
  );
}