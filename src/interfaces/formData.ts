// types.ts
export interface FormData {
    tipeSekolah: string;
    namaSekolah: string;
    alamat: string;
    kodePos: string;
    kotaKabupaten: string;
    noTelpon: string;
    email: string;
    facebook: string;
    jumlahSiswa: string;
  }


  
  export interface RouteParams {
    formData: FormData;
    selectedProvince: string;
  }
  