interface ICardClass{
    image?: any
    title?: string
    theme?: string
    part?: string
    room?: number
}
interface IListClass{
    listclass?: Array<any>;
}
interface ITabs {
    titleTabs: Array<string | any>;
    bodyTabs: Array<JSX.Element>;
    classNameHeaderContainer?: string;
    classNameHeader?: string;
    initialNum?: number;
    contentBody?: any;
  }
  interface IInput extends IStyle {
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string | number | date;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    maxLength?: number | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onkeypress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onkeyup?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    type?: 'text' | 'password' | 'date';
    background?: Property.Background<string | number> | undefined;
    borderRadius?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    className?: string | undefined;
    error?: any;
    colorText?: string;
    marginLabel?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    showPassword?: boolean;
    zIndex?: number;
    handleAction?: any;
    titleAction?: string;
    isDisable?: boolean;
    buttonAction?: any;
  }
 