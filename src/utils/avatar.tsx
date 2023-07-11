import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";

export const getAvatar = (seed: string) => {
  const avatar = createAvatar(openPeeps, {
    seed: seed,
    size: 36,
  });
  const svg = avatar.toString();
  return (
    <Image
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
      width={36}
      height={36}
      alt="avatar"
    />
  );
};
