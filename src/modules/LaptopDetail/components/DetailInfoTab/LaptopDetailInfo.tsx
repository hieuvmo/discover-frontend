import Table, { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";

interface DataType {
  key: string;
  title: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  }
];

const LaptopDetailInfo = () => {
  const { t } = useTranslation();
  const { laptopDetail } = useAppSelector((state: RootState) => state.laptop);

  const dataSource: DataType[] = useMemo(() => {
    if (laptopDetail) {
      return [
        {
          key: "brand",
          title: t("laptop:brand"),
          description: laptopDetail.brand || t("laptop:is_updating")
        },
        {
          key: "type",
          title: t("laptop:type"),
          description: laptopDetail.type || t("laptop:is_updating")
        },
        {
          key: "color",
          title: t("laptop:color"),
          description: laptopDetail.color || t("laptop:is_updating")
        },
        {
          key: "chip",
          title: "Chip",
          description: laptopDetail.chip || t("laptop:is_updating")
        },
        {
          key: "chip_set",
          title: "Chipset",
          description: laptopDetail.chipSet || t("laptop:is_updating")
        },
        {
          key: "rom",
          title: t("laptop:rom"),
          description: laptopDetail.rom || t("laptop:is_updating")
        },
        {
          key: "ram",
          title: "RAM",
          description: laptopDetail.ram || t("laptop:is_updating")
        },
        {
          key: "vga",
          title: "VGA",
          description: laptopDetail.vga || t("laptop:is_updating")
        },
        {
          key: "disk",
          title: t("laptop:disk"),
          description: laptopDetail.disk || t("laptop:is_updating")
        },
        {
          key: "light_disk",
          title: t("laptop:light_disk"),
          description: laptopDetail.lightDisk || t("laptop:is_updating")
        },
        {
          key: "card_reader",
          title: t("laptop:card_reader"),
          description: laptopDetail.cardReader || t("laptop:is_updating")
        },
        {
          key: "screen",
          title: t("laptop:screen"),
          description: laptopDetail.screen || t("laptop:is_updating")
        },
        {
          key: "webcam",
          title: "Webcam",
          description: laptopDetail.webcam || t("laptop:is_updating")
        },
        {
          key: "audio",
          title: t("laptop:audio"),
          description: laptopDetail.audio || t("laptop:is_updating")
        },
        {
          key: "internet",
          title: t("laptop:internet"),
          description: laptopDetail.internet || t("laptop:is_updating")
        },
        {
          key: "no_wires",
          title: t("laptop:no_wires"),
          description: laptopDetail.noWires || t("laptop:is_updating")
        },
        {
          key: "connection_port",
          title: t("laptop:connection_port"),
          description: laptopDetail.connectionPort || t("laptop:is_updating")
        },
        {
          key: "battery",
          title: t("laptop:battery"),
          description: laptopDetail.battery || t("laptop:is_updating")
        },
        {
          key: "size",
          title: t("laptop:size"),
          description: laptopDetail.size || t("laptop:is_updating")
        },
        {
          key: "weight",
          title: t("laptop:weight"),
          description: laptopDetail.weight || t("laptop:is_updating")
        },
        {
          key: "window",
          title: t("laptop:window"),
          description: laptopDetail.window || t("laptop:is_updating")
        },
        {
          key: "accessory",
          title: t("laptop:accessory"),
          description: laptopDetail.accessory || t("laptop:is_updating")
        }
      ];
    }
    return [];
  }, [laptopDetail, t]);

  return <Table dataSource={dataSource} columns={columns} />;
};

export default LaptopDetailInfo;
