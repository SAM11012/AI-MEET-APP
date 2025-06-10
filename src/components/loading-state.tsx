import { defaultMaxListeners } from "events";
import { Loader2Icon } from "lucide-react";
import React from "react";
interface LoadingProps {
  title: string;
  description: string;
}
const Loading = ({ title, description }: LoadingProps) => {
  return (
    <div className="flex flex-1 justify-center items-center py-4 px-8 ">
      <div className="flex flex-col justify-center items-center bg-background rounded-lg p-10 shadow-sm gap-y-6">
        {" "}
        <Loader2Icon className="animate-spin size-6 text-primary" />
        <div className="flex flex-col text-center gap-y-2">
            <h6 className="text-lg font-medium">{title}</h6>
            <p className="m-0 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
