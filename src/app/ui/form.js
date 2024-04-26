"use client";
import { useState } from "react";

export function FormAction({ children, className, id, action }) {
    return (
        <form id={id} className={`${className} grid gap-4`} action={action}>
            {children}
        </form>
    );
}

export function FormSubmit({ children, className, id, handleSubmit }) {
    return (
        <form id={id} className={`${className} grid gap-4`} onSubmit={handleSubmit}>
            {children}
        </form>
    );
}

export function FormInput({
    className,
    type = "text",
    id,
    label,
    placeholder = "",
    defaultValue = "",
    required = false,
}) {
    const [isDirty, setIsDirty] = useState(false);

    function handleChange(e) {
        if (isDirty) return;
        if (e.target.value !== defaultValue) setIsDirty(true);
    }

    return (
        <div className={`${className} grid gap-1`}>
            {/* <label htmlFor={id} className="text-fineprint">{label}</label> */}
            <input
                type={type}
                id={id}
                name={id}
                data-dirty={isDirty}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required={required}
                onChange={handleChange}
            ></input>
        </div>
    );
}
