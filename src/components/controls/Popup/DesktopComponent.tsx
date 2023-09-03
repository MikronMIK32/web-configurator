import { forwardRef } from 'react';

import Modal from './Component';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import type { ModalDesktopProps } from './types';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view="desktop" />
));

export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header,
    Footer,
});

export default ModalDesktop;