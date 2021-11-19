import { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { AccountDocument } from "./types";

const useAccounts = () => {
  const [active, setActive] = useState<AccountDocument | null>(null);
  const { data: accounts, mutate }: SWRResponse<AccountDocument[], Error> =
    useSWR("/api/accounts");

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
