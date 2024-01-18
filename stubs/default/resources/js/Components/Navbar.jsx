import { usePage } from '@inertiajs/react';
import { Anchor, AppShell, NavLink } from '@mantine/core';
import { Link, router } from '@inertiajs/react';

export const Navbar = () => {

    const { navbar } = usePage().props;

    return (

        <AppShell.Navbar p="md">
            {navbar.map(({ name, route : href, active }, index) => (
                <Link key={index} href={href} style={{ textDecoration: "none", color: "inherit" }}>

                <NavLink

                    label={name}
                    variant="light"
                    active={active}
                />
                </Link>

            ))}
        </AppShell.Navbar>
    )

}
