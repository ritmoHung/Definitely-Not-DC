export default function Loader({ className, size = "md" }) {
    return (
        <div className={`${className}`}>
            <div class="loader-helix" data-size={size}>
                <div class="slice"></div>
                <div class="slice"></div>
                <div class="slice"></div>
                <div class="slice"></div>
                <div class="slice"></div>
                <div class="slice"></div>
            </div>
        </div>
    );
}