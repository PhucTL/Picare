import Button from "@/components/button";
import { shippingState } from "@/context/checkoutState";
import {
  useDistrictById,
  useLocationAll,
  useProvinceById,
  useWardById,
} from "@/hooks/hooks";
import { Location } from "@/interfaces/Checkout";
import { setLocationToStorage } from "@/service/checkoutService";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { nativeStorage } from "zmp-sdk";
import { Box, Picker, Page, Input } from "zmp-ui";
import { PickerColumnOption } from "zmp-ui/picker";

export default function LocationPage() {
  const [location, setLocation] = useState<Location>({
    country: { code: "", id: "", name: "" },
    province: { code: "", country_id: "", id: "", name: "" },
    district: { id: "", name: "", code: "", province_id: "" },
    ward: { id: "", name: "", code: "", district_id: "" },
    address: "",
  });
  const [isSpam, setIsSpam] = useState(true);
  const { data: countries, isLoading: countriesLoading } = useLocationAll();
  const { data: provinces, isLoading: provincesLoading } = useProvinceById(
    location.country.id
  );
  const { data: districts } = useDistrictById(location.province.id);
  const { data: wards } = useWardById(location.district.id);
  const navigate = useNavigate();

  // Load data from localStorage
  useEffect(() => {
    const storedLocation = nativeStorage.getItem("savedNativeLocation");
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation);
        setLocation(parsedLocation);
      } catch (error) {
        console.error("Failed to parse location from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (countries && !location.country.id) {
      const vietnam = countries.find((country) => country.name === "Vietnam");
      setLocation((prev) => ({
        ...prev,
        country: vietnam || { code: "", id: "", name: "" },
      }));
    }
  }, [countries]);

  const countryOptions =
    countries?.map((country) => ({
      key: country.id,
      value: country.code,
      displayName: country.name,
    })) || [];

  const provinceOptions =
    provinces?.map((province) => ({
      key: province.id,
      value: province.id,
      displayName: province.name,
    })) || [];

  const districtOptions =
    districts?.map((district) => ({
      key: district.id,
      value: district.id,
      displayName: district.name,
    })) || [];

  const wardOptions =
    wards?.map((ward) => ({
      key: ward.id,
      value: ward.id,
      displayName: ward.name,
    })) || [];

  const handleProvinceChange = (value: {
    [name: string]: PickerColumnOption;
  }) => {
    setLocation((prev) => ({
      ...prev,
      province:
        provinces?.find((province) => province.id === value.province.value) ||
        prev.province,
      district: { id: "", name: "", code: "", province_id: "" },
      ward: { code: "", district_id: "", id: "", name: "" },
      address: "",
    }));
  };

  const handleDistrictChange = (value: {
    [name: string]: PickerColumnOption;
  }) => {
    setLocation((prev) => ({
      ...prev,
      district:
        districts?.find((district) => district.id === value.district.value) ||
        prev.district,
      address: "",
      ward: { code: "", district_id: "", id: "", name: "" },
    }));
  };

  const handleWardChange = (value: { [name: string]: PickerColumnOption }) => {
    setLocation((prev) => ({
      ...prev,
      ward: wards?.find((ward) => ward.id === value.ward.value) || prev.ward,
      address: "",
    }));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleSave = async () => {
    try {
      await setLocationToStorage(location);
      toast("Lưu địa chỉ thành công!!!", {
        icon: "✅",
      });
      setTimeout(() => {
        navigate(-1);
      }, 700);
    } catch (error) {
      toast("Lưu địa chỉ thất bại", {
        icon: "⛔",
      });
    }
  };
  useEffect(() => {
    const isFormComplete =
      location.country.id &&
      location.province.id &&
      location.district.id &&
      location.ward.id &&
      location.address.trim() !== "";

    setIsSpam(!isFormComplete);
  }, [location]);

  return (
    <Page className="page overflow-auto">
      <div className="flex flex-col space-y-6 px-4 py-3 relative">
        <Box mt={6}>
          <Picker
            name="country"
            label="Quốc gia"
            helperText="Chọn quốc gia nơi bạn sống"
            placeholder="Chọn đất nước"
            mask
            maskClosable
            value={{ country: location.country.code || "" }}
            defaultValue={{ country: location.country.code || "" }}
            disabled
            title="Quốc gia"
            action={{
              text: "Đóng",
              close: true,
            }}
            data={[
              {
                options: countryOptions,
                name: "country",
              },
            ]}
          />
        </Box>
        <Box mt={6}>
          <Picker
            name="province"
            label="Tỉnh/Thành phố"
            helperText="Chọn tỉnh/Thành phố bạn đang sinh sống"
            placeholder="Chọn tỉnh/Thành phố"
            mask
            onChange={handleProvinceChange}
            value={{ province: location.province.id || "" }}
            maskClosable
            disabled={provincesLoading}
            title="Tỉnh/Thành phố"
            action={{
              text: "Đóng",
              close: true,
            }}
            data={[
              {
                options: provinceOptions,
                name: "province",
              },
            ]}
          />
        </Box>
        <Box mt={6}>
          <Picker
            name="district"
            label="Quận/Huyện"
            helperText="Chọn Quận/Huyện bạn đang sinh sống"
            placeholder="Chọn Quận/Huyện"
            mask
            value={{ district: location.district.id || "" }}
            maskClosable
            onChange={handleDistrictChange}
            disabled={!location.province.id}
            title="Quận/Huyện"
            action={{
              text: "Đóng",
              close: true,
            }}
            data={[
              {
                options: districtOptions,
                name: "district",
              },
            ]}
          />
        </Box>
        <Box mt={6}>
          <Picker
            name="ward"
            label="Phường/Xã"
            helperText="Chọn Phường/Xã bạn đang sinh sống"
            placeholder="Chọn Phường/Xã"
            mask
            value={{ ward: location.ward.id || "" }}
            maskClosable
            onChange={handleWardChange}
            disabled={!location.district.id}
            title="Phường/Xã"
            action={{
              text: "Đóng",
              close: true,
            }}
            data={[
              {
                options: wardOptions,
                name: "ward",
              },
            ]}
          />
        </Box>
        <Box mt={6} className="pb-[100px]">
          <Input
            type="text"
            label="Địa chỉ"
            helperText="Nhập địa chỉ cụ thể"
            value={location.address}
            onChange={handleAddressChange}
            placeholder="VD: 2/35 Chấn Hưng"
            maxLength={100}
          />
        </Box>
        <div className="fixed bottom-0 px-4 py-4 left-0 w-full bg-white">
          <Button
            primary
            className="w-full"
            onClick={handleSave}
            disabled={isSpam}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </Page>
  );
}
