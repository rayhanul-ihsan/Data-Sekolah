import React from "react";

import { Image, View } from "@gluestack-ui/themed";

import logo from "../../assets/Main-img.png";

import { Box, Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";

const Home: React.FC = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        height: "100%",
      }}
    >
      <Box
        justifyContent="center"
        alignItems="center"
        width={"$full"}
        height={"$56"}
      >
        <Image w={"$56"} h={"$40"} alt="logo" source={logo} />
      </Box>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => navigation.navigate("form")}
      >
        <ButtonText>Open </ButtonText>
      </Button>
     
    </View>
  );
};

export default Home;
