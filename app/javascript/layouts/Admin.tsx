import { Head, usePage } from "@inertiajs/react";
import React from "react";

import { classNames } from "$app/utils/classNames";

import AdminNav from "$app/components/Admin/Nav";
import AdminNewSalesReportPopover from "$app/components/Admin/SalesReports/NewSalesReportPopover";
import AdminSearchPopover from "$app/components/Admin/SearchPopover";
import LoadingSkeleton from "$app/components/LoadingSkeleton";
import Alert, { flashToAlert, showAlert } from "$app/components/server-components/Alert";
import useRouteLoading from "$app/components/useRouteLoading";

type PageProps = {
  title: string;
};

const Admin = ({ children }: { children: React.ReactNode }) => {
  const { props, flash } = usePage<PageProps>();
  const { title } = props;
  const flashAlert = flashToAlert(flash);
  const isRouteLoading = useRouteLoading();

  React.useEffect(() => {
    if (flashAlert?.message) {
      const options = flashAlert.html !== undefined ? { html: flashAlert.html } : undefined;
      showAlert(flashAlert.message, flashAlert.status === "danger" ? "error" : flashAlert.status, options);
    }
  }, [flash]);

  return (
    <div id="inertia-shell" className="flex h-screen flex-col lg:flex-row">
      <Head title={title} />
      <Alert initial={flashAlert} />
      <AdminNav />
      <main className="flex h-screen flex-1 flex-col overflow-y-auto">
        <header className="flex items-center justify-between border-b border-border p-4 md:p-8">
          <h1>{title}</h1>
          <div className="actions grid flex-1 grid-cols-2 gap-2 has-[>*:only-child]:grid-cols-1 sm:flex sm:flex-none md:-my-2">
            <AdminSearchPopover />
            {window.location.pathname === Routes.admin_sales_reports_path() ? <AdminNewSalesReportPopover /> : null}
          </div>
        </header>
        {isRouteLoading ? <LoadingSkeleton /> : null}
        <div className={classNames("p-4 md:p-8", { hidden: isRouteLoading })}>{children}</div>
      </main>
    </div>
  );
};

export default Admin;
