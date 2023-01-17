import {
  Button,
  Center,
  FormControl,
  Select,
  MenuItem,
  Textarea,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "preact/hooks";

const TranslationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const LANGUAGES = [
    "French",
    "English",
    "Español",
    "Pоссия",
    "Yкраїни",
    "Deutsch",
    "Lietuvių",
  ];

  const handleSubmit = (e) => {
    const languageFrom = document.querySelector("#language-from").value;
    const languageTo = document.querySelector("#language-to").value;
    const text = document.querySelector("#translated-text").value;
    if (!text) {
      document.querySelector("#result").textContent = "You must specify what you want to translate!"
      document.querySelector("#result").style.color = "red";
      return;
    }
    setIsLoading(true);
    fetch("/api/tr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: languageFrom,
        to: languageTo,
        text: text,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        document.querySelector('#result').style.color = "black"
        document.querySelector("#result").textContent = r.afterTranslation;
      })
      .finally(() => setIsLoading(false));
  };


  return (
    <div width="1000px" height="1000px">
      <Center
        display={"flex"}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={"500px"}
      >
          <FormControl
            display={"flex"}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            width={"500px"}
          >
           <Stack spacing={"20px"} width="full">
            <Select width={"full"} id="language-from" size="lg">
              {LANGUAGES.map((lang) => (
                <option value={lang}>{lang}</option>
              ))}
            </Select>
            <Select width={"full"} id="language-to" size="lg">
              {LANGUAGES.map((lang) => (
                <option value={lang}>{lang}</option>
              ))}
            </Select>
            <Textarea
              id="translated-text"
              placeholder="The text to translate"
            />
            <Button
              width={"full"}
              variant="solid"
              colorScheme="messenger"
              type="submit"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Traduire
            </Button>
           </Stack>
          </FormControl>
        <Text fontSize={"xl"} mt="10px" id="result"></Text>
      </Center>
    </div>
  );
};

export default TranslationForm;
