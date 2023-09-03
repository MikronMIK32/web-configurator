import { forwardRef } from 'react';

import Modal from './Component';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import type { ModalMobileProps } from './types';

const ModalMobileComponent = forwardRef<HTMLDivElement, ModalMobileProps>((props, ref) => (
    <Modal {...props} ref={ref} view="mobile" />
));

export const ModalMobile = Object.assign(ModalMobileComponent, {
    Content,
    Header,
    Footer,
});

export default ModalMobile;
