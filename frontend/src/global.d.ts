declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      name: string; // Custom string attribute for ion-icon
    }& {
      size: string; // Custom string attribute for ion-icon
    };
  }
}