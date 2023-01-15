import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import CaptchaComponent from "./components/CaptchaComponent";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = () => {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log("Form submitted");
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    // setIsCaptchaValid(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            client-side captcha with react ✌️
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {formSubmitted ? (
            <Stack spacing={4}>
              <div className="py-4 mx-8 shadow-xl rounded-lg">
                <h3 className="text-xl text-center font-semibold dark:text-white">
                  Your form was submitted successfully 🎉
                </h3>
                <div className="container mt-2 flex justify-center">
                  <button className="btn" onClick={handleResetForm}>
                    Reset form
                  </button>
                </div>
              </div>
            </Stack>
          ) : (
            <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
              <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <CaptchaComponent
                isCaptchaValid={isCaptchaValid}
                setIsCaptchaValid={setIsCaptchaValid}
                formSubmitted={formSubmitted}
              />
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSubmitForm}
                  disabled={!isCaptchaValid}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

