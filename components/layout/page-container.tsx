import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?:string;
  description?:string;
}

export function PageContainer({ 
    children,
    title,
    description
 }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}