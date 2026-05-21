import { Footer } from "@/components/landing/layout/footer";
import { FullLogo } from "@/components/landing/layout/full-logo";
import { Navbar } from "@/components/landing/layout/navbar";
import { Button } from "@/components/ui/button";
import { getPayload } from "@/lib/cms/getPayload";
import Link from "next/link";
import React from "react";

/**
 * Layout component for the landing route group.
 * Fetches global site settings from Payload CMS and renders Navbar/Footer.
 *
 * @param props - Component props containing children elements.
 */
export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload();

  const header = await payload.findGlobal({
    slug: "header",
  });

  const footer = await payload.findGlobal({
    slug: "footer",
  });

  const navRoutes =
    header.navItems?.map((item) => ({
      href: item.link,
      label: item.label,
    })) || [];

  const footerColumns =
    footer.columns?.map((col) => ({
      title: col.title,
      links:
        col.links?.map((link) => ({
          href: link.link,
          label: link.label,
        })) || [],
    })) || [];

  const footerSocialLinks =
    footer.socialLinks?.map((social) => ({
      href: social.link,
      label: social.label,
      iconSvg: social.iconSvg,
    })) || [];

  const footerBottomLinks =
    footer.bottomLinks?.map((link) => ({
      href: link.link,
      label: link.label,
      iconSvg: link.iconSvg || undefined,
    })) || [];

  return (
    <>
      {/* Global Navbar */}
      <Navbar
        brandName={header.brandName}
        logoSvg={header.logoSvg || <FullLogo className="text-2xl" />}
        routes={navRoutes}
        actionSlot={
          header.actionButton?.isEnabled ? (
            <Button
              asChild
              size="sm"
              className="border border-tasto-cyan/50 bg-tasto-cyan/10 text-tasto-cyan hover:bg-tasto-cyan/20 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(49,216,203,0.3)] hover:shadow-[0_0_20px_-1px_rgba(49,216,203,0.5)] rounded-lg font-medium text-xs h-9 px-4"
            >
              <Link href={header.actionButton.link || "#"}>{header.actionButton.label}</Link>
            </Button>
          ) : null
        }
      />
      {children}
      {/* Global Footer */}
      <Footer
        brandName={footer.brandName}
        logoSvg={footer.logoSvg || <FullLogo className="text-4xl" />}
        description={footer.description || undefined}
        socialLinks={footerSocialLinks}
        columns={footerColumns}
        bottomLinks={footerBottomLinks}
      />
    </>
  );
}
