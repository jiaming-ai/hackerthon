
import { FooterLinks } from "@/components/Footer/Footer";
export default async function PubLayout({ children }: { children: any }) {

    return (
        <>
            {children}
            <FooterLinks />
        </>
    )
}