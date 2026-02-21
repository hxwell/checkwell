import { usePage } from '@inertiajs/react';

interface SharedProps {
    appDomain: string;
    [key: string]: unknown;
}

export function useApiUrl(): string {
    const { appDomain } = usePage<SharedProps>().props;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `//api.${appDomain}${port}`;
}
