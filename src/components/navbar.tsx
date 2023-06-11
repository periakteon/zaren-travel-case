import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navigation() {
  // TODO: EN SOLA LOGO EKLE
  // TODO: EN SAĞA HOME, DİL SEÇENEĞİ, MODE TOGGLE EKLE
  return (
    <NavigationMenu className={cn("my-4 shadow-md")}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "absolute hover:bg-transparent",
            )}
          >
            <ModeToggle />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
