import {
  Box,
  Button,
  Card,
  ChevronDownIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  View,
  Image,
  Heading,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import logo from "../../assets/img2.png";
import { FormData } from "../interfaces/formData";

interface Regency {
  id: string;
  name: string;
}

interface Props {
  navigation: any;
}

const FormDataSekolah: React.FC<Props> = ({ navigation }) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [regencies, setRegencies] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    tipeSekolah: "",
    namaSekolah: "",
    alamat: "",
    kodePos: "",
    kotaKabupaten: "",
    noTelpon: "",
    email: "",
    facebook: "",
    jumlahSiswa: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;

    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
      
    )
      .then((response) => response.json())
      .then((data) => setRegencies(data))
      .catch((error) => console.error("Error fetching regencies:", error));
  }, [selectedProvince]);

  const handleInputChange = (name: string, value: string) => {
    if (name === "provinsi") {
      // Dapatkan ID provinsi berdasarkan nama provinsi yang dipilih
      const selectedProvinsi = provinces.find((provinsi) => provinsi.name === value);
      if (selectedProvinsi) {
        setSelectedProvince(selectedProvinsi.id);
        // Reset daftar kabupaten saat provinsi berubah
        setRegencies([]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.tipeSekolah)
      newErrors.tipeSekolah = "Tipe Sekolah harus diisi";
    if (!formData.namaSekolah)
      newErrors.namaSekolah = "Nama Sekolah harus diisi";
    if (!formData.alamat) newErrors.alamat = "Alamat harus diisi";
    if (!formData.kodePos) {
      newErrors.kodePos = "Kode Pos harus diisi";
    } else if (!/^\d{1,5}$/.test(formData.kodePos)) {
      newErrors.kodePos = "Kode Pos harus berupa angka maksimal 5 digit";
    }
    if (!selectedProvince) newErrors.provinsi = "Provinsi harus dipilih";
    if (!formData.kotaKabupaten)
      newErrors.kotaKabupaten = "Kota/Kabupaten harus dipilih";
    if (!formData.noTelpon) {
      newErrors.noTelpon = "No Telpon Sekolah harus diisi";
    } else if (!/^\d+$/.test(formData.noTelpon)) {
      newErrors.noTelpon = "No Telpon Sekolah hanya boleh berisi angka";
    }
    if (!formData.email) {
      newErrors.email = "Email Sekolah harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Sekolah tidak valid";
    }
    if (!formData.facebook) newErrors.facebook = "Facebook harus diisi";
    if (!formData.jumlahSiswa) {
      newErrors.jumlahSiswa = "Jumlah Siswa harus diisi";
    } else if (!/^\d+$/.test(formData.jumlahSiswa)) {
      newErrors.jumlahSiswa = "Jumlah Siswa hanya boleh berisi angka";
    } else {
      const jumlahSiswa = parseInt(formData.jumlahSiswa);
      if (jumlahSiswa < 1 || jumlahSiswa > 100) {
        newErrors.jumlahSiswa = "Jumlah Siswa harus antara 1 dan 100";
      }
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      navigation.navigate("report", { formData, selectedProvince });
    }
  };

  return (
    <View>
      <Box alignItems="center" width={"$full"} height={"$40"}>
        <Image w={"$56"} h={"$40"} alt="logo" source={logo} />
      </Box>
      <View alignItems="center">
        <Heading>Data Sekolah</Heading>
      </View>
      <Card size="md" variant="outline" maxWidth={360} m="$3">
        <View
          width={"$full"}
          bgColor="#CDDEF2"
          overflow="visible"
          marginTop={"-$4"}
          rounded={"$sm"}
          mb={"$3"}
        ></View>

        <HStack space="md" display="flex" flexDirection="column" mb={"$3"}>
          <FormControlLabel mb={"-$3"}>
            <FormControlLabelText>Tipe Sekolah:</FormControlLabelText>
          </FormControlLabel>
          <FormControl isInvalid={!!errors.tipeSekolah}>
            <Select
              onValueChange={(value) => handleInputChange("tipeSekolah", value)}
            >
              <SelectTrigger>
                <SelectInput
                  placeholder="Pilih Tipe"
                  value={formData.tipeSekolah}
                />
                <SelectIcon>
                  <ChevronDownIcon />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Swasta" value="Swasta" />
                  <SelectItem label="Negeri" value="Negeri" />
                </SelectContent>
              </SelectPortal>
            </Select>
            {!!errors.tipeSekolah && (
              <Text color="red">{errors.tipeSekolah}</Text>
            )}
          </FormControl>
        </HStack>

        {/* Nama Sekolah */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.namaSekolah}>
          <FormControlLabel>
            <FormControlLabelText>Nama Sekolah:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.namaSekolah}
              onChangeText={(value) => handleInputChange("namaSekolah", value)}
              placeholder="Nama Sekolah"
            />
          </Input>
          {!!errors.namaSekolah && (
            <Text color="red">{errors.namaSekolah}</Text>
          )}
        </FormControl>

        {/* Alamat */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.alamat}>
          <FormControlLabel>
            <FormControlLabelText>Alamat:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.alamat}
              onChangeText={(value) => handleInputChange("alamat", value)}
              placeholder="Alamat Sekolah"
            />
          </Input>
          {!!errors.alamat && <Text color="red">{errors.alamat}</Text>}
        </FormControl>

        {/* Kode Pos */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.kodePos}>
          <FormControlLabel>
            <FormControlLabelText>Kode Pos:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.kodePos}
              onChangeText={(value) => handleInputChange("kodePos", value.replace(/\D/g, ""))}
              placeholder="Kode Pos"
              keyboardType="numeric"
              maxLength={5}
            />
          </Input>
          {!!errors.kodePos && <Text color="red">{errors.kodePos}</Text>}
        </FormControl>

        {/* Provinsi */}
        <HStack space="md" display="flex" flexDirection="column" mb={"$3"}>
          <FormControlLabel mb={"-$3"}>
            <FormControlLabelText>Provinsi:</FormControlLabelText>
          </FormControlLabel>
          <FormControl isInvalid={!!errors.provinsi}>
            <Select onValueChange={(value) => handleInputChange("provinsi", value)}>
              <SelectTrigger>
                <SelectInput
                  placeholder="Pilih Provinsi"
                  value={provinces.find((provinsi) => provinsi.id === selectedProvince)?.name || ''}
                />
                <SelectIcon>
                  <ChevronDownIcon />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {provinces.map((province) => (
                    <SelectItem
                      key={province.id}
                      label={province.name}
                      value={province.name}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            {!!errors.provinsi && <Text color="red">{errors.provinsi}</Text>}
          </FormControl>
        </HStack>

        {/* Kota/Kabupaten */}
        <HStack space="md" display="flex" flexDirection="column" mb={"$3"}>
          <FormControlLabel mb={"-$3"}>
            <FormControlLabelText>Kota/Kabupaten:</FormControlLabelText>
          </FormControlLabel>
          <FormControl isInvalid={!!errors.kotaKabupaten}>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, kotaKabupaten: value })
              }
            >
              <SelectTrigger>
                <SelectInput placeholder="Pilih Kota/Kabupaten" />
                <SelectIcon>
                  <ChevronDownIcon />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {regencies.map((regency) => (
                    <SelectItem
                      key={regency.id}
                      label={regency.name}
                      value={regency.name}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            {!!errors.kotaKabupaten && (
              <Text color="red">{errors.kotaKabupaten}</Text>
            )}
          </FormControl>
        </HStack>

        {/* No Telpon */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.noTelpon}>
          <FormControlLabel>
            <FormControlLabelText>No Telpon Sekolah:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.noTelpon}
              onChangeText={(value) =>
                handleInputChange("noTelpon", value.replace(/\D/g, ""))
              }
              placeholder="No Telpon Sekolah"
              keyboardType="numeric"
            />
          </Input>
          {!!errors.noTelpon && <Text color="red">{errors.noTelpon}</Text>}
        </FormControl>

        {/* Email */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Email Sekolah:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder="Email Sekolah"
            />
          </Input>
          {!!errors.email && <Text color="red">{errors.email}</Text>}
        </FormControl>

        {/* Facebook */}
        {/* Facebook */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.facebook}>
          <FormControlLabel>
            <FormControlLabelText>Facebook:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.facebook}
              onChangeText={(value) => handleInputChange("facebook", value)}
              placeholder="Facebook"
            />
          </Input>
          {!!errors.facebook && <Text color="red">{errors.facebook}</Text>}
        </FormControl>

        {/* Jumlah Siswa */}
        <FormControl minWidth="$80" mb={"$3"} isInvalid={!!errors.jumlahSiswa}>
          <FormControlLabel>
            <FormControlLabelText>Jumlah Siswa:</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={formData.jumlahSiswa}
              onChangeText={(value) => handleInputChange("jumlahSiswa", value)}
              placeholder="Jumlah Siswa"
              keyboardType="numeric"
            />
          </Input>
          {!!errors.jumlahSiswa && (
            <Text color="red">{errors.jumlahSiswa}</Text>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button
          size="md"
          width={"$full"}
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleSubmit}
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </Card>
    </View>
  );
};

export default FormDataSekolah;
