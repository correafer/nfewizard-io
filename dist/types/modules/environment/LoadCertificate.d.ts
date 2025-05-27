import { CertificateLoadReturn, NFeWizardProps } from '@Types';
declare class LoadCertificate {
    private config;
    private certificate;
    private cert_key;
    constructor(config: NFeWizardProps);
    private loadCertificateWithPEM;
    private loadCertificateWithNodeForge;
    loadCertificate(): Promise<CertificateLoadReturn>;
}
export default LoadCertificate;
