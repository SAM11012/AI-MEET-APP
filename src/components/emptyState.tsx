import { defaultMaxListeners } from "events";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
interface LoadingProps {
  title: string;
  description: string;
}
const EmptyState = ({ title, description }: LoadingProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {" "}
      
      <Image src='/empty.svg' alt="Empty" width={240} height={240}/>
      <div className="flex flex-col text-center gap-y-2 max-w-md mx-auto ">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="m-0 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
