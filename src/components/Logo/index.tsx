import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const Logo: React.FC<Props> = () => (
  <Link href="/">
    <a>
      <Image
        src="/images/logo.png"
        alt="Instaccounts"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={true}
      />
    </a>
  </Link>
);

export { Logo };
