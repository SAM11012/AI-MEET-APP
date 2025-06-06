import React from "react";
import { createAvatar, Style } from "@dicebear/core";
import { avataaarsNeutral, botttsNeutral, initials, } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials"|"avataaarsNeutral";
}
const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar;
  if (variant === "initials") {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  } else {
    avatar = createAvatar(avataaarsNeutral , {
      seed,
    });
  }
  return (
    <Avatar className={cn(className)}>
        <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
        <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
};

export default GeneratedAvatar;
