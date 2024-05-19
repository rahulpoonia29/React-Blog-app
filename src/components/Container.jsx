function Container({ className = "", children }) {
    return <div className={`w-[100px] ${className}`}>{children}</div>;
}

export default Container;
