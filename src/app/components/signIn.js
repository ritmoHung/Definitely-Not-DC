import { signIn } from "next-auth/react";

// UI
import { FormSubmit } from "@/app/ui/form";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function findIconByProvider(id) {
    switch (id) {
        case "google":
            return faGoogle;
        default:
            return null;
    }
}

export function SignInWithCreds({ children, provider }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        await signIn(provider.id, data);
    }

    return (
        <FormSubmit id={`form-${provider.name}`} handleSubmit={handleSubmit}>
            {children}
            <button type="submit" className={`btn-rounded-solid-accent inline-flex justify-center items-center gap-2 w-full`}>
                <span>Sign in</span>
            </button>
        </FormSubmit>
    );
}

export function SignInWithProvider({ provider }) {
    return (
		<button className={`btn-rounded-solid-accent inline-grid grid-cols-[auto_1fr] items-center gap-2 w-full`} onClick={() => signIn(provider.id)}>
            <FontAwesomeIcon icon={findIconByProvider(provider.id)} />
            <span>Sign in with {provider.name}</span>
        </button>
	);
}