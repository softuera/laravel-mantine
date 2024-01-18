
import { Head } from '@inertiajs/react';
import { MainLayout } from "../../Layouts/MainLayout";

export default function Index({ laravelVersion }){
    return(
        <MainLayout>
            <Head title="Home" />
            <h1>Laravel Version: {laravelVersion}</h1>
        </MainLayout>
    )
}
