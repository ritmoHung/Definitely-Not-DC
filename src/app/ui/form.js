"use client";
import { useState } from "react";

export function FormSubmit({ children, className, id, handleSubmit }) {
    return (
        <form id={id} className={`${className} grid gap-3`} onSubmit={handleSubmit}>
            {children}
        </form>
    );
}

export function FormInput({ className, size = "md", type = "text", id, name, label = "",
                            placeholder = "", value, required = false, showLabel = false, ...props }) {
    const [blurOnce, setBlurOnce] = useState(false);
    const [isValid, setIsValid] = useState(true);

    function handleChange(e) {
        if (!blurOnce) return;
        setIsValid(e.target.checkValidity());
    }

    function handleBlur(e) {
        if (!blurOnce) setBlurOnce(true);
        setIsValid(e.target.checkValidity());
    }

    return (
        <div className={`${className} grid gap-1`}>
            {showLabel && label && <label htmlFor={id} className="text-300">{label}</label>}
            <input
                type={type}
                id={id}
                name={name}
                className="input-border-rounded"
                data-size={size}
                data-valid={isValid}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
            ></input>
        </div>
    );
}

export function Toggle({ className, size = "md", id, name, label = "", checked, handleChange, required = false, showLabel = true }) {
    return (
        <div className={`${className} flex items-center justify-between`}>
            {showLabel && label && <span>{label}</span>}
            <label htmlFor={id} className="toggle-accent" data-size={size}>
                <input type="checkbox" id={id} name={name} checked={checked} onChange={(e) => handleChange(e.target.checked)} required={required} />
                <span className="slider"></span>
            </label>
        </div>
    );
}