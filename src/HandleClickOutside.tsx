import onClickOutside from 'react-onclickoutside';


export default function withHandleClickOutside(WrappedComponent: any) {
    const newComp = onClickOutside(WrappedComponent);
    return newComp;
}