import { AuthLayout } from "@/Layouts/AuthLayout"
import { TextInput, Center, Title, Paper, PasswordInput, Stack, Checkbox, Button, Text, Group } from "@mantine/core";

import { Head, Link, useForm } from '@inertiajs/react';

import { IconLogin2 } from '@tabler/icons-react';

export default function Register() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('panel.register'));
    };

    return (
        <AuthLayout>
            <Head title="Register" />
            <Stack w="60%">
                <Center>
                    <Title order={2}>Register</Title>
                </Center>
                <Paper p="lg" shadow="md" radius="md">
                    <form onSubmit={submit}>
                        <Stack>
                            <TextInput label="Name" placeholder="John Doe" required onChange={(e) => setData('name', e.target.value)} />
                            <TextInput label="Email" placeholder="email@example.com" required onChange={(e) => setData('email', e.target.value)}/>
                            <PasswordInput label="Password" placeholder="*******" required onChange={(e) => setData('password', e.target.value)}/>
                            <PasswordInput label="Confirm Password" placeholder="*******" required onChange={(e) => setData('password_confirmation', e.target.value)}/>

                            <Button variant="light" radius="md" type="submit" fullWidth leftSection={<IconLogin2 />}>Register</Button>
                            <Group justify="space-between">
                                <Link href="">
                                    <Text>Forgot your password?</Text>
                                </Link>

                                <Link href={route('panel.login')}>
                                    <Text>Already have account?</Text>
                                </Link>

                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </AuthLayout>
    )
}
