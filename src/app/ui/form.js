"use client";
import { useState } from "react";

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
    name,
    label = "",
    placeholder = "",
    defaultValue = "",
    required = false,
    showLabel = false,
}) {
    const [isDirty, setIsDirty] = useState(false);

    function handleChange(e) {
        if (isDirty) return;
        if (e.target.value !== defaultValue) setIsDirty(true);
    }

    return (
        <div className={`${className} grid gap-1`}>
            {showLabel && <label htmlFor={id} className="text-fineprint">{label}</label>}
            <input
                type={type}
                id={id}
                name={name}
                data-dirty={isDirty}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required={required}
                onChange={handleChange}
            ></input>
        </div>
    );
}
