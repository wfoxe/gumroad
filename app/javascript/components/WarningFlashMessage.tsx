import { usePage } from "@inertiajs/react";
import * as React from "react";

import { flashToAlert } from "$app/components/server-components/Alert";
import { Alert } from "$app/components/ui/Alert";

export const WarningFlash: React.FC = () => {
  const { flash } = usePage();
  const flashAlert = flashToAlert(flash);

  if (flashAlert?.status === "warning" && flashAlert.message) {
    return <Alert variant="danger">{flashAlert.message}</Alert>;
  }

  return null;
};
