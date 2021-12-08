import { useEffect, useState } from "react";
import useSWR, { KeyedMutator, SWRResponse } from "swr";
import { InstagramEntity } from "../entities";

interface UseAccounts {
  accounts: InstagramEntity[] | undefined;
  active: InstagramEntity | null;
  mutate: KeyedMutator<InstagramEntity[]>;
}

const useAccounts = (): UseAccounts => {
  const [active, setActive] = useState<InstagramEntity | null>(null);
  const { data: accounts, mutate }: SWRResponse<InstagramEntity[], Error> =
    useSWR(`${process.env.NEXT_PUBLIC_API_URL}/instagrams`);

  // Set active account to the latest active
  useEffect(() => {
    if (accounts) {
      const sorted = [...accounts].sort(
        (a, b) =>
          new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      );
      setActive(sorted[0]);
    }
  }, [accounts]);

  return { accounts, active, mutate };
};

export { useAccounts };
