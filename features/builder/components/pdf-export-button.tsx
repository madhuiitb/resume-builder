   "use client";

   import dynamic from "next/dynamic";

   import { Button } from "@/components/ui/button";

   // @react-pdf/renderer only works in the browser, so skip server rendering.
   const PDFDownloadButton = dynamic(
     () =>
       import("./pdf-download-button").then((mod) => mod.PDFDownloadButton),
     {
       ssr: false,
       loading: () => (
         <Button variant="outline" disabled>
           Export PDF
         </Button>
       ),
     },
   );

   export function PDFExportButton() {
     return <PDFDownloadButton />;
   }