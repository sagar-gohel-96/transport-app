import { Group, useMantineTheme } from "@mantine/core";
import {
  Dropzone as MantineDropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { ReactNode } from "react";
import { PhotoUp, PhotoX } from "tabler-icons-react";
import { uploadImage } from "./utils";

interface IDropzoneProps extends Partial<DropzoneProps> {
  folderName: string;
  children: ReactNode;
  description: { title: string; aboutImage?: string };
  setProgresspercent: (value: number) => void;
  setImgUrl: (value: string) => void;
}

export const Dropzon = ({
  folderName,
  description,
  children,
  setProgresspercent,
  setImgUrl,
  ...props
}: IDropzoneProps) => {
  const theme = useMantineTheme();

  return (
    <MantineDropzone
      onDrop={
        (files: any) =>
          uploadImage(files, folderName, setImgUrl, setProgresspercent)
        // uploadImage(files)
      }
      onReject={(files: any) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 160, pointerEvents: "none" }}
      >
        <MantineDropzone.Accept>
          <PhotoUp
            size={50}
            strokeWidth={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </MantineDropzone.Accept>
        <MantineDropzone.Reject>
          <PhotoX
            size={50}
            strokeWidth={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </MantineDropzone.Reject>
        {/* <MantineDropzone.Idle>
          <Photo size={50} strokeWidth={1.5} />
        </MantineDropzone.Idle> */}

        {/* <div>
          <Text size="xl" inline>
            {description.title}
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            {description.aboutImage}
          </Text>
      </div> */}
        {children}
      </Group>
    </MantineDropzone>
  );
};
