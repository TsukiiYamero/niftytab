export type AuthModalInitialState = {
    isOpen: boolean;
    setIsSignIn: (isSignIn: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
    actionBeforeOpen?: () => void
};
