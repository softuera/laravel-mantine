import { PanelLayout } from "@/Layouts/PanelLayout"

import { Head } from '@inertiajs/react';
import { Title } from '@mantine/core';

export default function Index(){
    return(
        <PanelLayout>
            <Head title="Profile" />
            <Title>Profile</Title>
        </PanelLayout>
    )
}
