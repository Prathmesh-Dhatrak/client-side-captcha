import { useEffect, useState } from "react";
import { Button, Flex, Input, Box, Text } from "@chakra-ui/react";
import { generateCaptchaCode } from "../util/captchaFunctionalities";

function CaptchaComponent({
  isCaptchaValid,
  setIsCaptchaValid,
  formSubmitted,
}) {
  const [captchaValue, setCaptchaValue] = useState("");
  const [userInputValue, setUserInputValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSetCaptcha = () => {
    const generatedCaptchaCode = generateCaptchaCode();
    setUserInputValue("");
    setCaptchaValue(generatedCaptchaCode);
  };

  const handleChangeInput = (event) => {
    setUserInputValue(event.target.value);
  };

  const handleCheckCaptcha = () => {
    setIsCaptchaValid(
      userInputValue.length === 0
        ? false
        : captchaValue === userInputValue
        ? true
        : false
    );
    setMessage(
      userInputValue.length === 0
        ? "Captcha is empty"
        : captchaValue === userInputValue
        ? "Captcha is valid"
        : "Captcha is not valid"
    );
  };

  useEffect(() => {
    handleSetCaptcha();
  }, [formSubmitted]);

  useEffect(() => {
    handleCheckCaptcha();
  }, [userInputValue]);

  return (
    <Box m={"auto"} width={"100%"} boxShadow="lg" p="6" rounded="md" bg="white">
      <Flex
        gap={2}
        direction={"row"}
        wrap={"wrap"}
        alignItems={"end"}
        justifyContent={"center"}
        py={2}
      >
        <Box
          h="50px"
          px={2}
          bgGradient="linear(to-t, gray.300, red.500)"
          borderRadius={"lg"}
        >
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            fontStyle={"oblique"}
            letterSpacing={"widest"}
            as={"s"}
          >
            {captchaValue}
          </Text>
        </Box>
        <Button onClick={handleSetCaptcha}>Reset</Button>
      </Flex>
      <Box my={4} mx={2} display="flex" flexDirection={"column"}>
        <Input
          type="text"
          value={userInputValue}
          onChange={handleChangeInput}
          placeholder="Enter captcha"
        />
        <Box
          py={1}
          color={
            userInputValue.length == 0
              ? "gray.500"
              : isCaptchaValid
              ? "green.500"
              : "red.500"
          }
        >
          <Text fontSize={"xs"} align={"center"}>
            {message}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default CaptchaComponent;
