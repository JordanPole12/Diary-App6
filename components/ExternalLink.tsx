import { Link, type Href } from "expo-router";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Href;
};

export function ExternalLink({ href, ...rest }: Props) {
  return <Link href={href} target="_blank" {...rest} />;
}
