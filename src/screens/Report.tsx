import React from "react";
import { Card, FormControl, View, Text } from "@gluestack-ui/themed";
import {
  FormControlLabelText,
  TabsTabTitle,
  Heading,
  FormControlLabel,
} from "@gluestack-ui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RouteParams } from "../interfaces/formData";
import Foto from "../components/Profile/Foto";

type ReportScreenRouteProp = RouteProp<{ params: RouteParams }, "params">;

const Report: React.FC = () => {

  const route = useRoute<ReportScreenRouteProp>();
  const { formData, selectedProvince } = route.params;

  console.log("name provinsi:", selectedProvince);
  return (
      <Card size="md" variant="outline" p={"$0"} maxWidth={360} m="$3">
        <View alignItems="center" mt={"$4"} mb={"$5"}> 
            <Foto/>
        </View>
        <View alignItems="center" my={"$4"}>
          <Heading>Data Sekolah</Heading>
        </View>
          <FormControl minWidth="$80" mb={"$2"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Tipe Sekolah:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.tipeSekolah}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Nama Sekolah:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.namaSekolah}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Alamat:</FormControlLabelText>
              </FormControlLabel>
              <View style={{ maxWidth: "50%", flexDirection: "column" }}>
                <Text>{formData.alamat}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Kode Pos:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.kodePos}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Provinsi:</FormControlLabelText>
              </FormControlLabel>
              {/* <Text>{selectedProvince ? selectedProvince.name : ""}</Text> */}
              <Text>{selectedProvince}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Kota/Kabupaten:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.kotaKabupaten}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>No Telpon Sekolah:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.noTelpon}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Email Sekolah:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.email}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Facebook:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.facebook}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <FormControlLabel>
                <FormControlLabelText>Jumlah Siswa:</FormControlLabelText>
              </FormControlLabel>
              <Text>{formData.jumlahSiswa}</Text>
            </View>
          </FormControl>
      </Card>
  );
};

export default Report;
