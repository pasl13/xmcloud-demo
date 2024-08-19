'use client';

import  { createPortal } from 'react-dom';

export default ReactPortal({ children, wrapperId }) {
    return createPortal(children, document.getElementById('wrapperId'));
}