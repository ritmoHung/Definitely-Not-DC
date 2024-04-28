import Link from "next/link";

export function ButtonTrans({ children, className, size = "md", square = false, type, title, selected, disabled, onClick }) {
    return (
        <button
            type={type}
            title={title}
            className={`${className} btn btn-trans ${square ? "!p-0 aspect-square" : ""}`}
            data-size={size}
            data-selected={selected}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function ButtonSolid({ children, className, size = "md", square = false, type, title, selected, disabled, onClick }) {
    return (
        <button
            type={type}
            title={title}
            className={`${className} btn btn-solid ${square ? "!p-0 aspect-square" : ""}`}
            data-size={size}
            data-selected={selected}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function ButtonOutline({ children, className, size = "md", square = false, type, title, selected, disabled, onClick }) {
    return (
        <button
            type={type}
            title={title}
            className={`${className} btn btn-outline ${square ? "!p-0 aspect-square" : ""}`}
            data-size={size}
            data-selected={selected}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function LinkTrans({ children, className, size = "md", square = false, href }) {
    return (
        <Link href={href} className={`${className} btn btn-trans ${square ? "!p-0 aspect-square" : ""}`} data-size={size}>{children}</Link>
    );
}

export function LinkSolid({ children, className, size = "md", square = false, href }) {
    return (
        <Link href={href} className={`${className} btn btn-solid ${square ? "!p-0 aspect-square" : ""}`} data-size={size}>{children}</Link>
    );
}

export function LinkOutline({ children, className, size = "md", square = false, href }) {
    return (
        <Link href={href} className={`${className} btn btn-outline ${square ? "!p-0 aspect-square" : ""}`} data-size={size}>{children}</Link>
    );
}