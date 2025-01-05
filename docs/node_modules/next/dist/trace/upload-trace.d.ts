export default function uploadTrace({ traceUploadUrl, mode, isTurboSession, projectDir, distDir, sync, }: {
    traceUploadUrl: string;
    mode: 'dev';
    isTurboSession: boolean;
    projectDir: string;
    distDir: string;
    sync?: boolean;
}): void;
