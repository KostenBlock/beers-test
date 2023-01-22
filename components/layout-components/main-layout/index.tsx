import { PropsWithChildren } from "react";
import NavBar from "~/components/layout-components/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {

    return (
        <>
            <NavBar />
            {children}
        </>
    );
};
