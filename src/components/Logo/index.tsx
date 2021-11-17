import Image from "next/image";
import React from "react";

interface Props {}

const Logo: React.FC<Props> = () => (
  <Image
    src="/images/logo.png"
    alt="Instaccounts"
    layout="fill"
    objectFit="cover"
    quality={100}
    priority={true}
  />
);

export { Logo };
